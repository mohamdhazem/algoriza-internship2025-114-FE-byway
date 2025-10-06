import { ChevronRight } from "lucide-react"
import RateDisplay from "../courses/RateDisplay"
import { useEffect, useState } from "react"
import { showError, showSuccess } from "../../../utils/popup";
import { getEnumLabel, LevelEnum } from "../../../utils/enums";
import { useAtom, useSetAtom } from "jotai";
import { cartCoursesCountAtom, refreshCartCoursesCountAtom } from "../../../store/cartAtom";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";

export const CartCourses = () => {

    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchCartCourses() {
        setLoading(true);

        try {
            const res = await api.get("/cart/Courses");
            setCourses(res.data.courses);
            setCart(res.data);
        } catch (err) {
            console.error("Failed to load cart courses:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCartCourses();
    }, []);


    const [, refreshCartCount] = useAtom(refreshCartCoursesCountAtom);

    const handleRemoveCourse = async (id) => {
        try {
            await api.delete(`/cart/Courses/${id}`);
            refreshCartCount();
            await fetchCartCourses();

        } catch (error) {
            showError(
                error.response?.data?.message || error.message || "Something went wrong while removing the course"
            );
        }
    };

    const navigate = useNavigate();
    const handleGoTOCheckout = () => {
        if (courses?.length === 0)
            showError("Cart Is Empty")
        else
            navigate("/checkout");
    }

    return (
        <div className="font-inter px-20 py-10 min-h-150">
            <div className="flex justify-start items-center gap-1.5 text-sm">
                <h2 className="mr-8 mb-2">Shopping Cart</h2>
                <p className="text-sm">Courses</p>
                <ChevronRight className="text-[#E2E8F0]" size={18} />
                <p className="text-sm">Details</p>
                <ChevronRight className="text-[#E2E8F0]" size={18} />
                <p className="text-[#2563EB] text-sm">
                    Shopping Cart
                </p>
            </div>
            <div className="flex text-start">
                {loading ? (
                    <div className="flex justify-center items-center w-full py-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900 border-solid"></div>
                    </div>
                ) : (
                    <>
                        <div className="w-[69%] pt-2.5">
                            {courses.length === 0 ? (
                                <div className="flex items-center justify-center py-40">
                                    <h4 className="text-gray-600 font-medium">Cart is Empty</h4>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm py-1">{courses.length} Courses in cart</p>
                                    <hr className="text-gray-200" />

                                    <div className="flex flex-col mt-5 gap-3.5">
                                        {courses.map((c) => (
                                            <div key={c.id} className="flex p-3 border border-gray-200 rounded-lg h-35">
                                                <div className="flex gap-2">
                                                    <img src={c.imageUrl} className="rounded-lg w-49" alt={c.name} />
                                                    <div className="flex flex-col">
                                                        <h5 className="text-gray-900">{c.name}</h5>
                                                        <p className="text-sm mt-0.5">{c.instructorName}</p>
                                                        <div className="flex justify-start items-center gap-1.5 text-sm">
                                                            <p className="text-[#FEC84B] pt-1">{c.rate}</p>
                                                            <RateDisplay value={Math.round(c.rate ?? 0)} />
                                                            <div className="w-[1px] bg-gray-400 h-3.5 mx-1"></div>
                                                            <p className="text-sm text-black">
                                                                {c.totalHours} Total Hours. {c.totalLectures} Lectures. {getEnumLabel(LevelEnum, c.level)}
                                                            </p>
                                                        </div>
                                                        <p
                                                            onClick={() => handleRemoveCourse(c.id)}
                                                            className="text-[#DC2626] text-sm cursor-pointer hover:underline"
                                                        >
                                                            Remove
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col ml-auto">
                                                    <h3>${c.cost}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="w-[25%] flex flex-col gap-2 ml-auto">
                            <h4>Order Details</h4>
                            <div className="flex flex-col gap-3 border border-gray-200 rounded-lg px-4 py-4 bg-[#F8FAFC]">
                                <div className="flex justify-between">
                                    <p>Price</p>
                                    <h5 className="text-gray-900">${cart?.price ?? 0}</h5>
                                </div>
                                <div className="flex justify-between">
                                    <p>Discount</p>
                                    <h5 className="text-gray-900">${cart?.discount ?? 0}</h5>
                                </div>
                                <div className="flex justify-between">
                                    <p>Tax</p>
                                    <h5 className="text-gray-900">${cart?.tax ?? 0}</h5>
                                </div>
                                <hr className="text-gray-200" />
                                <div className="flex justify-between">
                                    <h4>Total</h4>
                                    <h4 className="text-gray-900">${cart?.total ?? 0}</h4>
                                </div>
                            </div>

                            <button
                                disabled={courses.length === 0 ? true : false}
                                onClick={handleGoTOCheckout}
                                className={`${courses.length === 0 ? `bg-[#D9D9D9]` : `bg-[#020617]`} bg-[#020617] rounded-lg cursor-pointer text-white h-12 text-sm mt-2 flex items-center justify-center`}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}