import { deleteCookie, getCookies, setCookie } from 'cookies-next'

export const CookiesNames = {
    ACCESS_TOKEN: "future_bazaar.token",
    REFRESH_TOKEN: "future_bazaar.refreshtoen",
    USER: "future_bazaar.user"
}

export function getTokenExpiry() {
    const addThirtyDays = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + addThirtyDays);
    return futureDate;
}

export function getSession() {
    const cookies = getCookies();
    const user = cookies[CookiesNames.USER];
    if (user) {
        return {
            accessToken: cookies[CookiesNames.ACCESS_TOKEN],
            refreshToken: cookies[CookiesNames.REFRESH_TOKEN],
            user: user && JSON.parse(decodeURIComponent(user))
        }
    }
}

export const setSession = (response) => {
    const { accessToken, refreshToken, data } = response;
    const userData = JSON.stringify(data);
    const tokenExpiry = getTokenExpiry();
    setCookie(CookiesNames.ACCESS_TOKEN, accessToken, { expires: tokenExpiry });
    setCookie(CookiesNames.REFRESH_TOKEN, refreshToken, { expires: tokenExpiry });
    setCookie(CookiesNames.USER, userData, { expires: tokenExpiry });
}

export const clearSession = (redirectToHome = false) => {
    deleteCookie(CookiesNames.ACCESS_TOKEN);
    deleteCookie(CookiesNames.REFRESH_TOKEN);
    deleteCookie(CookiesNames.USER);
    if (redirectToHome) window.location.href = "/login";
}

export const setCookieItem = (cName, cValue, expDays) => {
    const cookieDetails = `${cName}=$${cValue}`;
    if (expDays) {
        const expires = `expires=${expDays}`
        document.cookie = `${cookieDetails} ${expires} path=/`;
    } else
        document.cookie = `${cookieDetails} path=/`;
}

export const getCookieItem = (cName) => {
    const match = document.cookie.match(new RegExp(`(^|)${cName}=([^;]+)`));
    if (match) return match[2];
    return ""
}