import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import CommonForm from "../common/form";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView() {
  const [formData, setFormData] = useState(initialFormData);

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
    <DialogContent className="sm:max-w-[650px] ">
      <div className="grid gap-6 p-3">
        {/* Order Summary */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>1245</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>20/08/2025</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label className="text-green-600 font-semibold">$25,875</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>Cash</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label className="text-green-600 font-semibold">Paid</Label>
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
            <li className="flex justify-between border-b pb-1">
              <span>📦 Title: Product A</span>
              <span>Qty: 2</span>
              <span className="font-semibold text-gray-700">$1563</span>
            </li>
            <li className="flex justify-between border-b pb-1">
              <span>📦 Title: Product B</span>
              <span>Qty: 1</span>
              <span className="font-semibold text-gray-700">$999</span>
            </li>
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-3">
          <div className="font-medium">Shipping Info</div>
          <div className="grid gap-0.5 text-sm text-gray-600">
            <span>👤 John Doe</span>
            <span>🏠 123 Market Street</span>
            <span>🏙 New York</span>
            <span>📮 10001</span>
            <span>📞 +1 234 567 890</span>
            <span>📝 Leave at front desk</span>
          </div>
        </div>

        {/* Update Order Status */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "Pending", label: "Pending" },
                  { id: "In Process", label: "In Process" },
                  { id: "In Shipping", label: "In Shipping" },
                  { id: "Delivered", label: "Delivered" },
                  { id: "Rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
