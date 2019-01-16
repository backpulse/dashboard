export function saveJWT(token) {
    localStorage.setItem("JWT", "Bearer " + token);
}

export function getJWT() {
    return localStorage.getItem("JWT");
}

export function removeJWT() {
    localStorage.setItem("JWT", "");
}

export function signOut() {
    removeJWT();
    window.location = "/";
}

export function getUser() {
    const token = getJWT();
    if(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}