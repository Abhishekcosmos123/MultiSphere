"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, LayoutDashboard, Settings, ShoppingCart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ElementType
  title: string
  href: string
  active?: boolean
}

function SidebarItem({ icon: Icon, title, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="py-2">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main</h2>
        <div className="space-y-1">
          <SidebarItem icon={LayoutDashboard} title="Dashboard" href="/admin/dashboard" active={pathname === "/admin/dashboard"} />
          <SidebarItem icon={BarChart3} title="Analytics" href="/admin/analytics" active={pathname === "/admin/analytics"} />
        </div>
      </div>
      <div className="py-2">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Management</h2>
        <div className="space-y-1">
          <SidebarItem icon={Users} title="Users" href="/admin/users" active={pathname === "/admin/users"} />
          <SidebarItem icon={ShoppingCart} title="Products" href="/admin/products" active={pathname === "/admin/products"} />
          <SidebarItem icon={Settings} title="Settings" href="/admin/settings" active={pathname === "/admin/settings"} />
        </div>
      </div>
    </div>
  )
}
