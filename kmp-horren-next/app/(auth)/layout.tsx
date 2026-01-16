import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kmp-blue via-kmp-blue/95 to-kmp-blue/90 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.svg"
            alt="KMP Horren"
            width={160}
            height={40}
            className="h-10 w-auto brightness-0 invert"
            priority
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/60 text-sm">
        <p>© {new Date().getFullYear()} KMP Horren. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
