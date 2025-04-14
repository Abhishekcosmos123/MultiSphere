import { withAuth } from "@/hooks/middleware"
import DashboardLayout from "../layout"
import DashboardClient from "./page-client"

function DashboardPage() {
    // Sample data for charts
    const salesData = [
        { month: "Jan", sales: 4000 },
        { month: "Feb", sales: 3000 },
        { month: "Mar", sales: 5000 },
        { month: "Apr", sales: 2780 },
        { month: "May", sales: 1890 },
        { month: "Jun", sales: 2390 },
        { month: "Jul", sales: 3490 },
    ]

    const trafficData = [
        { name: "Mon", desktop: 4000, mobile: 2400 },
        { name: "Tue", desktop: 3000, mobile: 1398 },
        { name: "Wed", desktop: 2000, mobile: 9800 },
        { name: "Thu", desktop: 2780, mobile: 3908 },
        { name: "Fri", desktop: 1890, mobile: 4800 },
        { name: "Sat", desktop: 2390, mobile: 3800 },
        { name: "Sun", desktop: 3490, mobile: 4300 },
    ]

    // Sample data for recent orders
    const recentOrders = [
        { id: "ORD-001", customer: "John Doe", status: "Completed", amount: "$250.00", date: "2023-06-01" },
        { id: "ORD-002", customer: "Jane Smith", status: "Processing", amount: "$120.50", date: "2023-06-02" },
        { id: "ORD-003", customer: "Robert Johnson", status: "Completed", amount: "$350.00", date: "2023-06-03" },
        { id: "ORD-004", customer: "Emily Davis", status: "Pending", amount: "$75.20", date: "2023-06-04" },
        { id: "ORD-005", customer: "Michael Brown", status: "Completed", amount: "$410.00", date: "2023-06-05" },
    ]

    return (
        <DashboardLayout><DashboardClient salesData={salesData} trafficData={trafficData} recentOrders={recentOrders} /></DashboardLayout>)
}

export default withAuth(DashboardPage, "/admin/login");