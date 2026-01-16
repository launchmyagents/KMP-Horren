import { cn } from "@/lib/utils";
import { OrderStatus } from "@/types";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "In afwachting",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  paid: {
    label: "Betaald",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  processing: {
    label: "In productie",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
  shipped: {
    label: "Verzonden",
    className: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  delivered: {
    label: "Geleverd",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  cancelled: {
    label: "Geannuleerd",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        config.className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {config.label}
    </span>
  );
}
