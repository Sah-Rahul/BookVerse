"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const menu = [
    {
      label: "Dashboard",
      link: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Books",
      link: "/admin/books",
      icon: BookOpen,
    },
    {
      label: "Orders",
      link: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Users",
      link: "/admin/users",
      icon: Users,
    },
     {
      label: "Chat",
      link: "/admin/chats",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {open && <h2 className="text-lg font-bold">Admin Panel</h2>}
          <Button
            size="icon"
            variant="ghost"
            className="text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <Menu size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menu.map((item) => {
            const isActive = pathname === item.link;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.link}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                {open && item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
