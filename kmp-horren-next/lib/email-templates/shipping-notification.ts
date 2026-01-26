import { baseLayout, styles, formatDate } from "./base-layout";
import { Order, OrderItem } from "@/types";

interface ShippingNotificationProps {
  order: Order;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export function shippingNotificationEmail({
  order,
  trackingNumber,
  trackingUrl,
  carrier = "PostNL",
  estimatedDelivery,
}: ShippingNotificationProps): string {
  const itemsHtml = order.items
    .map(
      (item: OrderItem) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.productName}</strong><br>
          <span style="color: #6b7280; font-size: 13px;">
            ${item.widthMm} × ${item.heightMm} mm | ${item.colorName} | ${item.quantity}×
          </span>
        </td>
      </tr>
    `
    )
    .join("");

  const content = `
    <h1 style="${styles.heading1}">Je bestelling is onderweg! 📦</h1>
    
    <p style="${styles.paragraph}">
      Beste ${order.customerFirstName},
    </p>
    
    <p style="${styles.paragraph}">
      Goed nieuws! Je bestelling <strong>${order.orderNumber}</strong> is zojuist verzonden 
      en is onderweg naar jou.
    </p>
    
    ${
      trackingNumber
        ? `
    <div style="background-color: #eff6ff; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center; border: 1px solid #bfdbfe;">
      <p style="margin: 0; font-size: 14px; color: #1e40af;">Track & Trace</p>
      <p style="margin: 10px 0; font-size: 24px; font-weight: 700; color: #1e40af; letter-spacing: 2px;">${trackingNumber}</p>
      <p style="margin: 0; font-size: 14px; color: #3b82f6;">Verzonden via ${carrier}</p>
      ${
        trackingUrl
          ? `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 16px;">
        <tr>
          <td align="center">
            <a href="${trackingUrl}" style="${styles.buttonSecondary}">
              Volg je pakket
            </a>
          </td>
        </tr>
      </table>
      `
          : ""
      }
    </div>
    `
        : `
    <div style="${styles.box}">
      <p style="margin: 0; text-align: center; color: #6b7280;">
        Je ontvangt binnenkort een aparte e-mail van ${carrier} met de track & trace code.
      </p>
    </div>
    `
    }
    
    <div style="${styles.box}">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-right: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Bestelnummer</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #161f35;">${order.orderNumber}</p>
          </td>
          ${
            estimatedDelivery
              ? `
          <td>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Verwachte levering</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; color: #161f35;">${estimatedDelivery}</p>
          </td>
          `
              : ""
          }
        </tr>
      </table>
    </div>
    
    <h2 style="${styles.heading2}">Verzonden producten</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${itemsHtml}
    </table>
    
    <h2 style="${styles.heading2}">Bezorgadres</h2>
    
    <div style="${styles.box}">
      <p style="margin: 0; line-height: 1.6;">
        <strong>${order.customerFirstName} ${order.customerLastName}</strong><br>
        ${order.shippingStreet} ${order.shippingHouseNumber}${order.shippingHouseNumberAddition || ""}<br>
        ${order.shippingPostalCode} ${order.shippingCity}
      </p>
    </div>
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Tips voor ontvangst</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 8px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 30px; vertical-align: top; font-size: 18px;">📋</td>
              <td style="padding-left: 8px;">
                <p style="margin: 0; font-size: 14px; color: #374151;">
                  <strong>Controleer bij ontvangst</strong> of alle producten aanwezig en onbeschadigd zijn.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 30px; vertical-align: top; font-size: 18px;">📸</td>
              <td style="padding-left: 8px;">
                <p style="margin: 0; font-size: 14px; color: #374151;">
                  <strong>Schade geconstateerd?</strong> Maak foto's en neem binnen 48 uur contact met ons op.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 30px; vertical-align: top; font-size: 18px;">🔧</td>
              <td style="padding-left: 8px;">
                <p style="margin: 0; font-size: 14px; color: #374151;">
                  <strong>Montage hulp nodig?</strong> Bekijk onze <a href="https://kmp-horren.nl/faq" style="${styles.link}">montage instructies</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.paragraph}">
      Vragen over je levering? Neem contact op via 
      <a href="mailto:Info@kmphorren.nl" style="${styles.link}">Info@kmphorren.nl</a> 
      of <a href="tel:+31643065041" style="${styles.link}">+31 6 43 06 50 41</a>.
    </p>
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: `Je bestelling ${order.orderNumber} is verzonden en onderweg naar jou!`,
    children: content,
  });
}

// Delivered notification
export function deliveredNotificationEmail({ order }: { order: Order }): string {
  const content = `
    <h1 style="${styles.heading1}">Je bestelling is bezorgd! 🎉</h1>
    
    <p style="${styles.paragraph}">
      Beste ${order.customerFirstName},
    </p>
    
    <p style="${styles.paragraph}">
      Je bestelling <strong>${order.orderNumber}</strong> is succesvol afgeleverd op het opgegeven adres.
      We hopen dat je blij bent met je nieuwe horren!
    </p>
    
    <div style="background-color: #dcfce7; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center; border: 1px solid #bbf7d0;">
      <p style="margin: 0; font-size: 48px;">✓</p>
      <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: 700; color: #166534;">Bezorgd</p>
      <p style="margin: 5px 0 0 0; font-size: 14px; color: #15803d;">${formatDate(new Date())}</p>
    </div>
    
    <div style="${styles.box}">
      <p style="margin: 0; font-size: 14px; color: #6b7280;">Bestelnummer</p>
      <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 700; color: #161f35;">${order.orderNumber}</p>
    </div>
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Hulp bij montage?</h2>
    
    <p style="${styles.paragraph}">
      Ga je zelf aan de slag met de montage? Bekijk onze handige instructievideo's en handleidingen 
      in ons <a href="https://kmp-horren.nl/faq" style="${styles.link}">Help Center</a>.
    </p>
    
    <h2 style="${styles.heading2}">Deel je ervaring</h2>
    
    <p style="${styles.paragraph}">
      We horen graag hoe tevreden je bent met je aankoop! Je kunt een review achterlaten 
      of foto's van het eindresultaat delen via social media met <strong>#KMPHorren</strong>.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://kmp-horren.nl/review" style="${styles.button}">
            Schrijf een review
          </a>
        </td>
      </tr>
    </table>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.paragraph}">
      Niet tevreden of schade geconstateerd? Neem binnen 14 dagen contact met ons op via 
      <a href="mailto:Info@kmphorren.nl" style="${styles.link}">Info@kmphorren.nl</a>.
    </p>
    
    <p style="${styles.paragraph}">
      Bedankt voor je bestelling bij KMP Horren!<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: `Je bestelling ${order.orderNumber} is bezorgd! Veel plezier met je nieuwe horren.`,
    children: content,
  });
}
