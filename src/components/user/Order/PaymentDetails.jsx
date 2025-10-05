import { ChevronRight } from "lucide-react"
import RateDisplay from "../courses/RateDisplay"
import { useEffect, useState } from "react";
import { showError, showSuccess } from "../../../utils/popup";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { refreshCartCoursesCountAtom } from "../../../store/cartAtom";
import api from "../../../api";

export const PaymentDetails = () => {
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useState(null);
    const [errors, setErrors] = useState({});
    const [, refreshCartCount] = useAtom(refreshCartCoursesCountAtom);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCartCourses() {
            try {
                const res = await api.get("/cart/Courses");
                setCourses(res.data.courses);
                setCart(res.data);
            } catch (err) {
                console.error("Failed to load cart courses:", err);
                showError(
                    err.response?.data?.message || err.message || "Something went wrong"
                );
            }
        }
        fetchCartCourses();
    }, [courses]);


    const [formData, setFormData] = useState({
        country: "",
        state: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.cardName.trim()) newErrors.cardName = "Card name is required";
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = "Card number is required";
        } else if (!/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = "Card number must be 16 digits";
        }
        if (!formData.expiry.trim()) {
            newErrors.expiry = "Expiry date is required";
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = "Expiry must be in MM/YY format";
        }
        if (!formData.cvc.trim()) {
            newErrors.cvc = "CVC is required";
        } else if (!/^\d{3,4}$/.test(formData.cvc)) {
            newErrors.cvc = "CVC must be 3 or 4 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            // split expiry MM/YY
            const [month, year] = formData.expiry.split("/");

            const orderDto = {
                totalPrice: cart?.total,
                tax: cart?.tax,
                payment: {
                    country: formData.country,
                    state: formData.state,
                    cardName: formData.cardName,
                    cardNumber: formData.cardNumber,
                    expiryMonth: month,
                    expiryYear: `20${year}`,
                    cvv: formData.cvc,
                },
            };

            const res = await api.post("/order", orderDto);
            console.log("Order submitted:", res.data);
            refreshCartCount();
            navigate("/PurchaseComplete");
        } catch (err) {
            console.error("Order failed:", err.response?.data || err.message);
            showError(err.response?.data?.message || "Failed to place order");
        }
    };

    return (
        <div className="font-inter px-20 py-8 min-h-150">
            <div className="flex justify-start items-center gap-1.5 text-sm">
                <h3 className="mr-6 mb-2 ">Shopping Cart</h3>
                <p className="text-sm">Courses</p>
                <ChevronRight className="text-[#E2E8F0]" size={18} />
                <p className="text-sm">Details</p>
                <ChevronRight className="text-[#E2E8F0]" size={18} />
                <p className="text-[#2563EB] text-sm">
                    Shopping Cart
                </p>
            </div>
            <div className="flex justify-between gap-6">
                {/* payment */}
                <div className="flex flex-col p-3 border border-gray-200 rounded-xl w-full">
                    {/* Country & State */}
                    <div className="flex justify-between gap-2 text-start pl-3">
                        <div className="flex flex-col gap-1.5 w-1/2">
                            <label htmlFor="country" className="text-lg font-semibold text-gray-900">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Enter Country"
                                className="border border-gray-200 rounded-lg py-2.5 pl-4 text-[20px] placeholder:text-[#94A3B8] placeholder:text-[16px] text-gray-900 outline-none focus:ring-0 focus:border-gray-300"
                            />
                            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

                        </div>
                        <div className="flex flex-col gap-1.5 w-1/2">
                            <label htmlFor="state" className="text-lg font-semibold text-gray-900">
                                State/Union Territory
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Enter State"
                                className="border border-gray-200 rounded-lg py-2.5 pl-4 text-[20px] placeholder:text-[#94A3B8] placeholder:text-[16px] text-gray-900 outline-none focus:ring-0 focus:border-gray-300"
                            />
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <h5 className="text-gray-900 mt-4 mb-2 text-start">Payment Method</h5>
                    <div className="flex flex-col bg-[#F8FAFC] rounded-lg p-3 gap-4">
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2 cursor-pointer text-lg font-semibold">
                                <input type="radio" name="payment" className="w-6 h-6 accent-blue-600" checked readOnly />
                                Credit/Debit Card
                            </label>
                            <img src="/icons/payment/visa.png" alt="Card Icon" className="w-[72.5px] h-[28.5px]" />
                        </div>

                        <div className="flex flex-col gap-1 text-start">
                            <label htmlFor="cardName" className="text-sm text-gray-900">
                                Name of Card
                            </label>
                            <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                placeholder="Name on Card"
                                className="border border-gray-200 rounded-lg py-2.5 pl-4 text-[20px] placeholder:text-[#94A3B8] placeholder:text-[16px] text-gray-900 bg-white outline-none focus:ring-0 focus:border-gray-300"
                            />
                            {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}

                            <label htmlFor="cardNumber" className="text-sm text-gray-900 mt-3">
                                Card Number
                            </label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="Card Number"
                                className="border border-gray-200 rounded-lg py-2.5 pl-4 text-[20px] placeholder:text-[#94A3B8] placeholder:text-[16px] text-gray-900 bg-white outline-none focus:ring-0 focus:border-gray-300"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

                            <div className="flex justify-between gap-2 mt-3">
                                <div className="flex flex-col gap-1.5 w-1/2">
                                    <label htmlFor="expiry" className="text-sm text-gray-900">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={formData.expiry}
                                        onChange={handleChange}
                                        placeholder="MM/YY"
                                        className="border border-gray-200 rounded-lg py-2.5 pl-4 text-[20px] placeholder:text-[#94A3B8] placeholder:text-[16px] text-gray-900 bg-white outline-none focus:ring-0 focus:border-gray-300"
                                    />
                                    {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}

                                </div>
                                <div className="flex flex-col gap-1.5 w-1/2">
                                    <label htmlFor="cvc" className="text-sm text-gray-900">
                                        CVC/CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={formData.cvc}
                                        onChange={handleChange}
                                        placeholder="CVC/CVV"
                                        className="border border-gray-200 rounded-lg py-2.5 pl-4 text-[20px] placeholder:text-[#94A3B8] placeholder:text-[16px] text-gray-900 bg-white outline-none focus:ring-0 focus:border-gray-300"
                                    />
                                    {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PayPal (disabled) */}
                    <div className="flex justify-between items-center bg-[#F8FAFC] mt-4 px-3 py-4">
                        <label className="flex items-center gap-2 cursor-pointer text-lg font-semibold">
                            <input type="radio" name="payment" className="w-6 h-6" disabled />
                            PayPal
                        </label>
                        <img src="/icons/payment/paypal.png" alt="Card Icon" className="w-[72.5px] h-[28.5px]" />
                    </div>
                </div>
                {/* courses */}
                <div className="min-w-[32%] flex flex-col gap-2 text-start">
                    <h4>Order Details (3)</h4>
                    <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-4 py-3 bg-[#F8FAFC]">
                        {
                            courses.map((c, index) => (
                                <div key={index}>
                                    <h5 className="text-[#334155] font-medium truncate">{c.name}</h5>

                                    {index < courses.length - 1 && <hr className="text-gray-200 mt-2" />}
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-start items-center gap-3 border border-gray-200 rounded-lg px-4 py-4 bg-[#F8FAFC]">
                        <img src="icons/payment/discount.svg" className="" alt="" />
                        <p className="text-sm">APPLY COUPON CODE</p>
                    </div>
                    {/* prices */}
                    <div className="flex flex-col gap-3 border border-gray-200 rounded-lg px-4 py-4 bg-[#F8FAFC]">
                        <div className="flex justify-between">
                            <p>Price</p>
                            <h5 className="text-gray-900">${cart?.price}</h5>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount</p>
                            <h5 className="text-gray-900">${cart?.discount}</h5>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax</p>
                            <h5 className="text-gray-900">${cart?.tax}</h5>
                        </div>
                        <hr className="text-gray-200" />
                        <div className="flex justify-between">
                            <h4>Total</h4>
                            <h4 className="text-gray-900">${cart?.total}</h4>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-[#020617] rounded-lg cursor-pointer text-white h-12 text-sm mt-2">
                        Proceed to Checkout
                    </button>
                </div>
            </div>

        </div>
    )
}