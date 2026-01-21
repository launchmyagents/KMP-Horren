import { baseLayout, styles, formatPrice, formatDateTime } from "./base-layout";
import { Order, OrderItem } from "@/types";

interface OrderAdminNotificationProps {
  order: Order;
}

// Email to admin when a new order is placed
export function orderAdminNotificationEmail({ order }: OrderAdminNotificationProps): string {
  const itemsHtml = order.items
    .map(
      (item: OrderItem) => `
      <tr>
        <td style="${styles.tableCell}">
          <strong>${item.productName}</strong><br>
          <span style="color: #6b7280; font-size: 13px;">
            ${item.widthMm} × ${item.heightMm} mm | ${item.colorName}
          </span>
        </td>
        <td style="${styles.tableCellRight}">${item.quantity}×</td>
        <td style="${styles.tableCellRight}">${formatPrice(item.unitPrice)}</td>
        <td style="${styles.tableCellRight}"><strong>${formatPrice(item.lineTotal)}</strong></td>
      </tr>
    `
    )
    .join("");

  const hasMontage = order.items.some((item) => item.montageService);

  const content = `
    <h1 style="${styles.heading1}">🛒 Nieuwe bestelling ontvangen!</h1>
    
    <div style="background-color: #dcfce7; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; border: 1px solid #bbf7d0;">
      <p style="margin: 0; font-size: 14px; color: #166534;">Totaalbedrag</p>
      <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: 700; color: #166534;">${formatPrice(order.totalPrice)}</p>
      <p style="margin: 10px 0 0 0; font-size: 13px; color: #15803d;">
        ${order.items.length} product${order.items.length > 1 ? "en" : ""} | ${order.paymentMethod || "Nog niet betaald"}
      </p>
    </div>
    
    <div style="${styles.box}">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-right: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Bestelnummer</p>
            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 700; color: #161f35;">${order.orderNumber}</p>
          </td>
          <td style="padding-right: 20px;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Datum</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 500; color: #161f35;">${formatDateTime(order.createdAt)}</p>
          </td>
          <td>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Status</p>
            <p style="margin: 5px 0 0 0;">
              <span style="${styles.badgeOrange}">In afwachting van betaling</span>
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <h2 style="${styles.heading2}">Klantgegevens</h2>
    
    <div style="${styles.box}">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Naam</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #161f35;">${order.customerFirstName} ${order.customerLastName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</p>
            <p style="margin: 4px 0 0 0;">
              <a href="mailto:${order.customerEmail}" style="${styles.link}">${order.customerEmail}</a>
            </p>
          </td>
        </tr>
        ${order.customerPhone ? `
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Telefoon</p>
            <p style="margin: 4px 0 0 0;">
              <a href="tel:${order.customerPhone}" style="${styles.link}">${order.customerPhone}</a>
            </p>
          </td>
        </tr>
        ` : ""}
        <tr>
          <td>
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Bezorgadres</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #161f35; line-height: 1.5;">
              ${order.shippingStreet} ${order.shippingHouseNumber}${order.shippingHouseNumberAddition || ""}<br>
              ${order.shippingPostalCode} ${order.shippingCity}
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    ${order.customerNotes ? `
    <div style="${styles.boxHighlight}">
      <p style="margin: 0 0 5px 0; font-weight: 600; color: #92400e;">📝 Opmerking van klant:</p>
      <p style="margin: 0; color: #78350f; white-space: pre-wrap;">${order.customerNotes}</p>
    </div>
    ` : ""}
    
    ${hasMontage ? `
    <div style="background-color: #dbeafe; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #3b82f6;">
      <p style="margin: 0; font-weight: 600; color: #1e40af;">🔧 Montageservice aangevraagd</p>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #1e40af;">
        Deze bestelling bevat producten met montageservice. Neem contact op met de klant om een afspraak te maken.
      </p>
    </div>
    ` : ""}
    
    <h2 style="${styles.heading2}">Bestelde producten</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr>
          <th style="${styles.tableHeader}">Product</th>
          <th style="${styles.tableHeader} text-align: right;">Aantal</th>
          <th style="${styles.tableHeader} text-align: right;">Prijs</th>
          <th style="${styles.tableHeader} text-align: right;">Totaal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #6b7280;">Subtotaal</td>
          <td style="padding: 12px 16px; text-align: right;">${formatPrice(order.subtotal)}</td>
        </tr>
        ${order.discountAmount > 0 ? `
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #16a34a;">Korting${order.discountCode ? ` (${order.discountCode})` : ""}</td>
          <td style="padding: 12px 16px; text-align: right; color: #16a34a;">-${formatPrice(order.discountAmount)}</td>
        </tr>
        ` : ""}
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #6b7280;">Verzendkosten</td>
          <td style="padding: 12px 16px; text-align: right;">${order.shippingCost === 0 ? "Gratis" : formatPrice(order.shippingCost)}</td>
        </tr>
        ${order.voorrijkosten > 0 ? `
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #6b7280;">Voorrijkosten montage</td>
          <td style="padding: 12px 16px; text-align: right;">${formatPrice(order.voorrijkosten)}</td>
        </tr>
        ` : ""}
        <tr style="background-color: #f8fafc;">
          <td colspan="3" style="padding: 16px; text-align: right; font-weight: 700; font-size: 18px; color: #161f35;">Totaal</td>
          <td style="padding: 16px; text-align: right; font-weight: 700; font-size: 18px; color: #161f35;">${formatPrice(order.totalPrice)}</td>
        </tr>
      </tfoot>
    </table>
    
    <hr style="${styles.divider}">
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center">
          <a href="https://kmp-horren.nl/admin/bestellingen/${order.id}" style="${styles.button}">
            Bekijk bestelling in admin
          </a>
        </td>
      </tr>
    </table>
    
    <p style="${styles.small}; text-align: center; margin-top: 20px;">
      Je kunt alle bestellingen bekijken in het <a href="https://kmp-horren.nl/admin/bestellingen" style="${styles.link}">admin dashboard</a>.
    </p>
  `;

  return baseLayout({
    previewText: `Nieuwe bestelling ${order.orderNumber} van ${order.customerFirstName} ${order.customerLastName} - ${formatPrice(order.totalPrice)}`,
    children: content,
  });
}
