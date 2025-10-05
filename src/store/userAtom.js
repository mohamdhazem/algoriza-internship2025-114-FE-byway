import { atom } from "jotai";
import { getToken } from "../auth";
import { jwtDecode } from "jwt-decode";

function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export const userAtom = atom(getUserFromToken());

export const LoggedIn = atom((get) => !!get(userAtom));

export const refreshUserAtom = atom(
  null,
  (get, set) => {
    set(userAtom, getUserFromToken());
  }
);