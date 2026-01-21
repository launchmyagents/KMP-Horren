"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Tag,
  MessageSquare,
  Calendar,
  LogOut,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Bestellingen",
    href: "/admin/bestellingen",
    icon: ShoppingBag,
  },
  {
    name: "Klanten",
    href: "/admin/klanten",
    icon: Users,
  },
  {
    name: "Producten",
    href: "/admin/producten",
    icon: Package,
  },
  {
    name: "Kortingscodes",
    href: "/admin/kortingscodes",
    icon: Tag,
  },
  {
    name: "Berichten",
    href: "/admin/berichten",
    icon: MessageSquare,
  },
  {
    name: "Inmeetservice",
    href: "/admin/inmeetservice",
    icon: Calendar,
  },
];

interface AdminSidebarProps {
  userName?: string;
  userEmail?: string;
}

export function AdminSidebar({ userName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-kmp-blue flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="KMP Horren"
            width={140}
            height={35}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-kmp-orange flex items-center justify-center text-white font-semibold">
            {userName?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate text-sm">
              {userName || "Admin"}
            </p>
            <p className="text-white/60 text-xs truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 font-medium">{item.name}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 text-kmp-orange" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          <span className="flex-1 font-medium">Bekijk Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="flex-1 font-medium text-left">Uitloggen</span>
        </button>
      </div>
    </aside>
  );
}
