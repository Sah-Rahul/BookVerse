"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"

type OrderStatus = "processing" | "delivered" | "cancelled"

interface Order {
  id: string
  user: string
  total: number
  status: OrderStatus
}

const initialOrders: Order[] = [
  { id: "ORD001", user: "Rahul", total: 40, status: "delivered" },
  { id: "ORD002", user: "Amit", total: 25, status: "processing" },
]

const statusColor = {
  processing: "bg-yellow-500",
  delivered: "bg-green-600",
  cancelled: "bg-red-600",
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.id}
                </TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  <Badge className={statusColor[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(value) =>
                      updateStatus(order.id, value as OrderStatus)
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

export default Orders
