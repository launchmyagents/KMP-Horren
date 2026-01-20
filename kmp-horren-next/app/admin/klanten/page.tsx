"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Mail, Phone, ShoppingBag, Euro, Loader2, Trash2, UserX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  totalOrders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [deleteMode, setDeleteMode] = useState<"anonymize" | "delete">("anonymize");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) {
        params.set("search", searchQuery);
      }
      
      const response = await fetch(`/api/admin/customers?${params.toString()}`);
      const data = await response.json();
      
      if (data.customers) {
        setCustomers(data.customers);
        setTotalCustomers(data.pagination?.total || data.customers.length);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Er ging iets mis bij het ophalen van klanten");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteClick = (customer: Customer, mode: "anonymize" | "delete") => {
    setCustomerToDelete(customer);
    setDeleteMode(mode);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!customerToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/customers/${encodeURIComponent(customerToDelete.email)}?mode=${deleteMode}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er ging iets mis");
      }

      toast.success(data.message || "Klant verwerkt");
      fetchCustomers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Er ging iets mis");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
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

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-kmp-orange" />
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchQuery ? (
            <>Geen klanten gevonden voor &quot;{searchQuery}&quot;</>
          ) : (
            <>Nog geen klanten</>
          )}
        </div>
      ) : (
        <>
          {/* Customers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map((customer) => (
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
                    <Link 
                      href={`/admin/klanten/${encodeURIComponent(customer.email)}`}
                      className="font-semibold text-kmp-blue truncate block hover:text-kmp-orange transition-colors"
                    >
                      {customer.firstName} {customer.lastName}
                    </Link>
                    <p className="text-sm text-gray-500 truncate">
                      Klant sinds {formatDate(customer.firstOrderDate)}
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

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <Link href={`/admin/klanten/${encodeURIComponent(customer.email)}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Bekijken
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(customer, "anonymize")}
                    className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                    title="Anonimiseren"
                  >
                    <UserX className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(customer, "delete")}
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    title="Verwijderen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-500 text-center">
            {customers.length} van {totalCustomers} klanten
          </div>
        </>
      )}

      {/* Delete/Anonymize Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteMode === "anonymize" ? "Klant anonimiseren?" : "Klant verwijderen?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteMode === "anonymize" ? (
                <>
                  De persoonsgegevens van{" "}
                  <span className="font-semibold">
                    {customerToDelete?.firstName} {customerToDelete?.lastName}
                  </span>{" "}
                  worden geanonimiseerd. De bestelhistorie blijft behouden maar is niet meer
                  herleidbaar naar deze klant. Dit is de GDPR-vriendelijke optie.
                </>
              ) : (
                <>
                  Weet je zeker dat je{" "}
                  <span className="font-semibold">
                    {customerToDelete?.firstName} {customerToDelete?.lastName}
                  </span>{" "}
                  wilt verwijderen? Alle {customerToDelete?.totalOrders} bestellingen van deze
                  klant worden ook verwijderd. Deze actie kan niet ongedaan worden gemaakt.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className={
                deleteMode === "anonymize"
                  ? "bg-orange-600 hover:bg-orange-700 focus:ring-orange-600"
                  : "bg-red-600 hover:bg-red-700 focus:ring-red-600"
              }
            >
              {isDeleting
                ? deleteMode === "anonymize"
                  ? "Anonimiseren..."
                  : "Verwijderen..."
                : deleteMode === "anonymize"
                ? "Anonimiseren"
                : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
