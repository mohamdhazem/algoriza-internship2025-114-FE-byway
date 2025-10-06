import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showError } from "../../../utils/popup";
import { useAtom, useSetAtom } from "jotai";
import { refreshUserAtom } from "../../../store/userAtom";
import { refreshCartCoursesCountAtom } from "../../../store/cartAtom";

export const AuthCallback = () => {
    const navigate = useNavigate();
    const serRefreshUserAtom = useSetAtom(refreshUserAtom);
    const [, refreshCartCount] = useAtom(refreshCartCoursesCountAtom);


    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get("token");

    useEffect(() => {

        console.log(hash);
        console.log(params);
        console.log(token);

        if (token) {
            localStorage.setItem("token", token);
            serRefreshUserAtom();
            refreshCartCount();
            console.log("token:",token);
            navigate("/Landing");
        } else {
            navigate("/userlogin");
            showError("Something Went Error!!");
        }
    }, []);

    return <p>Signing you in...</p>;
}
