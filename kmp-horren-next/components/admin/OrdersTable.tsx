"use client";

import { useState } from "react";
import Link from "next/link";
import { Order } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrdersTableProps {
  orders: Order[];
  showActions?: boolean;
  onDelete?: (orderId: string) => Promise<void>;
}

export function OrdersTable({ orders, showActions = true, onDelete }: OrdersTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (order: Order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete || !onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(orderToDelete.id);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };
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
                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(order)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Verwijderen
                          </DropdownMenuItem>
                        </>
                      )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bestelling verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je bestelling{" "}
              <span className="font-semibold">{orderToDelete?.orderNumber}</span>{" "}
              wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
              Alle gekoppelde orderregels worden ook verwijderd.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Verwijderen..." : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
