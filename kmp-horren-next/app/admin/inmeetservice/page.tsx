"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Loader2,
  Search,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface InmeetserviceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  status: "pending" | "contacted" | "scheduled" | "completed";
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  { value: "all", label: "Alle statussen" },
  { value: "pending", label: "In afwachting" },
  { value: "contacted", label: "Gecontacteerd" },
  { value: "scheduled", label: "Ingepland" },
  { value: "completed", label: "Afgerond" },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "In afwachting" },
  contacted: { bg: "bg-blue-100", text: "text-blue-800", label: "Gecontacteerd" },
  scheduled: { bg: "bg-purple-100", text: "text-purple-800", label: "Ingepland" },
  completed: { bg: "bg-green-100", text: "text-green-800", label: "Afgerond" },
};

export default function InmeetservicePage() {
  const [requests, setRequests] = useState<InmeetserviceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({ all: 0 });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");
  const [authError, setAuthError] = useState(false);

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const response = await fetch(`/api/admin/inmeetservice?${params.toString()}`, {
        credentials: "include", // Include cookies for authentication
      });
      
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setAuthError(true);
          toast.error("Niet geautoriseerd. Log opnieuw in als admin.");
          console.error("Authentication error:", data);
        } else {
          toast.error(data.error || "Kon aanvragen niet laden");
          console.error("API error:", data);
        }
        setRequests([]);
        return;
      }

      setAuthError(false);

      if (data.requests) {
        setRequests(data.requests);
      }
      if (data.statusCounts) {
        setStatusCounts(data.statusCounts);
      }
    } catch (error) {
      console.error("Error fetching inmeetservice requests:", error);
      toast.error("Kon aanvragen niet laden");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/inmeetservice", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Niet geautoriseerd. Log opnieuw in als admin.");
        } else {
          toast.error("Kon status niet bijwerken");
        }
        return;
      }

      toast.success("Status bijgewerkt");
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Kon status niet bijwerken");
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const response = await fetch("/api/admin/inmeetservice", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, adminNotes: notesValue }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Niet geautoriseerd. Log opnieuw in als admin.");
        } else {
          toast.error("Kon notities niet opslaan");
        }
        return;
      }

      toast.success("Notities opgeslagen");
      setEditingNotes(null);
      fetchRequests();
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Kon notities niet opslaan");
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      req.name.toLowerCase().includes(query) ||
      req.email.toLowerCase().includes(query) ||
      req.city.toLowerCase().includes(query) ||
      req.phone.includes(query)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-kmp-blue">Inmeetservice Aanvragen</h1>
        <p className="text-gray-600 mt-1">
          Beheer alle inmeetservice aanvragen
        </p>
      </div>

      {/* Auth Error Banner */}
      {authError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-2">
                Authenticatie vereist
              </h3>
              <p className="text-red-700 mb-4">
                Je bent niet ingelogd als admin of je sessie is verlopen. Log opnieuw in om
                de inmeetservice aanvragen te kunnen bekijken.
              </p>
              <Link href="/login?redirect=/admin/inmeetservice">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Inloggen als admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setStatusFilter(option.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              statusFilter === option.value
                ? "bg-kmp-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {option.label}
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
              {statusCounts[option.value] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Zoek op naam, email, stad of telefoonnummer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Requests List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-kmp-orange" />
        </div>
      ) : requests.length === 0 && !searchQuery ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Geen aanvragen gevonden
          </h3>
          <p className="text-gray-500 mb-4">
            Er zijn nog geen inmeetservice aanvragen, of je hebt geen toegang.
          </p>
          <p className="text-sm text-gray-400">
            Controleer of je ingelogd bent als admin en of er aanvragen zijn in de database.
          </p>
        </div>
      ) : filteredRequests.length === 0 && searchQuery ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Geen aanvragen gevonden
          </h3>
          <p className="text-gray-500">
            Probeer andere zoektermen
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Request Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-kmp-blue">
                        {req.name}
                      </h3>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          statusColors[req.status].bg,
                          statusColors[req.status].text
                        )}
                      >
                        {statusColors[req.status].label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {req.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {req.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDateTime(req.createdAt)}
                      </span>
                      {req.preferredDate && (
                        <span className="flex items-center gap-1 text-kmp-orange font-medium">
                          <Calendar className="w-4 h-4" />
                          Voorkeur: {formatDate(req.preferredDate)}
                          {req.preferredTime && ` (${req.preferredTime})`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select
                      value={req.status}
                      onValueChange={(value) => handleStatusChange(req.id, value)}
                    >
                      <SelectTrigger
                        className="w-40"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">In afwachting</SelectItem>
                        <SelectItem value="contacted">Gecontacteerd</SelectItem>
                        <SelectItem value="scheduled">Ingepland</SelectItem>
                        <SelectItem value="completed">Afgerond</SelectItem>
                      </SelectContent>
                    </Select>
                    {expandedId === req.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === req.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Contactgegevens
                      </h4>
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Naam</p>
                          <p className="font-medium">{req.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">E-mail</p>
                          <a
                            href={`mailto:${req.email}`}
                            className="text-kmp-blue hover:underline"
                          >
                            {req.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Telefoon</p>
                          <a
                            href={`tel:${req.phone}`}
                            className="text-kmp-blue hover:underline"
                          >
                            {req.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Adres</p>
                          <p>
                            {req.street} {req.houseNumber}
                            <br />
                            {req.postalCode} {req.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-kmp-blue hover:bg-kmp-blue/90"
                          onClick={() => window.open(`tel:${req.phone}`)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Bellen
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`mailto:${req.email}`)}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          E-mail
                        </Button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-4">
                      {req.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4" />
                            Opmerkingen klant
                          </h4>
                          <div className="bg-white rounded-lg p-4 border-l-4 border-kmp-orange">
                            <p className="text-gray-700 whitespace-pre-wrap">
                              {req.notes}
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4" />
                          Admin notities
                        </h4>
                        {editingNotes === req.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={notesValue}
                              onChange={(e) => setNotesValue(e.target.value)}
                              placeholder="Voeg notities toe..."
                              rows={4}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveNotes(req.id)}
                              >
                                Opslaan
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingNotes(null)}
                              >
                                Annuleren
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              setEditingNotes(req.id);
                              setNotesValue(req.adminNotes || "");
                            }}
                          >
                            {req.adminNotes ? (
                              <p className="text-gray-700 whitespace-pre-wrap">
                                {req.adminNotes}
                              </p>
                            ) : (
                              <p className="text-gray-400 italic">
                                Klik om notities toe te voegen...
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-500 text-center">
        {filteredRequests.length} aanvra{filteredRequests.length === 1 ? "ag" : "gen"}
      </div>
    </div>
  );
}
