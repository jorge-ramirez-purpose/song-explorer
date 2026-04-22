---
name: commit-message-writer
description: A skill that generates commit messages based on code changes.
---
# Commit Message Writer Skill
This skill generates commit messages based on the code changes made in a project. It analyzes the modified files and their content to create concise and informative commit messages that follow best practices.
## Features
- Analyzes modified files and their content to generate commit messages.
- Follows best practices for commit message formatting, including:
  - Keeping messages under 50 characters.
  - Using the commitizen structure (e.g., `feat`, `fix`, `chore`).
  - Avoiding personal pronouns (e.g., "I", "we").
  - Avoiding co-author messages.
- Do not commit or push code automatically. Only generate and display the commit message for the user to review and use as needed.
## Usage
To use this skill, simply run the command to generate a commit message after making changes to your codebase. The skill will analyze the changes and provide a suggested commit message that you can use or modify as needed.
## Example
After making changes to your code, you can run the following command to generate a commit message:
```generate-commit-message
```
The skill will then analyze the changes and provide a suggested commit message, such as:
```feat: add new feature to improve user experience
```
You can then use this message for your commit or modify it to better fit the specific changes you made.
## Conclusion
The Commit Message Writer skill helps developers create clear and concise commit messages that follow best practices, making it easier for teams to understand the purpose of each commit and maintain a clean commit history.