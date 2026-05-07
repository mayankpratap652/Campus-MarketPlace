import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { useSelector } from "react-redux";
import { HouseIcon, LocateIcon, NotebookIcon, PhoneCallIcon, PinIcon, UserIcon } from "lucide-react";

const initialFormData = {
  status: "",
};

function ShoppingOrderDetails({orderDetails}) {
  const [formData, setFormData] = useState(initialFormData);
let {user }= useSelector((state)=> state.auth);


  function handleUpdateStatus() {
    // TODO: dispatch update logic here
    console.log("Updating order status:", formData.status);
  }

  // Utility for dynamic status badge
  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "In Process":
        return `${base} bg-blue-100 text-blue-800`;
      case "In Shipping":
        return `${base} bg-purple-100 text-purple-800`;
      case "Delivered":
        return `${base} bg-green-100 text-green-800`;
      case "Rejected":
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  return (
    < DialogContent className="sm:max-w-[650px] ">
      <div className="grid gap-6 p-3">
        {/* Order Summary */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label className="text-green-600 font-semibold">{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label className="text-green-600 font-semibold">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Status</p>
            <span className={getStatusBadge("In Process")}>In Process</span>
          </div>
        </div>

        <hr />

        {/* Order Items */}
        <div className="grid gap-3">
          <div className="font-medium">Order Items</div>
          <ul className="grid gap-2 text-sm">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? orderDetails?.cartItems.map((item)=> (

<li className="flex justify-between border-b pb-1">
              <span> Title:{item.title}</span>
               <span className="">Qty: {item.quantity}</span>
              <span className="font-semibold text-gray-700">Price: ${item.price}</span>
            </li>



            )):
            null}
            
         
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-3">
          <div className="font-medium">Shipping Info</div>
          <div className=" text-sm text-gray-600">
            <span className="flex items-center gap-2 text-black p-1"><UserIcon/>{user.userName}</span>
            <span className="flex items-center gap-2 text-black p-1"><HouseIcon/>{orderDetails?.addressInfo?.address}</span>
            <span className="flex items-center gap-2 text-black p-1"><LocateIcon/>{orderDetails?.addressInfo?.city}</span>
            <span className="flex items-center gap-2 text-black p-1"><PinIcon/>{orderDetails?.addressInfo?.pincode}</span>
            <span className="flex items-center gap-2 text-black p-1 "><PhoneCallIcon/>{orderDetails?.addressInfo?.phone}</span>
            <span className="flex items-center gap-2 text-black p-1"><NotebookIcon/>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        {/* Update Order Status */}
        <div>
         
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;
