export const THEME_STORAGE_KEY = "theme";

/** Runs before paint so the first frame matches the saved or system theme. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var dark=window.matchMedia("(prefers-color-scheme: dark)").matches;var theme=s==="light"||s==="dark"?s:(dark?"dark":"light");var root=document.documentElement;root.classList.toggle("dark",theme==="dark");root.style.colorScheme=theme;}catch(e){}})();`;
