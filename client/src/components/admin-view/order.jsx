import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./orders-details";


function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
  console.log(orderList);
  
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
  console.log("UPDATED ORDER LIST:", orderList);
}, [orderList]);
  return (
    <div className="p-6 bg-gray-50 max-h-screen w-full">
      <Card className="shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="border-b bg-white rounded-t-2xl px-6 py-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            📦 All Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="w-full text-sm text-left">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                <TableHead className="font-semibold text-gray-700">Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                <TableHead className="font-semibold text-gray-700">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow
                    key={orderItem?._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell className="font-mono text-gray-700">
                      {orderItem?._id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 rounded-lg text-white text-xs font-medium
                          ${
                            orderItem?.orderStatus === "confirmed"
                              ? "bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : "bg-gray-700"
                          }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-800 font-semibold">
                      ${orderItem?.totalAmount}
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-gray-500"
                  >
                    No orders found 🚫
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;
