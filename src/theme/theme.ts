// colors
const darkColors = {
  primary: "#F09F10",
  primaryDark: "#C07F0C",
  background: "#1B1B1B",
  backgroundSecondary: "#0F0F0F",
  text: "#F3F3F3",
  textSecondary: "#CCCCCC",
};
const lightColors = {
  primary: "#F09F10",
  primaryDark: "#C07F0C",
  background: "#1B1B1B",
  backgroundSecondary: "#0F0F0F",
  text: "#F3F3F3",
  textSecondary: "#CCCCCC",
};
// sizes
const size = {
  icon: {
    small: 24,
    medium: 48,
    large: 72,
  },
};
const themes: Themes = {
  dark: {
    color: darkColors,
    size: size,
  },
  light: {
    color: lightColors,
    size: size,
  },
};
type Theme = {
  color: object;
  size: object;
};
type Themes = {
  [index in ThemeName]: Theme;
};
type ThemeName = "dark" | "light";
export default function getTheme(theme: ThemeName) {
  return themes[theme as keyof typeof themes];
}
