#!/usr/bin/env bash
# scripts/ci-local.sh — run the same six checks GitHub Actions runs on PRs,
# locally and in parallel. Run before `git push` to catch failures in seconds
# instead of minutes.
#
# Usage:
#   scripts/ci-local.sh                  # run all six
#   scripts/ci-local.sh html lighthouse  # run a subset
#   scripts/ci-local.sh --bootstrap      # download lychee + vnu.jar to .ci-tools/
#   scripts/ci-local.sh --no-lighthouse  # everything except lighthouse (~2 min slower)
#
# Tools live in .ci-tools/ (gitignored). First run prints a `--bootstrap` hint
# if anything's missing.

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

TOOLS="$REPO_ROOT/.ci-tools"
LYCHEE="$TOOLS/lychee"
VNU="$TOOLS/vnu.jar"
LOG_DIR="$REPO_ROOT/.ci-tools/logs"
mkdir -p "$LOG_DIR"

# --- ANSI colors (fall through to plain on non-tty) -------------------------
if [ -t 1 ]; then
  C_GREEN='\033[0;32m'; C_RED='\033[0;31m'; C_YELLOW='\033[0;33m'
  C_BOLD='\033[1m';     C_DIM='\033[2m';     C_RESET='\033[0m'
else
  C_GREEN=''; C_RED=''; C_YELLOW=''; C_BOLD=''; C_DIM=''; C_RESET=''
fi

# --- Bootstrap --------------------------------------------------------------
bootstrap() {
  mkdir -p "$TOOLS"
  if [ ! -x "$LYCHEE" ]; then
    echo "Installing lychee..."
    LYCHEE_VERSION="0.24.1"
    curl -fsSL "https://github.com/lycheeverse/lychee/releases/download/lychee-v${LYCHEE_VERSION}/lychee-x86_64-unknown-linux-gnu.tar.gz" \
      -o "$TOOLS/lychee.tgz"
    tar -xzf "$TOOLS/lychee.tgz" -C "$TOOLS"
    ln -sfn "lychee-x86_64-unknown-linux-gnu/lychee" "$LYCHEE"
    rm "$TOOLS/lychee.tgz"
  fi
  if [ ! -f "$VNU" ]; then
    echo "Installing vnu.jar..."
    curl -fsSL "https://github.com/validator/validator/releases/download/latest/vnu.jar" -o "$VNU"
  fi
  echo -e "${C_GREEN}Tools ready in .ci-tools/${C_RESET}"
}

if [ "${1:-}" = "--bootstrap" ]; then
  bootstrap
  exit 0
fi

