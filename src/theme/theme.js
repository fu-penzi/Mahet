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
const themes = {
  dark: {
    color: darkColors,
    size: size,
  },
  light: {
    color: lightColors,
    size: size,
  },
};
export default function getTheme(theme) {
  return themes[theme];
}
