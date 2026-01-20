"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  ShoppingBag,
  Euro,
  Calendar,
  Loader2,
  Trash2,
  UserX,
  ExternalLink,
} from "lucide-react";
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
import { StatusBadge } from "@/components/admin";
import { toast } from "sonner";

interface CustomerOrder {
  id: string;
  orderNumber: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface CustomerDetail {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  totalOrders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
  orders: CustomerOrder[];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const email = decodeURIComponent(params.email as string);

  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState<"anonymize" | "delete">("anonymize");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCustomer = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/customers/${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.customer) {
        setCustomer(data.customer);
      } else if (data.error) {
        console.error("Error fetching customer:", data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      toast.error("Er ging iets mis bij het ophalen van klantgegevens");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = (mode: "anonymize" | "delete") => {
    setDeleteMode(mode);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!customer) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/customers/${encodeURIComponent(customer.email)}?mode=${deleteMode}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er ging iets mis");
      }

      toast.success(data.message || "Klant verwerkt");
      router.push("/admin/klanten");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Er ging iets mis");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-kmp-orange" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-kmp-blue mb-4">
          Klant niet gevonden
        </h1>
        <Link href="/admin/klanten">
          <Button>Terug naar klanten</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/klanten"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-kmp-blue">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-gray-600 mt-1">
              Klant sinds {formatDate(customer.firstOrderDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleDeleteClick("anonymize")}
            className="flex items-center gap-2 text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
          >
            <UserX className="w-4 h-4" />
            Anonimiseren
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDeleteClick("delete")}
            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4" />
            Verwijderen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Contactgegevens</h2>
            <div className="space-y-3">
              <a
                href={`mailto:${customer.email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-kmp-orange transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <span className="truncate">{customer.email}</span>
              </a>
              {customer.phone && (
                <a
                  href={`tel:${customer.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-kmp-orange transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <span>{customer.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Statistieken</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-kmp-blue">
                    {customer.totalOrders}
                  </p>
                  <p className="text-sm text-gray-500">Bestellingen</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Euro className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-kmp-blue">
                    €{customer.totalSpent.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Totaal besteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-kmp-blue">
                    {formatDate(customer.lastOrderDate)}
                  </p>
                  <p className="text-sm text-gray-500">Laatste bestelling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-kmp-blue">
                Bestelgeschiedenis ({customer.orders.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {customer.orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/bestellingen/${order.id}`}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-kmp-blue group-hover:text-kmp-orange transition-colors">
                        {order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.status as "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled"} size="sm" />
                    <p className="font-semibold text-gray-900 min-w-[80px] text-right">
                      €{order.totalPrice.toFixed(2)}
                    </p>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-kmp-orange transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                    {customer.firstName} {customer.lastName}
                  </span>{" "}
                  worden geanonimiseerd. De {customer.totalOrders} bestelling(en) blijven behouden maar zijn niet meer
                  herleidbaar naar deze klant. Dit is de GDPR-vriendelijke optie.
                </>
              ) : (
                <>
                  Weet je zeker dat je{" "}
                  <span className="font-semibold">
                    {customer.firstName} {customer.lastName}
                  </span>{" "}
                  wilt verwijderen? Alle {customer.totalOrders} bestellingen van deze
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
