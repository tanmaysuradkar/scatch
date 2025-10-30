import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const token = localStorage.getItem('token')
  const totalAmount = location.state?.total || 0; // default 0
  const orderList = location.state?.cartItems || []; // default []
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const navigate = useNavigate();
  const handlePayment = async () => {
    console.log("hey Working in Payment  page");

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const { data: { order } } = await axios.post(`${import.meta.env.VITE_backendURL}payment/order`, { amount: totalAmount },);

    const options = {
      key: `${import.meta.env.VITE_paymentId}`, // from .env
      amount: order.amount,
      currency: "INR",
      name: "Scatch bag shop",
      description: "Payment to Scatch",
      order_id: order.id,
      handler: async function (response) {
        const verify = await axios.post(`${import.meta.env.VITE_backendURL}payment/verify`, {
          orderList:orderList,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          amount: order.amount / 100,
        },{ headers: {
                Authorization: `Bearer ${token}`
            }});

        if (verify.data.success) {
          navigate("/Cart");
          alert("Payment Successful!");
        } else {
          navigate("/Cart");
          alert("Payment Verification Failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };
  useEffect(() => {
    handlePayment();
  }, [totalAmount])

  return (
    <div className="flex text-black flex-col items-center justify-center min-h-screen">
      loading........
    </div>
  );
};

export default PaymentPage;
