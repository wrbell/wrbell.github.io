# Agent instructions

This file tells agents how to work in this repository.
The site is wrbell.github.io.

## Clarity

Write explanations to Willem in Simplified Technical English.
Write each description of a pull request in Simplified Technical English.
Write the body of each commit message in Simplified Technical English.
Write the prose in the README and in other documents in Simplified Technical English.

Use about 80 percent of the rules in ASD-STE100.
Do not obey each rule in the specification.
Use the skill in `.agents/skills/simplified-technical-english/`.

Do not apply these rules to code, identifiers, or math.
Do not apply these rules to command output or to quoted error text.

When the subject is structure, flow, or architecture, use a mermaid diagram.
Do not use prose for that subject.
For a complex result, offer one HTML page that explains the result.
That page is a temporary file.
Commit that file only when Willem asks for the file.

Make a video only when Willem asks for a video.
Do not add an API key.
Do not add a secret.

You can run `.agents/skills/simplified-technical-english/scripts/ste_check.py` as an optional check on documents.
The result of the check is advice.
Do not make the check stop a CI job.
