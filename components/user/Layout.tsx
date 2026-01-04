import {
  BookOpen, 
  MessageSquare,
  Settings,
  ShoppingBag, 
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const menuItems = [
    { title: "Books", icon: BookOpen, href: "/user/books" },
    { title: "Orders", icon: ShoppingBag, href: "/user/orders" },
    { title: "Chat", icon: MessageSquare, href: "/user/chat" },
    { title: "Settings", icon: Settings, href: "/user/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-[#101929] fixed h-full pt-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-white hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors font-medium"
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
};

export default Layout;
