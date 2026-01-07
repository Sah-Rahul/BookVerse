"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Package, Clock, CheckCircle, XCircle, Truck, Eye } from "lucide-react";
import { ORDER_API_END_POINT } from "@/constant/api";

interface Order {
  _id: string;
  items: any[];
  shippingAddress: any;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(ORDER_API_END_POINT);
        setOrders(data.data || []);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const getStatusConfig = (status: string) => {
    const configs: any = {
      pending: {
        icon: Clock,
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      },
      processing: {
        icon: Truck,
        color: "bg-blue-50 text-blue-700 border-blue-200",
      },
      shipped: {
        icon: Truck,
        color: "bg-purple-50 text-purple-700 border-purple-200",
      },
      delivered: {
        icon: CheckCircle,
        color: "bg-green-50 text-green-700 border-green-200",
      },
      cancelled: {
        icon: XCircle,
        color: "bg-red-50 text-red-700 border-red-200",
      },
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage your orders</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Package}
            label="Total"
            value={stats.total}
            color="bg-indigo-500"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={stats.pending}
            color="bg-yellow-500"
          />
          <StatCard
            icon={CheckCircle}
            label="Delivered"
            value={stats.delivered}
            color="bg-green-500"
          />
          <StatCard
            icon={XCircle}
            label="Cancelled"
            value={stats.cancelled}
            color="bg-red-500"
          />
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500">Your orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const config = getStatusConfig(order.status);
              const Icon = config.icon;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-mono font-bold text-indigo-600">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.color} font-medium text-sm`}
                        >
                          <Icon className="w-4 h-4" />
                          {order.status.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Customer</p>
                        <p className="font-semibold text-gray-900">
                          {order.shippingAddress.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Total Amount
                        </p>
                        <p className="text-2xl font-bold text-indigo-600">
                          Rs {order.totalAmount}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Payment:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedOrder && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-sm text-gray-500">#{selectedOrder._id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Items</h3>
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-3 bg-gray-50 rounded-lg mb-2"
                    >
                      <img
                        src={item.image}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × Rs {item.price}
                        </p>
                        <p className="font-bold text-indigo-600 mt-1">
                          Rs {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Shipping Address
                  </h3>
                  <p className="font-semibold">
                    {selectedOrder.shippingAddress.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">
                      Rs {selectedOrder.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
    <div className="flex items-center gap-3">
      <div className={`${color} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default Orders;
