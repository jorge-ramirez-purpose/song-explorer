export const cn = (...classes: (string | false | undefined | null)[]): string =>
  classes.filter(Boolean).join(' ')
