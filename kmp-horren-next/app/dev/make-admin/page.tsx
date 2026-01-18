"use client";

import { useState } from "react";

export default function MakeAdminPage() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/debug/make-admin");
      const data = await res.json();
      setResult(data);
      setStatus(data.isAdmin ? "Je bent al admin!" : "Je bent nog geen admin");
    } catch (error) {
      setStatus("Error: " + (error as Error).message);
    }
    setLoading(false);
  };

  const makeAdmin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/debug/make-admin", { method: "POST" });
      const data = await res.json();
      setResult(data);
      if (data.success) {
        setStatus("✅ Succes! Je bent nu admin. Ga naar /admin om te testen.");
      } else {
        setStatus("❌ Error: " + data.error);
      }
    } catch (error) {
      setStatus("Error: " + (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Role Tool</h1>
        <p className="text-gray-600 mb-6">
          Development tool om je account admin rechten te geven.
        </p>

        <div className="space-y-4">
          <button
            onClick={checkStatus}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Laden..." : "Check huidige status"}
          </button>

          <button
            onClick={makeAdmin}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Laden..." : "Maak mij admin"}
          </button>
        </div>

        {status && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="font-medium">{status}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 pt-4 border-t">
          <a
            href="/admin"
            className="text-blue-500 hover:underline"
          >
            → Ga naar Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
}
