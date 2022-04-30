const themes = {
  dark: {
    colors: {
      primary: "#F09F10",
      primaryDark: "#C07F0C",
      background: "#1B1B1B",
      text: "#F3F3F3",
      textDisabled: "#CCCCCC",
    },
  },
  light: {
    colors: {
      primary: "#FFFFFF",
      primaryDark: "#FFFFFF",
      background: "#FFFFFF",
      text: "#FFFFFF",
      textDisabled: "#FFFFFF",
    },
  },
};
export default function getTheme(theme) {
  return themes[theme];
}
