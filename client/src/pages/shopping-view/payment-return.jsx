import React from "react";

function PaymentReturnPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
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

        <h1 className="text-2xl font-bold mt-4 text-gray-800">Payment Successful 🎉</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        <div className="mt-6">
          <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-xl shadow hover:bg-red-700 transition">
            Go to Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentReturnPage;
