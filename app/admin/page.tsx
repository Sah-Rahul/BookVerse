"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BookOpen,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  ArrowUp,
  Activity,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    delivered: 0,
    processing: 0,
    cancelled: 0,
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, usersRes, ordersRes, monthlyRes, weeklyRes] =
          await Promise.all([
            axios.get("/api/books"),
            axios.get("/api/users"),
            axios.get("/api/orders"),
            axios.get("/api/orders/revenue/monthly"),
            axios.get("/api/orders/revenue/weekly"),
          ]);

        const orders = ordersRes.data.data || [];
        const paidOrders = orders.filter(
          (o: any) => o.paymentStatus === "paid"
        );
        const totalRevenue = paidOrders.reduce(
          (sum: number, o: any) => sum + (o.totalAmount || 0),
          0
        );

        setStats({
          books: booksRes.data.data?.length || 0,
          users: usersRes.data.data?.length || 0,
          orders: orders.length,
          revenue: totalRevenue,
          pending: orders.filter((o: any) => o.status === "pending").length,
          delivered: orders.filter((o: any) => o.status === "delivered").length,
          processing: orders.filter((o: any) => o.status === "processing")
            .length,
          cancelled: orders.filter((o: any) => o.status === "cancelled").length,
        });

        setMonthlyData(monthlyRes.data.data || []);
        setWeeklyData(weeklyRes.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const orderStatusData = [
    { name: "Pending", value: stats.pending, color: "#fbbf24" },
    { name: "Processing", value: stats.processing, color: "#3b82f6" },
    { name: "Delivered", value: stats.delivered, color: "#22c55e" },
    { name: "Cancelled", value: stats.cancelled, color: "#ef4444" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-2">
              Monitor your bookstore performance
            </p>
          </div>
          <div className="bg-white rounded-xl px-6 py-3 shadow-md border border-gray-100">
            <p className="text-sm text-gray-500">Today</p>
            <p className="font-semibold text-gray-900">
              {new Date().toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-linear-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 opacity-80" />
                  <p className="text-sm font-medium opacity-90">Total Books</p>
                </div>
                <h3 className="text-5xl font-bold mt-3 mb-2">{stats.books}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span className="opacity-90">In stock</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <BookOpen className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart className="w-5 h-5 opacity-80" />
                  <p className="text-sm font-medium opacity-90">Total Orders</p>
                </div>
                <h3 className="text-5xl font-bold mt-3 mb-2">{stats.orders}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Activity className="w-4 h-4" />
                  <span className="opacity-90">{stats.pending} pending</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <ShoppingCart className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-500 via-green-600 to-green-700 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 opacity-80" />
                  <p className="text-sm font-medium opacity-90">Total Users</p>
                </div>
                <h3 className="text-5xl font-bold mt-3 mb-2">{stats.users}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="opacity-90">Active users</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Users className="w-7 h-7" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-5 h-5 opacity-80" />
                  <p className="text-sm font-medium opacity-90">Revenue</p>
                </div>
                <h3 className="text-5xl font-bold mt-3 mb-2">
                  Rs {stats.revenue.toLocaleString()}
                </h3>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="opacity-90">Total earnings</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <DollarSign className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold">Monthly Revenue</h3>
                  <p className="text-indigo-100 text-sm">
                    Revenue breakdown by month
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      style={{ fontSize: "13px" }}
                      tick={{ fill: "#6b7280" }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: "13px" }}
                      tick={{ fill: "#6b7280" }}
                    />
                    <Tooltip
                      formatter={(value) => [`Rs ${value}`, "Revenue"]}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        backgroundColor: "white",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{
                        fill: "#6366f1",
                        strokeWidth: 2,
                        r: 6,
                        stroke: "#fff",
                      }}
                      activeDot={{ r: 8, fill: "#a855f7" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>No revenue data available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold">Order Status</h3>
                  <p className="text-green-100 text-sm">Distribution</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {orderStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
