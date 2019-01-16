export const copy = text => {
    const el = document.createElement('textarea');
    el.id = "dummy";
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

export const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        return "dark";
    } else {
        return "light";
    }
}

export const toggleTheme = () => {
    const theme = getTheme();
    if (theme === "dark") {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

export const getLanguage = () => {
    const navigatorLang = navigator.language.substr(0, 2);
    let lang = localStorage.getItem("language") || navigatorLang;
    if (lang !== "fr" && lang !== "en") {
        lang = "en";
    }
    return lang;
}

export const setLanguage = lang => {
    localStorage.setItem("language", lang);
    window.dispatchEvent(new CustomEvent("language"), {
        detail: {
            language: lang
        }
    });
}

export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}