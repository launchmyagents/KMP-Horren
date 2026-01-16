import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderDetailPageProps {
  params: {
    orderNumber: string;
  };
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  return {
    title: `Bestelling ${params.orderNumber}`,
    description: `Details van bestelling ${params.orderNumber}`,
  };
}

// Demo order data - in production this would come from Supabase
const getOrder = (orderNumber: string) => {
  const orders: Record<string, unknown> = {
    KMP240115001: {
      orderNumber: "KMP240115001",
      date: "15 januari 2024",
      status: "shipped",
      statusLabel: "Verzonden",
      trackingCode: "3SKMP123456789",
      customer: {
        name: "Jan Jansen",
        email: "jan@voorbeeld.nl",
        phone: "06 12345678",
      },
      shippingAddress: {
        street: "Hoofdstraat 123",
        postalCode: "1234 AB",
        city: "Amsterdam",
        country: "Nederland",
      },
      items: [
        {
          id: "1",
          name: "Luxe Inzethor",
          dimensions: "800 x 1200 mm",
          color: "Antracietgrijs (RAL 7016)",
          mesh: "Zwart Gaas",
          profile: "19mm",
          quantity: 2,
          unitPrice: 75.0,
          lineTotal: 150.0,
        },
        {
          id: "2",
          name: "Plissé Hordeur",
          dimensions: "900 x 2100 mm",
          color: "Wit (RAL 9010)",
          mesh: "Standaard Grijs",
          profile: "27mm",
          quantity: 1,
          unitPrice: 215.0,
          lineTotal: 215.0,
        },
      ],
      subtotal: 365.0,
      staffelDiscount: 0,
      shippingCost: 0,
      total: 365.0,
      timeline: [
        { date: "15 jan 2024, 10:30", event: "Bestelling ontvangen" },
        { date: "15 jan 2024, 14:00", event: "Betaling ontvangen" },
        { date: "17 jan 2024, 09:15", event: "In productie" },
        { date: "22 jan 2024, 16:45", event: "Verzonden" },
      ],
    },
  };

  return orders[orderNumber] as typeof orders.KMP240115001 | undefined;
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = getOrder(params.orderNumber);

  if (!order) {
    notFound();
  }

  const statusSteps = [
    { key: "ordered", label: "Besteld", icon: Package },
    { key: "processing", label: "In productie", icon: Package },
    { key: "shipped", label: "Verzonden", icon: Truck },
    { key: "delivered", label: "Geleverd", icon: CheckCircle },
  ];

  const currentStepIndex =
    order.status === "delivered"
      ? 3
      : order.status === "shipped"
      ? 2
      : order.status === "processing"
      ? 1
      : 0;

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/account/bestellingen"
        className="inline-flex items-center text-gray-600 hover:text-kmp-blue transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Terug naar bestellingen
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-kmp-blue">
            Bestelling {order.orderNumber}
          </h1>
          <p className="text-gray-600">Geplaatst op {order.date}</p>
        </div>
        <Button variant="outline" className="w-fit">
          <Download className="w-4 h-4 mr-2" />
          Download factuur
        </Button>
      </div>

      {/* Status Tracker */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-kmp-blue mb-6">Bestelstatus</h2>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
            <div
              className="h-full bg-kmp-orange transition-all"
              style={{ width: `${(currentStepIndex / 3) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCompleted
                        ? "bg-kmp-orange text-white"
                        : "bg-gray-200 text-gray-400"
                    } ${isCurrent ? "ring-4 ring-kmp-orange/20" : ""}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      isCompleted ? "text-kmp-blue" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {order.trackingCode && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Track & Trace:</span>{" "}
              <span className="font-mono">{order.trackingCode}</span>
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-kmp-blue">Bestelde producten</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="p-5">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-kmp-blue">{item.name}</h3>
                  <p className="font-semibold text-kmp-blue">
                    €{item.lineTotal.toFixed(2)}
                  </p>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Afmetingen: {item.dimensions}</p>
                  <p>Kleur: {item.color}</p>
                  <p>Gaas: {item.mesh}</p>
                  <p>Profiel: {item.profile}</p>
                  <p>
                    Aantal: {item.quantity} × €{item.unitPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="p-5 bg-gray-50 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotaal</span>
              <span>€{order.subtotal.toFixed(2)}</span>
            </div>
            {order.staffelDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Staffelkorting</span>
                <span>-€{order.staffelDiscount.toFixed(2)}</span>
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
            <Separator />
            <div className="flex justify-between font-bold text-lg text-kmp-blue">
              <span>Totaal</span>
              <span>€{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-kmp-orange" />
              <h2 className="font-semibold text-kmp-blue">Bezorgadres</h2>
            </div>
            <div className="text-gray-600 space-y-1">
              <p className="font-medium text-kmp-blue">{order.customer.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-kmp-blue mb-4">Contactgegevens</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{order.customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{order.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-kmp-blue mb-4">Tijdlijn</h2>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-kmp-orange mt-2" />
                  <div>
                    <p className="text-sm font-medium text-kmp-blue">
                      {event.event}
                    </p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
