"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrdersTable } from "@/components/admin";
import { DEMO_ORDERS } from "@/data/demo-orders";
import { OrderStatus } from "@/types";

const statusOptions: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Alle statussen" },
  { value: "pending", label: "In afwachting" },
  { value: "paid", label: "Betaald" },
  { value: "processing", label: "In productie" },
  { value: "shipped", label: "Verzonden" },
  { value: "delivered", label: "Geleverd" },
  { value: "cancelled", label: "Geannuleerd" },
];

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") as OrderStatus | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">(
    initialStatus || "all"
  );
  const [sortBy, setSortBy] = useState<"date" | "total">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredOrders = useMemo(() => {
    let orders = [...DEMO_ORDERS];

    // Filter by status
    if (statusFilter !== "all") {
      orders = orders.filter((order) => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      orders = orders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query) ||
          `${order.customerFirstName} ${order.customerLastName}`
            .toLowerCase()
            .includes(query)
      );
    }

    // Sort
    orders.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === "desc"
          ? b.totalPrice - a.totalPrice
          : a.totalPrice - b.totalPrice;
      }
    });

    return orders;
  }, [searchQuery, statusFilter, sortBy, sortOrder]);

  const handleExportCSV = () => {
    const headers = [
      "Bestelnummer",
      "Klant",
      "Email",
      "Datum",
      "Status",
      "Totaal",
    ];
    const rows = filteredOrders.map((order) => [
      order.orderNumber,
      `${order.customerFirstName} ${order.customerLastName}`,
      order.customerEmail,
      new Date(order.createdAt).toLocaleDateString("nl-NL"),
      order.status,
      `€${order.totalPrice.toFixed(2)}`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bestellingen-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Count orders by status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: DEMO_ORDERS.length };
    DEMO_ORDERS.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-kmp-blue">Bestellingen</h1>
          <p className="text-gray-600 mt-1">
            Beheer en bekijk alle bestellingen
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exporteer CSV
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setStatusFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === option.value
                ? "bg-kmp-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {option.label}
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
              {statusCounts[option.value] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Zoek op bestelnummer, klant of email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={(value: "date" | "total") => setSortBy(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sorteren op" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Datum</SelectItem>
                <SelectItem value="total">Bedrag</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Volgorde" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Nieuwste eerst</SelectItem>
                <SelectItem value="asc">Oudste eerst</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <OrdersTable orders={filteredOrders} />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 text-center">
        {filteredOrders.length} van {DEMO_ORDERS.length} bestellingen
      </div>
    </div>
  );
}
