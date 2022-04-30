const themes = {
  dark: {
    colors: {
      primary: "#F09F10",
      primaryDark: "#C07F0C",
      background: "#1B1B1B",
      font: "#F3F3F3",
      fontDisabled: "#CCCCCC",
    },
  },
  light: {
    colors: {
      primary: "#FFFFFF",
      primaryDark: "#FFFFFF",
      background: "#FFFFFF",
      font: "#FFFFFF",
      fontDisabled: "#FFFFFF",
    },
  },
};
export default function getTheme(theme) {
  return themes[theme];
}
