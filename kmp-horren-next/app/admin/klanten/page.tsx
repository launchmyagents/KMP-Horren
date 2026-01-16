"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Mail, Phone, ShoppingBag, Euro, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEMO_CUSTOMERS, DEMO_ORDERS } from "@/data/demo-orders";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return DEMO_CUSTOMERS;

    const query = searchQuery.toLowerCase();
    return DEMO_CUSTOMERS.filter(
      (customer) =>
        customer.email.toLowerCase().includes(query) ||
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getCustomerOrders = (email: string) => {
    return DEMO_ORDERS.filter((order) => order.customerEmail === email);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-kmp-blue">Klanten</h1>
        <p className="text-gray-600 mt-1">
          Overzicht van alle klanten en hun bestelgeschiedenis
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Zoek op naam, email of telefoonnummer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const orders = getCustomerOrders(customer.email);

          return (
            <div
              key={customer.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-kmp-blue/30 hover:shadow-md transition-all"
            >
              {/* Customer Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-kmp-blue/10 flex items-center justify-center text-kmp-blue font-semibold">
                  {customer.firstName.charAt(0)}
                  {customer.lastName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-kmp-blue truncate">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    Klant sinds {formatDate(customer.createdAt)}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <a
                  href={`mailto:${customer.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-kmp-orange transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </a>
                {customer.phone && (
                  <a
                    href={`tel:${customer.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-kmp-orange transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-kmp-blue">
                      {customer.totalOrders}
                    </p>
                    <p className="text-xs text-gray-500">Bestellingen</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Euro className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-kmp-blue">
                      €{customer.totalSpent.toFixed(0)}
                    </p>
                    <p className="text-xs text-gray-500">Totaal</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              {orders.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Recente bestellingen
                  </p>
                  <div className="space-y-2">
                    {orders.slice(0, 2).map((order) => (
                      <Link
                        key={order.id}
                        href={`/admin/bestellingen/${order.id}`}
                        className="flex items-center justify-between text-sm hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                      >
                        <span className="font-medium text-kmp-blue">
                          {order.orderNumber}
                        </span>
                        <span className="text-gray-500">
                          €{order.totalPrice.toFixed(2)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results Count */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Geen klanten gevonden voor &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="text-sm text-gray-500 text-center">
          {filteredCustomers.length} van {DEMO_CUSTOMERS.length} klanten
        </div>
      )}
    </div>
  );
}
