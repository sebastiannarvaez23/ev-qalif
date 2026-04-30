export const THEME = {
  bg: "#fff7fa",
  card: "#ffffff",
  primary: "#d96c95",
  primarySoft: "#f4a6c1",
  primaryDark: "#b3527a",
  text: "#333333",
  border: "#eeeeee",
  muted: "#888888",
  danger: "#f1c2d1",
} as const;

export type ThemeTokens = typeof THEME;
