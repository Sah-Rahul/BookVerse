"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(ORDER_API_END_POINT);
      const fetchedOrders = data.data || [];
      setOrders(fetchedOrders);

      setStats({
        total: fetchedOrders.length,
        pending: fetchedOrders.filter((o: Order) => o.status === "pending")
          .length,
        delivered: fetchedOrders.filter((o: Order) => o.status === "delivered")
          .length,
      });
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      pending: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: Clock,
      },
      processing: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: TrendingUp,
      },
      shipped: {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        icon: Truck,
      },
      delivered: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      cancelled: {
        color: "bg-red-100 text-red-700 border-red-200",
        icon: XCircle,
      },
    };

    const Config = variants[status] || variants.pending;
    const Icon = Config.icon;

    return (
      <Badge
        className={`${Config.color} hover:${Config.color} px-2 py-1 flex w-fit items-center gap-1 font-medium capitalize border`}
      >
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  if (loading) return <OrderSkeleton />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Order Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and review your recent store transactions.
          </p>
        </div>
        <div className="flex gap-3">
          <StatSmall
            label="Total"
            value={stats.total}
            icon={Package}
            color="text-indigo-600"
          />
          <StatSmall
            label="Pending"
            value={stats.pending}
            icon={Clock}
            color="text-yellow-600"
          />
          <StatSmall
            label="Success"
            value={stats.delivered}
            icon={CheckCircle}
            color="text-green-600"
          />
        </div>
      </div>

      <Card className="shadow-sm border-gray-200 overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b">
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-30">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-40 text-center text-muted-foreground"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="font-mono text-xs font-bold uppercase text-indigo-600">
                      #{order._id.slice(-6)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {order.shippingAddress.fullName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.shippingAddress.city}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">
                      Rs{order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.paymentStatus === "paid" ? "default" : "outline"
                        }
                        className={
                          order.paymentStatus === "paid"
                            ? "bg-green-600"
                            : "text-gray-500"
                        }
                      >
                        {order.paymentStatus.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-indigo-600 hover:bg-indigo-50"
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md overflow-y-auto">
                          <SheetHeader className="border-b pb-4">
                            <SheetTitle>Order Details</SheetTitle>
                            <SheetDescription>
                              Order ID: {order._id}
                            </SheetDescription>
                          </SheetHeader>

                          <div className="mt-6 space-y-6">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                                Items Purchased
                              </h4>
                              <div className="space-y-3">
                                {order.items.map((item) => (
                                  <div
                                    key={item._id}
                                    className="flex gap-4 p-2 rounded-lg border bg-gray-50/50"
                                  >
                                    <img
                                      src={item.image}
                                      className="w-14 h-14 object-cover rounded shadow-sm"
                                      alt=""
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold truncate">
                                        {item.title}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Qty: {item.quantity} × Rs{item.price}
                                      </p>
                                    </div>
                                    <div className="text-sm font-bold">
                                      Rs{item.price * item.quantity}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Truck className="w-4 h-4" /> Shipping
                                Information
                              </h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="font-semibold text-gray-900">
                                  {order.shippingAddress.fullName}
                                </p>
                                <p>{order.shippingAddress.phone}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>
                                  {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.state} -{" "}
                                  {order.shippingAddress.zipCode}
                                </p>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total Amount</span>
                                <span className="text-indigo-600 text-2xl">
                                  Rs{order.totalAmount}
                                </span>
                              </div>
                              <p className="text-xs text-center text-gray-400 mt-4 italic text-balance">
                                Payment processed via secure gateway
                              </p>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const StatSmall = ({ label, value, icon: Icon, color }: any) => (
  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border shadow-sm min-w-30">
    <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-lg font-bold leading-none">{value}</p>
    </div>
  </div>
);

const OrderSkeleton = () => (
  <div className="p-8 space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-10 w-64" />
      <div className="flex gap-2">
        <Skeleton className="h-12 w-28" />
        <Skeleton className="h-12 w-28" />
      </div>
    </div>
    <Skeleton className="h-100 w-full rounded-xl" />
  </div>
);

export default Orders;
