import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItemsContent from './cart-items-content'
import { useSelector } from 'react-redux'
import { ShoppingBagIcon } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  let { user } = useSelector((state) => state.auth)
  let navigate = useNavigate()

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0

  return (
    <SheetContent className="sm:max-w-md p-4 bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <SheetHeader className="border-b pb-4">
        <SheetTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            <div className=" flex gap-2 flex-wrap ">
 <ShoppingBagIcon className=' bg-amber-300 size-10 p-2 rounded-2xl cursor-pointer'></ShoppingBagIcon>
        <p className='mt-1'>Your Cart  </p> 
            </div>
       
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="mt-6 flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <UserCartItemsContent cartItem={item} key={index} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            Your cart is empty 🛒
          </p>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-gray-700 dark:text-gray-300">Total</span>
          <span className="text-primary font-bold">${totalCartAmount}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={() => {navigate('/shop/checkout')
          setOpenCartSheet(false) }
        }
        className="w-full mt-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium py-3 transition duration-200"
      >
        Checkout
      </Button>
    </SheetContent>
  )
}

export default UserCartWrapper
