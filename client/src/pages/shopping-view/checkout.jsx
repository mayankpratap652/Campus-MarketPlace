import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import accountt from "../../assets/accountt.jpg";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";



function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymemntStart] = useState(false)
    const { approvalURL } = useSelector((state) => state.shopOrder);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

    


  let handleInitiatePaypalPayment = () => {

    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast("Your Cart is empty. Please add items to proceed");
      return;
    }

    if (currentSelectedAddress === null) {
      toast("Please select one address to proceed.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => (
        {
          productId: singleCartItem?.productId,
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          price:
            singleCartItem?.salePrice > 0
              ? singleCartItem?.salePrice
              : singleCartItem?.price,
          quantity: singleCartItem?.quantity,
        }
      )
      ),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data,"sangam");
      if (data?.payload?.success) {
        toast("PAYPAL INITIATE SUCCESSFULLY WITH ADDRESS--!")
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });

  }

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountt}
          className="h-full w-full object-cover object-center"
          alt="Checkout Banner"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg ">
            Secure Checkout
          </h1>
        </div>
      </div>

      {/* Checkout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 p-6">
        {/* Address Section */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart Summary Section */}
        <div className="flex flex-col gap-4 bg-white shadow-lg rounded-2xl p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Your Cart
          </h2>

          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              Your cart is empty.
            </p>
          )}

          {/* Total */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total</span>
              <span className="text-indigo-600">${totalCartAmount}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-base py-6 rounded-xl shadow-md transition-all">
              {isPaymentStart ? "Processing Paypal Payment..."
              : "💳 checkout with Paypal"
              }
           
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
