# Coding Rules

## TypeScript & Component Standards

Always follow these patterns when writing code:

1. **Use `type` instead of `interface`** — all type definitions use the `type` keyword
2. **Use arrow functions** — no `function` keyword declarations. All components and functions are arrow functions
3. **Type prefix with T** — all type names start with T: `TStateType`, `TApiResult`, etc. Exception: component prop types are always named `TProps` (not `THeroSectionProps` or `TButtonProps`) since they're scoped to their file
4. **Prefer early return over if/else** — avoid nested if/else branches; use early returns or `continue` to reduce nesting
5. **Use full words for variable names** — avoid abbreviations like `el`, `btn`, `val`. Exception: `ref` is acceptable as it's standard React terminology
6. **Single source of truth for constants** — colors, repeated values, and magic strings must live in a central constants file and be imported from there, never hardcoded inline

## Commit Message Standards

1. **Never mention yourself** — keep messages impersonal (no "I", "we", co-author messages)
2. **Keep title under 50 characters** — concise titles for commits
3. **Use commitizen structure** — format as `feat`, `fix`, `chore`, `refactor`, etc.
4. **Always include a body** — 1–3 sentences explaining what changed and why; not exhaustive, just enough context to understand the commit without reading the diff

## Other Rules

- **Plan references** — when the user says "check the plan", look in the `.plan` folder
