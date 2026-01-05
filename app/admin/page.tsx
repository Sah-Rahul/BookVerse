"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MONTHLY_REVENUE_API,
  ORDER_API_END_POINT,
  REVENUE_API_END_POINT,
  WEEKLY_REVENUE_API,
} from "@/constant/api";
import { BOOK_API_END_POINT } from "@/constant/books";
import { USER_API_END_POINT } from "@/constant/user";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ShoppingCart, Users, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [bookCount, setBookCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(BOOK_API_END_POINT);
      setBookCount(data.data.length);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books");
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(USER_API_END_POINT);
      setUserCount(data.data.length);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(ORDER_API_END_POINT);
      setOrderCount(data.data.length);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    }
  };

  const fetchRevenue = async () => {
    try {
      const { data } = await axios.get(REVENUE_API_END_POINT);
      setTotalRevenue(data.revenue);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch revenue");
    }
  };

  const fetchMonthlyRevenue = async () => {
    try {
      const { data } = await axios.get(MONTHLY_REVENUE_API);
      setMonthlyData(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch monthly revenue");
    }
  };

  const fetchWeeklyData = async () => {
    try {
      const { data } = await axios.get(WEEKLY_REVENUE_API);
      setWeeklyData(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch weekly data");
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchBooks(),
        fetchUsers(),
        fetchOrders(),
        fetchRevenue(),
        fetchMonthlyRevenue(),
        fetchWeeklyData(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Books
            </CardTitle>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookCount}</div>
            <p className="text-xs text-gray-500 mt-1">Books in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCount}</div>
            <p className="text-xs text-gray-500 mt-1">Total orders placed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-gray-500 mt-1">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs{totalRevenue}</div>
            <p className="text-xs text-gray-500 mt-1">Total earnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <p className="text-sm text-gray-500">Revenue breakdown by month</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `Rs${value}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#6366f1" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
            <p className="text-sm text-gray-500">Orders by day of week</p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#22c55e"
                  strokeWidth={3}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
