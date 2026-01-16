"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddressForm } from "@/components/account/AddressForm";
import { Address } from "@/types";

// Demo addresses - in production these would come from Supabase
const initialAddresses: Address[] = [
  {
    id: "1",
    userId: "user1",
    street: "Hoofdstraat",
    houseNumber: "123",
    houseNumberAddition: "A",
    postalCode: "1234 AB",
    city: "Amsterdam",
    country: "Nederland",
    isDefault: true,
  },
  {
    id: "2",
    userId: "user1",
    street: "Kerkweg",
    houseNumber: "45",
    postalCode: "5678 CD",
    city: "Rotterdam",
    country: "Nederland",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAddress = (newAddress: Omit<Address, "id" | "userId">) => {
    const address: Address = {
      ...newAddress,
      id: `addr_${Date.now()}`,
      userId: "user1",
    };

    // If new address is default, remove default from others
    if (address.isDefault) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, address]);
    setIsDialogOpen(false);
  };

  const handleEditAddress = (updatedAddress: Omit<Address, "id" | "userId">) => {
    if (!editingAddress) return;

    // If updated address is default, remove default from others
    if (updatedAddress.isDefault) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id
            ? { ...a, ...updatedAddress }
            : { ...a, isDefault: false }
        )
      );
    } else {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...a, ...updatedAddress } : a
        )
      );
    }

    setEditingAddress(null);
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-kmp-blue">Adresboek</h1>
          <p className="text-gray-600">Beheer uw bezorgadressen</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-kmp-orange hover:bg-kmp-orange/90"
              onClick={openAddDialog}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nieuw adres
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Adres bewerken" : "Nieuw adres toevoegen"}
              </DialogTitle>
            </DialogHeader>
            <AddressForm
              address={editingAddress || undefined}
              onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Addresses Grid */}
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-xl border-2 p-5 relative ${
                address.isDefault
                  ? "border-kmp-orange"
                  : "border-gray-200 hover:border-gray-300"
              } transition-colors`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute -top-3 left-4 bg-kmp-orange text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Standaard
                </div>
              )}

              {/* Address Content */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-kmp-blue">
                    {address.street} {address.houseNumber}
                    {address.houseNumberAddition}
                  </p>
                  <p className="text-gray-600">
                    {address.postalCode} {address.city}
                  </p>
                  <p className="text-gray-500">{address.country}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-kmp-blue"
                  onClick={() => openEditDialog(address)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Bewerken
                </Button>
                {!address.isDefault && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-kmp-orange"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Standaard maken
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Verwijderen
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-kmp-blue mb-2">
            Nog geen adressen
          </h2>
          <p className="text-gray-500 mb-6">
            Voeg uw eerste bezorgadres toe om sneller af te rekenen.
          </p>
          <Button
            className="bg-kmp-orange hover:bg-kmp-orange/90"
            onClick={openAddDialog}
          >
            <Plus className="w-4 h-4 mr-2" />
            Adres toevoegen
          </Button>
        </div>
      )}
    </div>
  );
}
