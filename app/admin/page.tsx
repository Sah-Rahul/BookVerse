"use client";

import Loading from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "recharts";
import { toast } from "sonner";

const salesData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 2100 },
  { name: "Mar", revenue: 800 },
  { name: "Apr", revenue: 1600 },
  { name: "May", revenue: 2400 },
];

const orderData = [
  { name: "Mon", orders: 12 },
  { name: "Tue", orders: 18 },
  { name: "Wed", orders: 9 },
  { name: "Thu", orders: 22 },
  { name: "Fri", orders: 15 },
];

const AdminDashboard = () => {
  const [bookCount, setBookCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

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

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  if(!bookCount || !userCount){
    return <Loading />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Books</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{bookCount}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">56</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{userCount}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">Rs4,500</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
          </CardHeader>
          <CardContent className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#22c55e"
                  strokeWidth={3}
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
