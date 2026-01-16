"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navigation = [
  {
    name: "Account Overzicht",
    href: "/account",
    icon: User,
  },
  {
    name: "Mijn Bestellingen",
    href: "/account/bestellingen",
    icon: Package,
  },
  {
    name: "Adresboek",
    href: "/account/adressen",
    icon: MapPin,
  },
  {
    name: "Instellingen",
    href: "/account/instellingen",
    icon: Settings,
  },
];

interface AccountSidebarProps {
  userName?: string;
  userEmail?: string;
}

export function AccountSidebar({ userName, userEmail }: AccountSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      {/* User Info Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-kmp-blue/10 flex items-center justify-center">
            <User className="w-6 h-6 text-kmp-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-kmp-blue truncate">
              {userName || "Welkom"}
            </p>
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/account" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 transition-colors",
                    isActive
                      ? "bg-kmp-orange/10 text-kmp-orange border-l-4 border-kmp-orange"
                      : "hover:bg-gray-50 text-gray-700 border-l-4 border-transparent"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 font-medium">{item.name}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-kmp-orange" : "text-gray-400"
                    )}
                  />
                </Link>
              </li>
            );
          })}

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent"
            >
              <LogOut className="w-5 h-5" />
              <span className="flex-1 font-medium text-left">Uitloggen</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