# --- Tool checks ------------------------------------------------------------
missing=()
[ -x "$LYCHEE" ] || missing+=("lychee")
[ -f "$VNU" ]    || missing+=("vnu.jar")
command -v java >/dev/null || missing+=("java (for vnu)")
if [ ${#missing[@]} -ne 0 ]; then
  echo -e "${C_RED}Missing tools: ${missing[*]}${C_RESET}"
  echo "Run: scripts/ci-local.sh --bootstrap"
  exit 1
fi

# --- Per-check runners ------------------------------------------------------

# `t_*` functions return 0/1 via exit code; their stdout/stderr is captured
# into a per-check log, only printed when the check fails.

t_html() {
  # CI uses html5validator (Cyb3r-Jak3/html5validator-action), which pins an
  # older vnu.jar that doesn't enforce the post-ARIA-1.2 "aria-label only on
  # interactive roles" rule. Filter that pattern out so local matches CI.
  java -jar "$VNU" --skip-non-html --errors-only \
    --filterpattern '.*CSS.*' \
    --filterpattern '.*The .aria-label. attribute must not be specified.*' \
    index.html 404.html resume.html cases.html notebook.html projects/*.html
}

t_lighthouse() {
  npx -y -p @lhci/cli@latest lhci autorun --config=./lighthouserc.json &&
  npx -y -p @lhci/cli@latest lhci autorun --config=./lighthouserc-desktop.json
}

t_links() {
  "$LYCHEE" --accept "200,204,301,302,403,429,502,503,504" \
    --max-retries 5 --retry-wait-time 8 --root-dir . \
    '*.html' 'projects/*.html'
}

t_playwright() {
  # Skip visual baselines locally — they're Linux PNGs, baseline-matching
  # only behaves on Linux. CI re-runs them.
  npx playwright test --reporter=line
}

t_audit() {
  npm audit --audit-level=high
}

t_size() {
  # Mirror .github/workflows/ci.yml Size Budget step: index.html source
  # < 150 KB, dist/index.html < 90 KB.
  npm run build > /dev/null
  src=$(stat -c%s index.html)
  min=$(stat -c%s dist/index.html)
  echo "source=${src}B min=${min}B"
  [ "$src" -lt 153600 ] || { echo "source > 150 KB"; return 1; }
  [ "$min" -lt 92160  ] || { echo "min > 90 KB";    return 1; }
}

# --- Dispatcher -------------------------------------------------------------
declare -A CHECKS=(
  [html]="HTML Validation"
  [lighthouse]="Lighthouse CI"
  [links]="Link Check"
  [playwright]="Playwright"
  [audit]="Security Audit"
  [size]="Size Budget"
)

ALL_KEYS=(html links audit size playwright lighthouse)  # cheap → expensive

# --- CLI parsing ------------------------------------------------------------
selected=()
for arg in "$@"; do
  case "$arg" in
    --no-lighthouse) selected=(html links audit size playwright);;
    --no-playwright) selected=(html links audit size lighthouse);;
    -h|--help) sed -n '2,12p' "$0"; exit 0;;
    -*) echo "unknown flag: $arg"; exit 2;;
    *) selected+=("$arg");;
  esac
done
[ ${#selected[@]} -eq 0 ] && selected=("${ALL_KEYS[@]}")

# Validate selection
for s in "${selected[@]}"; do
  [ "${CHECKS[$s]+x}" ] || { echo "unknown check: $s"; echo "available: ${!CHECKS[*]}"; exit 2; }
done

# --- Run in parallel --------------------------------------------------------
echo -e "${C_BOLD}Running ${#selected[@]} check(s) in parallel: ${selected[*]}${C_RESET}"
echo

declare -A PIDS LOGS START
for k in "${selected[@]}"; do
  log="$LOG_DIR/${k}.log"
  : > "$log"
  ( eval "t_${k}" >"$log" 2>&1 ) &
  PIDS[$k]=$!
  LOGS[$k]=$log
  START[$k]=$(date +%s)
  echo -e "  ${C_DIM}→${C_RESET} ${CHECKS[$k]} (pid ${PIDS[$k]})"
done

echo
echo -e "${C_BOLD}Waiting for results...${C_RESET}"
echo

failures=0
for k in "${selected[@]}"; do
  pid=${PIDS[$k]}
  if wait "$pid"; then
    elapsed=$(( $(date +%s) - ${START[$k]} ))
    printf "  ${C_GREEN}✓${C_RESET} %-18s ${C_DIM}%ds${C_RESET}\n" "${CHECKS[$k]}" "$elapsed"
  else
    elapsed=$(( $(date +%s) - ${START[$k]} ))
    printf "  ${C_RED}✗${C_RESET} %-18s ${C_DIM}%ds${C_RESET} ${C_YELLOW}(see ${LOGS[$k]})${C_RESET}\n" \
      "${CHECKS[$k]}" "$elapsed"
    failures=$(( failures + 1 ))
  fi
done

echo
if [ $failures -eq 0 ]; then
  echo -e "${C_GREEN}${C_BOLD}All ${#selected[@]} checks passed.${C_RESET} Safe to push."
  exit 0
else
  echo -e "${C_RED}${C_BOLD}${failures} of ${#selected[@]} checks failed.${C_RESET}"
  echo -e "Last 20 lines of each failed log:"
  for k in "${selected[@]}"; do
    pid=${PIDS[$k]}
    # Re-check exit by inspecting our earlier wait — but bash already consumed
    # the pid. Use file size + log inspection: reprint logs that contain the
    # error markers we usually emit.
    if ! kill -0 "$pid" 2>/dev/null && [ -s "${LOGS[$k]}" ]; then
      # Heuristic: log mentions "error" or "fail" or "✘" — print it.
      if grep -qiE 'error|fail|✘|✗' "${LOGS[$k]}"; then
        echo
        echo -e "${C_BOLD}--- ${CHECKS[$k]} ---${C_RESET}"
        tail -20 "${LOGS[$k]}"
      fi
    fi
  done
  exit 1
fi
