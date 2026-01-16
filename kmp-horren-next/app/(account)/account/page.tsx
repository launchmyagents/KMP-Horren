import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Package,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mijn Account",
  description: "Beheer uw KMP Horren account",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.first_name || "Klant";

  // In production, fetch real order data from Supabase
  const recentOrders = [
    {
      orderNumber: "KMP240115001",
      date: "15 januari 2024",
      status: "Verzonden",
      total: 234.5,
    },
    {
      orderNumber: "KMP231220003",
      date: "20 december 2023",
      status: "Geleverd",
      total: 189.0,
    },
  ];

  const stats = [
    {
      label: "Totaal bestellingen",
      value: "5",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "In behandeling",
      value: "1",
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Opgeslagen adressen",
      value: "2",
      icon: MapPin,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-kmp-blue to-kmp-blue/80 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welkom terug, {firstName}!</h1>
        <p className="text-white/80">
          Bekijk uw bestellingen, beheer uw adressen en pas uw instellingen aan.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-kmp-blue">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-kmp-blue" />
            <h2 className="font-semibold text-kmp-blue">Recente Bestellingen</h2>
          </div>
          <Link
            href="/account/bestellingen"
            className="text-sm text-kmp-orange hover:underline flex items-center gap-1"
          >
            Bekijk alle
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <Link
                key={order.orderNumber}
                href={`/account/bestellingen/${order.orderNumber}`}
                className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-kmp-blue">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-kmp-blue">
                    €{order.total.toFixed(2)}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      order.status === "Geleverd"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Verzonden"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status === "Verzonden" && (
                      <Truck className="w-3 h-3" />
                    )}
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">U heeft nog geen bestellingen</p>
            <Link href="/producten">
              <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
                Bekijk onze producten
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/producten"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-kmp-orange hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-kmp-orange/10 flex items-center justify-center group-hover:bg-kmp-orange/20 transition-colors">
              <ShoppingBag className="w-6 h-6 text-kmp-orange" />
            </div>
            <div>
              <p className="font-semibold text-kmp-blue">Nieuwe Bestelling</p>
              <p className="text-sm text-gray-500">
                Configureer uw perfecte hor
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-kmp-orange transition-colors" />
          </div>
        </Link>

        <Link
          href="/account/adressen"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-kmp-blue hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-kmp-blue/10 flex items-center justify-center group-hover:bg-kmp-blue/20 transition-colors">
              <MapPin className="w-6 h-6 text-kmp-blue" />
            </div>
            <div>
              <p className="font-semibold text-kmp-blue">Adresboek Beheren</p>
              <p className="text-sm text-gray-500">Voeg adressen toe of wijzig</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-kmp-blue transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}
