"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  Truck,
} from "lucide-react";
import { ORDER_API_END_POINT } from "@/constant/api";

interface OrderItem {
  bookId: string | { _id: string; title: string; image: string };
  title: string;
  price: number;
  quantity: number;
  image: string;
  _id: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  _id: string;
  userId?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  paymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(ORDER_API_END_POINT);
      console.log("Fetched orders:", data.data);
      setOrders(data.data || []);

      const total = data.data.length;
      const pending = data.data.filter(
        (o: Order) => o.status === "pending"
      ).length;
      const processing = data.data.filter(
        (o: Order) => o.status === "processing"
      ).length;
      const shipped = data.data.filter(
        (o: Order) => o.status === "shipped"
      ).length;
      const delivered = data.data.filter(
        (o: Order) => o.status === "delivered"
      ).length;
      const cancelled = data.data.filter(
        (o: Order) => o.status === "cancelled"
      ).length;

      setStats({ total, pending, processing, shipped, delivered, cancelled });
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);

      const { data } = await axios.put(`${ORDER_API_END_POINT}`, {
        orderId,
        status: newStatus,
      });

      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
      console.error(error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <TrendingUp className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-500 mt-1">
          Manage and track all customer orders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <Package className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending
            </CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Processing
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.processing}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Delivered
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Cancelled
            </CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500">
              Orders will appear here once customers make purchases
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              Manage order status and view details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-mono text-sm">
                        #{order._id.slice(-6).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">
                            {order.shippingAddress.fullName}
                          </p>
                          <p className="text-gray-500">
                            {order.shippingAddress.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <img
                                key={idx}
                                src={item.image}
                                alt={item.title}
                                className="w-8 h-10 object-cover rounded border-2 border-white"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {order.items.length} item(s)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        Rs {order.totalAmount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : order.paymentStatus === "failed"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : ""
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            handleStatusUpdate(order._id, value)
                          }
                          disabled={updatingOrderId === order._id}
                        >
                          <SelectTrigger className="w-36 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-yellow-600" />
                                <span>Pending</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="processing">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                <span>Processing</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="shipped">
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-purple-600" />
                                <span>Shipped</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="delivered">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>Delivered</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="cancelled">
                              <div className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span>Cancelled</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about this order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-mono font-semibold">
                    #{selectedOrder._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge
                    variant={
                      selectedOrder.paymentStatus === "paid"
                        ? "default"
                        : "secondary"
                    }
                    className="mt-1"
                  >
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedOrder.status)}
                    <Badge>{selectedOrder.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <div className="mt-2 text-sm space-y-1">
                          <p className="text-gray-600">
                            Price: Rs {item.price}
                          </p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-semibold text-indigo-600">
                            Subtotal: Rs {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm space-y-1">
                  <p className="font-medium">
                    {selectedOrder.shippingAddress.fullName}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.phone}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.address}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold">
                      Rs {selectedOrder.totalAmount}
                    </span>
                  </div>
                  {selectedOrder.paymentIntentId && (
                    <p className="text-xs text-gray-500 break-all">
                      Payment Intent: {selectedOrder.paymentIntentId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
