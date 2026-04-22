# Coding Rules

## TypeScript & Component Standards

Always follow these patterns when writing code:

1. **Use `type` instead of `interface`** — all type definitions use the `type` keyword
2. **Use arrow functions** — no `function` keyword declarations. All components and functions are arrow functions
3. **Type prefix with T** — all prop/type names start with T: `TComponentProps`, `TStateType`, etc.
4. **Prefer early return over if/else** — avoid nested if/else branches; use early returns or `continue` to reduce nesting

## Commit Message Standards

1. **Never mention yourself** — keep messages impersonal (no "I", "we", co-author messages)
2. **Keep under 50 characters** — concise titles for commits
3. **Use commitizen structure** — format as `feat`, `fix`, `chore`, `refactor`, etc.

## Other Rules

- **Plan references** — when the user says "check the plan", look in the `.plan` folder
