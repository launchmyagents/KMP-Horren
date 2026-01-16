"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { DiscountForm } from "@/components/admin/DiscountForm";
import { DEMO_DISCOUNTS } from "@/data/demo-orders";
import { DiscountCode } from "@/types";
import { toast } from "sonner";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState(DEMO_DISCOUNTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<DiscountCode | undefined>();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
    const discount = discounts.find((d) => d.id === id);
    toast.success(
      `${discount?.code} is nu ${discount?.isActive ? "inactief" : "actief"}`
    );
  };

  const handleSave = (data: Omit<DiscountCode, 'id' | 'usedCount'>) => {
    if (editingDiscount) {
      // Update existing
      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === editingDiscount.id
            ? { ...d, ...data, usedCount: d.usedCount }
            : d
        )
      );
      toast.success("Kortingscode bijgewerkt");
    } else {
      // Create new
      const newDiscount: DiscountCode = {
        id: `disc_${Date.now()}`,
        ...data,
        usedCount: 0,
      };
      setDiscounts((prev) => [...prev, newDiscount]);
      toast.success("Kortingscode aangemaakt");
    }
    setEditingDiscount(undefined);
  };

  const handleDelete = () => {
    if (deleteId) {
      setDiscounts((prev) => prev.filter((d) => d.id !== deleteId));
      toast.success("Kortingscode verwijderd");
      setDeleteId(null);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = (discount: DiscountCode) => {
    if (!discount.validUntil) return false;
    return new Date(discount.validUntil) < new Date();
  };

  const activeDiscounts = discounts.filter((d) => d.isActive && !isExpired(d));
  const inactiveDiscounts = discounts.filter(
    (d) => !d.isActive || isExpired(d)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-kmp-blue">Kortingscodes</h1>
          <p className="text-gray-600 mt-1">
            {activeDiscounts.length} actieve codes
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingDiscount(undefined);
            setIsFormOpen(true);
          }}
          className="bg-kmp-orange hover:bg-kmp-orange/90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nieuwe code
        </Button>
      </div>

      {/* Active Discounts */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-kmp-blue flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Actieve codes ({activeDiscounts.length})
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {activeDiscounts.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Code
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Korting
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Voorwaarden
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Geldigheid
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Gebruikt
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Actief
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeDiscounts.map((discount) => (
                  <DiscountRow
                    key={discount.id}
                    discount={discount}
                    onToggle={handleToggleActive}
                    onEdit={(d) => {
                      setEditingDiscount(d);
                      setIsFormOpen(true);
                    }}
                    onDelete={(id) => setDeleteId(id)}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Geen actieve kortingscodes
            </div>
          )}
        </div>
      </div>

      {/* Inactive Discounts */}
      {inactiveDiscounts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-500 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400" />
            Inactieve / Verlopen codes ({inactiveDiscounts.length})
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden opacity-60">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Code
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Korting
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Voorwaarden
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Geldigheid
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Gebruikt
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Actief
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inactiveDiscounts.map((discount) => (
                  <DiscountRow
                    key={discount.id}
                    discount={discount}
                    onToggle={handleToggleActive}
                    onEdit={(d) => {
                      setEditingDiscount(d);
                      setIsFormOpen(true);
                    }}
                    onDelete={(id) => setDeleteId(id)}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Dialog */}
      <DiscountForm
        discount={editingDiscount}
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingDiscount(undefined);
        }}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kortingscode verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je deze kortingscode wilt verwijderen? Dit kan
              niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function DiscountRow({
  discount,
  onToggle,
  onEdit,
  onDelete,
  formatDate,
}: {
  discount: DiscountCode;
  onToggle: (id: string) => void;
  onEdit: (discount: DiscountCode) => void;
  onDelete: (id: string) => void;
  formatDate: (date?: string) => string;
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-kmp-orange" />
          <span className="font-mono font-bold text-kmp-blue">
            {discount.code}
          </span>
        </div>
        {discount.description && (
          <p className="text-sm text-gray-500 mt-1">{discount.description}</p>
        )}
      </td>
      <td className="py-4 px-4">
        <span className="font-semibold text-green-600">
          {discount.discountType === "percentage"
            ? `${discount.discountValue}%`
            : `€${discount.discountValue.toFixed(2)}`}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        {discount.minOrderValue ? (
          <span>Min. €{discount.minOrderValue}</span>
        ) : (
          <span className="text-gray-400">Geen minimum</span>
        )}
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            {formatDate(discount.validFrom)} - {formatDate(discount.validUntil)}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 text-center">
        <span className="text-gray-600">
          {discount.usedCount}
          {discount.maxUses && (
            <span className="text-gray-400">/{discount.maxUses}</span>
          )}
        </span>
      </td>
      <td className="py-4 px-4 text-center">
        <Switch
          checked={discount.isActive}
          onCheckedChange={() => onToggle(discount.id)}
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(discount)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(discount.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
