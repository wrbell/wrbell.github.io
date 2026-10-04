#!/usr/bin/env bash
# Compare the SHA-256 of the hosted resume PDF with the approved hash.
#
# The approved hash is the first field of the first line in
# tools/resume-approved.sha256 that is not blank and not a "#" comment.
# Exit 0 when the hashes match, 1 when they differ, 2 when a file or the
# hash is missing. CI runs this script as a non-blocking step.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
pdf="${root}/assets/willem-bell-resume.pdf"
record="${root}/tools/resume-approved.sha256"

for file in "${pdf}" "${record}"; do
  if [ ! -f "${file}" ]; then
    echo "missing: ${file#"${root}"/}" >&2
    exit 2
  fi
done

approved="$(awk '!/^[[:space:]]*#/ && NF { print $1; exit }' "${record}")"
if [ -z "${approved}" ]; then
  echo "no hash in tools/resume-approved.sha256" >&2
  exit 2
fi

if command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "${pdf}" | awk '{ print $1 }')"
else
  actual="$(shasum -a 256 "${pdf}" | awk '{ print $1 }')"
fi

if [ "${actual}" = "${approved}" ]; then
  echo "ok: assets/willem-bell-resume.pdf matches the approved hash ${approved}"
  exit 0
fi
echo "mismatch: assets/willem-bell-resume.pdf is ${actual}" >&2
echo "approved hash in tools/resume-approved.sha256 is ${approved}" >&2
exit 1
