---
name: commit-message-writer
description: A skill that generates commit messages based on code changes.
---
# Commit Message Writer Skill
This skill generates commit messages based on the code changes made in a project. It analyzes the modified files and their content to create concise and informative commit messages that follow best practices.
## Features
- Analyzes modified files and their content to generate commit messages.
- Follows best practices for commit message formatting, including:
  - Keeping the title under 50 characters.
  - Using the commitizen structure (e.g., `feat`, `fix`, `chore`).
  - Avoiding personal pronouns (e.g., "I", "we").
  - Avoiding co-author messages.
  - Including a short body (1–3 sentences) explaining what changed and why — enough context to understand the commit without reading the diff, but not an exhaustive description.
- Do not commit or push code automatically. Only generate and display the commit message for the user to review and use as needed.
## Usage
To use this skill, simply run the command to generate a commit message after making changes to your codebase. The skill will analyze the changes and provide a suggested commit message that you can use or modify as needed.
## Example
After making changes to your code, you can run the following command to generate a commit message:
```generate-commit-message
```
The skill will then analyze the changes and provide a suggested commit message, such as:
```
feat: add zod schemas for song and favorite

Defines TSong and TFavorite types inferred from Zod schemas. Centralizes
validation so any API response mismatch is caught at the boundary before
reaching component code.
```
You can then use this message for your commit or modify it to better fit the specific changes you made.
## Conclusion
The Commit Message Writer skill helps developers create clear and informative commit messages that follow best practices, making it easier to understand the purpose and context of each commit without reading the full diff.
