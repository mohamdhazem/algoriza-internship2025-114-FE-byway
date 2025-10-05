import { atom } from "jotai";
import api from "../api";

// base count atom (writable)
export const cartCoursesCountAtom = atom(0);

// async refresh atom (action)
export const refreshCartCoursesCountAtom = atom(
    null,
    async (_get, set) => {
        try {
            const res = await api.get("/cart/Count");
            set(cartCoursesCountAtom, Number(res.data) || 0);
        } catch (err) {
            console.error("Failed to refresh cart count:", err);
            set(cartCoursesCountAtom, 0);
        }
    }
);
