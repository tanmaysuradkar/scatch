import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const handlePayment = async () => {
    const { data: { order } } = await axios.post(`${import.meta.env.VITE_backendURL}payment/order`, { amount: 500 });

    const options = {
      key: "your_key_id", // from .env
      amount: order.amount,
      currency: "INR",
      name: "Your App Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const verify = await axios.post("http://localhost:5000/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          amount: order.amount / 100,
        });

        if (verify.data.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment Verification Failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Pay ₹500</h2>
      <button onClick={handlePayment} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
