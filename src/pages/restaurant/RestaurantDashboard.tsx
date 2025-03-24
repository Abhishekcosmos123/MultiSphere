import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockUser = {
  name: "Admin User", 
  role: "admin", // Change to "consumer" to see the consumer view
};

const RestaurantDashboard = () => {
  const user = mockUser;
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", total: 25, status: "Pending" },
    { id: 2, customer: "Jane Smith", total: 42, status: "Completed" },
  ]);

  const salesData = [
    { day: "Mon", sales: 120 },
    { day: "Tue", sales: 150 },
    { day: "Wed", sales: 90 },
    { day: "Thu", sales: 200 },
    { day: "Fri", sales: 180 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold">Total Orders</h2>
                <p className="text-2xl font-bold">{orders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold">Pending Orders</h2>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === "Pending").length}</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {user?.role === "admin" && (
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Manage Orders</h2>
              <Button className="bg-green-500 hover:bg-green-700 text-white">Add New Order</Button>
            </div>
          )}
          {user?.role === "consumer" && (
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">Your Recent Orders</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Order ID</th>
                    <th className="border-b p-2">Total</th>
                    <th className="border-b p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="border-b p-2">#{order.id}</td>
                      <td className="border-b p-2">${order.total}</td>
                      <td className="border-b p-2">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
