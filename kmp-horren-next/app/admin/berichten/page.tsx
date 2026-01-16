"use client";

import { useState } from "react";
import {
  Mail,
  MailOpen,
  Clock,
  ExternalLink,
  Trash2,
  Check,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DEMO_MESSAGES } from "@/data/demo-orders";
import { ContactMessage } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredMessages = searchQuery
    ? messages.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
    toast.success("Bericht gemarkeerd als gelezen");
  };

  const handleMarkAllAsRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
    toast.success("Alle berichten gemarkeerd als gelezen");
  };

  const handleDelete = () => {
    if (deleteId) {
      setMessages((prev) => prev.filter((m) => m.id !== deleteId));
      if (selectedMessage?.id === deleteId) {
        setSelectedMessage(null);
      }
      toast.success("Bericht verwijderd");
      setDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return date.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Gisteren";
    } else if (diffDays < 7) {
      return date.toLocaleDateString("nl-NL", { weekday: "long" });
    } else {
      return date.toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "short",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-kmp-blue">Berichten</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0
              ? `${unreadCount} ongelezen bericht${unreadCount > 1 ? "en" : ""}`
              : "Alle berichten gelezen"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Alles als gelezen markeren
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Zoek in berichten..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Messages List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.isRead) {
                      handleMarkAsRead(message.id);
                    }
                  }}
                  className={cn(
                    "w-full text-left p-4 hover:bg-gray-50 transition-colors",
                    selectedMessage?.id === message.id && "bg-blue-50",
                    !message.isRead && "bg-orange-50/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        message.isRead
                          ? "bg-gray-100 text-gray-500"
                          : "bg-kmp-orange text-white"
                      )}
                    >
                      {message.isRead ? (
                        <MailOpen className="w-5 h-5" />
                      ) : (
                        <Mail className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={cn(
                            "font-medium truncate",
                            message.isRead ? "text-gray-700" : "text-kmp-blue"
                          )}
                        >
                          {message.name}
                        </p>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      {message.subject && (
                        <p
                          className={cn(
                            "text-sm truncate",
                            message.isRead
                              ? "text-gray-600"
                              : "text-kmp-blue font-medium"
                          )}
                        >
                          {message.subject}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                Geen berichten gevonden
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-kmp-blue">
                      {selectedMessage.subject || "Geen onderwerp"}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Van:{" "}
                      <span className="font-medium">
                        {selectedMessage.name}
                      </span>{" "}
                      &lt;{selectedMessage.email}&gt;
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" />
                      {new Date(selectedMessage.createdAt).toLocaleString(
                        "nl-NL",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Uw bericht aan KMP Horren"}`}
                    >
                      <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
                        <Mail className="w-4 h-4 mr-2" />
                        Beantwoorden
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteId(selectedMessage.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose prose-gray max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Bericht ID: {selectedMessage.id}
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-1 text-kmp-orange hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in mail client
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Selecteer een bericht om te lezen</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bericht verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je dit bericht wilt verwijderen? Dit kan niet
              ongedaan worden gemaakt.
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
