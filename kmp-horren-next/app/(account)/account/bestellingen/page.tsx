import { Metadata } from "next";
import Link from "next/link";
import { Package, ChevronRight, Truck, CheckCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Mijn Bestellingen",
  description: "Bekijk uw bestelgeschiedenis",
};

// Demo orders - in production these would come from Supabase
const orders = [
  {
    orderNumber: "KMP240115001",
    date: "15 januari 2024",
    status: "shipped",
    statusLabel: "Verzonden",
    total: 234.5,
    items: 3,
    trackingCode: "3SKMP123456789",
  },
  {
    orderNumber: "KMP231220003",
    date: "20 december 2023",
    status: "delivered",
    statusLabel: "Geleverd",
    total: 189.0,
    items: 2,
  },
  {
    orderNumber: "KMP231115002",
    date: "15 november 2023",
    status: "delivered",
    statusLabel: "Geleverd",
    total: 456.75,
    items: 5,
  },
  {
    orderNumber: "KMP230910001",
    date: "10 september 2023",
    status: "delivered",
    statusLabel: "Geleverd",
    total: 125.0,
    items: 1,
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "shipped":
      return <Truck className="w-4 h-4" />;
    case "delivered":
      return <CheckCircle className="w-4 h-4" />;
    case "processing":
      return <Clock className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-kmp-blue">Mijn Bestellingen</h1>
        <p className="text-gray-600">Bekijk en volg al uw bestellingen</p>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {orders.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <Link
                key={order.orderNumber}
                href={`/account/bestellingen/${order.orderNumber}`}
                className="block p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-kmp-blue">
                        Bestelling {order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.date} • {order.items}{" "}
                        {order.items === 1 ? "artikel" : "artikelen"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-kmp-blue">
                        €{order.total.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.statusLabel}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {order.trackingCode && (
                  <div className="mt-3 ml-16 text-sm">
                    <span className="text-gray-500">Track & Trace: </span>
                    <span className="font-mono text-kmp-blue">
                      {order.trackingCode}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-kmp-blue mb-2">
              Nog geen bestellingen
            </h2>
            <p className="text-gray-500 mb-6">
              U heeft nog geen bestellingen geplaatst bij KMP Horren.
            </p>
            <Link
              href="/producten"
              className="inline-flex items-center px-6 py-3 bg-kmp-orange text-white font-semibold rounded-lg hover:bg-kmp-orange/90 transition-colors"
            >
              Bekijk onze producten
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
