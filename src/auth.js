import { jwtDecode } from "jwt-decode";

export function getToken() {
    return localStorage.getItem("token");
}

export function getUserRole() {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (error) {
        return null;
    }
}

export function isLoggedIn() {
    return !!getToken();
}

export function logout() {
    return localStorage.removeItem("token");
}