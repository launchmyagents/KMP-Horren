"use client";

import Link from "next/link";
import { Order } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersTableProps {
  orders: Order[];
  showActions?: boolean;
}

export function OrdersTable({ orders, showActions = true }: OrdersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Bestelnummer
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Klant
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Datum
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
              Totaal
            </th>
            {showActions && (
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Acties
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <Link
                  href={`/admin/bestellingen/${order.id}`}
                  className="font-medium text-kmp-blue hover:text-kmp-orange transition-colors"
                >
                  {order.orderNumber}
                </Link>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {order.customerFirstName} {order.customerLastName}
                  </p>
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">
                {formatDate(order.createdAt)}
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={order.status} size="sm" />
              </td>
              <td className="py-3 px-4 text-right font-semibold text-gray-900">
                €{order.totalPrice.toFixed(2)}
              </td>
              {showActions && (
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/bestellingen/${order.id}`}
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Bekijken
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Geen bestellingen gevonden
        </div>
      )}
    </div>
  );
}
