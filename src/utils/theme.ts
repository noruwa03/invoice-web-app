export const getTheme = () => {
    const theme = window.localStorage.theme
      ? window.localStorage.theme
        : "dark";
    return theme;
}