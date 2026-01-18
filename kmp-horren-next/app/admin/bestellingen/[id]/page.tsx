"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  User,
  Save,
  Printer,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/admin";
import { Order, OrderStatus } from "@/types";
import { toast } from "sonner";

const statusOptions: { value: OrderStatus; label: string; icon: React.ElementType }[] = [
  { value: "pending", label: "In afwachting", icon: Clock },
  { value: "paid", label: "Betaald", icon: CreditCard },
  { value: "processing", label: "In productie", icon: Package },
  { value: "shipped", label: "Verzonden", icon: Truck },
  { value: "delivered", label: "Geleverd", icon: CheckCircle },
  { value: "cancelled", label: "Geannuleerd", icon: XCircle },
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<OrderStatus>("pending");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [sendEmailNotification, setSendEmailNotification] = useState(true);
  const [originalStatus, setOriginalStatus] = useState<OrderStatus>("pending");

  // Fetch order from API
  const fetchOrder = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/orders/${orderId}`);
      const data = await response.json();
      
      if (data.order) {
        setOrder(data.order);
        setStatus(data.order.status);
        setOriginalStatus(data.order.status);
        setAdminNotes(data.order.adminNotes || "");
      } else if (data.error) {
        console.error("Error fetching order:", data.error);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-kmp-orange" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-kmp-blue mb-4">
          Bestelling niet gevonden
        </h1>
        <Link href="/admin/bestellingen">
          <Button>Terug naar bestellingen</Button>
        </Link>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          adminNotes,
          trackingNumber: status === "shipped" ? trackingNumber : undefined,
          sendEmail: sendEmailNotification,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er ging iets mis");
      }

      // Update original status after successful save
      setOriginalStatus(status);

      if (sendEmailNotification && (status === "paid" || status === "shipped" || status === "delivered") && status !== originalStatus) {
        toast.success(`Bestelling bijgewerkt en e-mail verzonden naar ${order.customerEmail}`);
      } else {
        toast.success("Bestelling bijgewerkt");
      }

      // Refresh order data to get latest from database
      await fetchOrder();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Er ging iets mis bij het opslaan");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const currentStatusIndex = statusOptions.findIndex((s) => s.value === status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/bestellingen"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-kmp-blue">
              {order.orderNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Geplaatst op {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-kmp-orange hover:bg-kmp-orange/90 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Opslaan..." : "Opslaan"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-6">Bestelstatus</h2>

            {/* Status Selector */}
            <div className="mb-6 space-y-4">
              <div>
                <Label>Status wijzigen</Label>
                <Select
                  value={status}
                  onValueChange={(value: OrderStatus) => setStatus(value)}
                >
                  <SelectTrigger className="w-full md:w-64 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tracking number for shipped status */}
              {status === "shipped" && (
                <div>
                  <Label>Track & Trace code (optioneel)</Label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="3SXXXX0000000000"
                    className="mt-2 w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kmp-orange/50"
                  />
                </div>
              )}

              {/* Email notification toggle */}
              {(status === "paid" || status === "shipped" || status === "delivered") && status !== originalStatus && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="sendEmail"
                    checked={sendEmailNotification}
                    onChange={(e) => setSendEmailNotification(e.target.checked)}
                    className="w-4 h-4 text-kmp-orange rounded"
                  />
                  <label htmlFor="sendEmail" className="text-sm text-blue-800">
                    <strong>E-mail versturen</strong> naar {order.customerEmail}
                    <span className="block text-blue-600 text-xs mt-0.5">
                      {status === "paid" && "Betalingsbevestiging"}
                      {status === "shipped" && "Verzendnotificatie met track & trace"}
                      {status === "delivered" && "Leveringsbevestiging"}
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Status Timeline */}
            <div className="relative">
              <div className="absolute top-5 left-5 bottom-5 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {statusOptions
                  .filter((s) => s.value !== "cancelled")
                  .map((option, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = option.value === status;
                    const Icon = option.icon;

                    return (
                      <div key={option.value} className="relative flex gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                            isCompleted
                              ? "bg-kmp-orange text-white"
                              : "bg-gray-100 text-gray-400"
                          } ${isCurrent ? "ring-4 ring-kmp-orange/20" : ""}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 pt-2">
                          <p
                            className={`font-medium ${
                              isCompleted ? "text-kmp-blue" : "text-gray-400"
                            }`}
                          >
                            {option.label}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-gray-500">
                              Huidige status
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-kmp-blue">
                Bestelde producten ({order.items.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-kmp-blue">
                      {item.productName}
                    </h3>
                    <p className="font-semibold text-kmp-blue">
                      €{item.lineTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="text-gray-400">Afmetingen</p>
                      <p>
                        {item.widthMm} x {item.heightMm} mm
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Kleur</p>
                      <p>{item.colorName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Gaas</p>
                      <p>{item.meshTypeName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Aantal</p>
                      <p>
                        {item.quantity} × €{item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {item.montageService && (
                    <p className="mt-2 text-sm text-green-600 font-medium">
                      ✓ Montageservice inbegrepen
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-gray-50 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotaal</span>
                <span>€{order.subtotal.toFixed(2)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Korting{order.discountCode && ` (${order.discountCode})`}
                  </span>
                  <span>-€{order.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Verzendkosten</span>
                <span>
                  {order.shippingCost === 0
                    ? "Gratis"
                    : `€${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              {order.voorrijkosten > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Voorrijkosten</span>
                  <span>€{order.voorrijkosten.toFixed(2)}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg text-kmp-blue">
                <span>Totaal</span>
                <span>€{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4">Admin notities</h2>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Voeg interne notities toe over deze bestelling..."
              rows={4}
            />
            {order.customerNotes && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Klant opmerking:
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  {order.customerNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Klantgegevens
            </h2>
            <div className="space-y-3">
              <p className="font-medium text-gray-900">
                {order.customerFirstName} {order.customerLastName}
              </p>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${order.customerEmail}`}
                  className="hover:text-kmp-orange"
                >
                  {order.customerEmail}
                </a>
              </div>
              {order.customerPhone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="hover:text-kmp-orange"
                  >
                    {order.customerPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Bezorgadres
            </h2>
            <div className="text-gray-600 space-y-1">
              <p>
                {order.shippingStreet} {order.shippingHouseNumber}
                {order.shippingHouseNumberAddition}
              </p>
              <p>
                {order.shippingPostalCode} {order.shippingCity}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-kmp-blue mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Betaling
            </h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Methode</span>
                <span className="font-medium capitalize">
                  {order.paymentMethod || "Onbekend"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <StatusBadge status={order.status} size="sm" />
              </div>
              {order.paidAt && (
                <div className="flex justify-between">
                  <span>Betaald op</span>
                  <span className="text-sm">{formatDate(order.paidAt)}</span>
                </div>
              )}
              {order.molliePaymentId && (
                <div className="flex justify-between">
                  <span>Mollie ID</span>
                  <span className="font-mono text-xs">
                    {order.molliePaymentId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
