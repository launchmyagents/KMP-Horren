import { Metadata } from "next";
import Link from "next/link";
import {
  Euro,
  ShoppingBag,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight,
  Package,
} from "lucide-react";
import { StatsCard, OrdersTable } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { DEMO_ORDERS, getDemoStats } from "@/data/demo-orders";

export const metadata: Metadata = {
  title: "Admin Dashboard | KMP Horren",
  description: "KMP Horren Admin Dashboard",
};

export default function AdminDashboardPage() {
  const stats = getDemoStats();
  const recentOrders = DEMO_ORDERS.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-kmp-blue">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welkom terug! Hier is een overzicht van uw webshop.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Omzet vandaag"
          value={`€${stats.revenueToday.toFixed(2)}`}
          subtitle={`${stats.ordersToday} bestelling(en)`}
          icon={Euro}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Omzet deze week"
          value={`€${stats.revenueThisWeek.toFixed(2)}`}
          subtitle={`${stats.ordersThisWeek} bestellingen`}
          icon={TrendingUp}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="In behandeling"
          value={stats.processingOrders}
          subtitle="Bestellingen te verwerken"
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Nieuwe berichten"
          value={stats.unreadMessages}
          subtitle="Ongelezen berichten"
          icon={MessageSquare}
          color="purple"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Totaal bestellingen"
          value={stats.totalOrders}
          icon={ShoppingBag}
          color="blue"
        />
        <StatsCard
          title="Totaal klanten"
          value={stats.totalCustomers}
          subtitle={`+${stats.newCustomersThisMonth} deze maand`}
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Totale omzet"
          value={`€${stats.totalRevenue.toFixed(2)}`}
          icon={Euro}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/bestellingen?status=pending"
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:bg-yellow-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-semibold text-yellow-800">
                  {stats.pendingOrders} wachtend
                </p>
                <p className="text-sm text-yellow-600">Op betaling</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:text-yellow-600 transition-colors" />
          </div>
        </Link>

        <Link
          href="/admin/bestellingen?status=processing"
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-800">
                  {stats.processingOrders} in productie
                </p>
                <p className="text-sm text-blue-600">Te verwerken</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </Link>

        <Link
          href="/admin/berichten"
          className="bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-purple-800">
                  {stats.unreadMessages} ongelezen
                </p>
                <p className="text-sm text-purple-600">Berichten</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors" />
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-kmp-blue">
              Recente Bestellingen
            </h2>
            <p className="text-sm text-gray-500">
              Laatste {recentOrders.length} bestellingen
            </p>
          </div>
          <Link href="/admin/bestellingen">
            <Button variant="outline" size="sm">
              Alle bestellingen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <OrdersTable orders={recentOrders} />
      </div>
    </div>
  );
}
