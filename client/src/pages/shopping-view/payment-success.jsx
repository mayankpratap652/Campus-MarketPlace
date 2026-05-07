import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {

let navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-2">
          Your transaction has been completed successfully.  
          Thank you for your purchase!
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition " onClick={() => navigate("/shop/account")}>
            Views Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
