import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accountt from "../../assets/accountt.jpg";

import Orders from "@/components/shopping-view/order";
import Address from "@/components/shopping-view/address";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountt}
          className="h-full w-full object-cover object-center"
          alt="Account Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
          <h1 className="text-3xl font-bold tracking-wide">My Account</h1>
          <p className="text-lg text-gray-200">Manage your orders & address</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-2xl border bg-white/80 backdrop-blur-md p-6 shadow-xl">
          <Tabs defaultValue="orders" className="w-full">
            {/* Tab Buttons */}
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
              <TabsTrigger
                value="orders"
                className="rounded-xl data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-gray-700"
              >
                🛒 Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-xl data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-gray-700"
              >
                📍 Address
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <Orders />
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="mt-6">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
