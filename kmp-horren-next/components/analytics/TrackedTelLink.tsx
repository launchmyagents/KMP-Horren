"use client";

import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedTelLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * <a href="tel:..."> wrapper die een GA4 `tel_click` event vuurt
 * (alleen als consent === "granted"). Voor gebruik in zowel client- als
 * server-components: dit component is zelf een client component.
 */
export function TrackedTelLink({
  href,
  className,
  children,
  ariaLabel,
}: TrackedTelLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackEvent("tel_click", { link_url: href })}
    >
      {children}
    </a>
  );
}
