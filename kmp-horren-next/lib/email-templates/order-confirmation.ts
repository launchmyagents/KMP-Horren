import { baseLayout, styles, formatPrice, formatDateTime } from "./base-layout";
import { Order, OrderItem } from "@/types";

interface OrderConfirmationProps {
  order: Order;
}

export function orderConfirmationEmail({ order }: OrderConfirmationProps): string {
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

  const content = `
    <h1 style="${styles.heading1}">Bedankt voor je bestelling!</h1>
    
    <p style="${styles.paragraph}">
      Beste ${order.customerFirstName},
    </p>
    
    <p style="${styles.paragraph}">
      We hebben je bestelling ontvangen en gaan er direct mee aan de slag. 
      Hieronder vind je een overzicht van je bestelling.
    </p>
    
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
        ${
          order.discountAmount > 0
            ? `
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #16a34a;">Korting${order.discountCode ? ` (${order.discountCode})` : ""}</td>
          <td style="padding: 12px 16px; text-align: right; color: #16a34a;">-${formatPrice(order.discountAmount)}</td>
        </tr>
        `
            : ""
        }
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #6b7280;">Verzendkosten</td>
          <td style="padding: 12px 16px; text-align: right;">${order.shippingCost === 0 ? "Gratis" : formatPrice(order.shippingCost)}</td>
        </tr>
        ${
          order.voorrijkosten > 0
            ? `
        <tr>
          <td colspan="3" style="padding: 12px 16px; text-align: right; color: #6b7280;">Voorrijkosten montage</td>
          <td style="padding: 12px 16px; text-align: right;">${formatPrice(order.voorrijkosten)}</td>
        </tr>
        `
            : ""
        }
        <tr style="background-color: #f8fafc;">
          <td colspan="3" style="padding: 16px; text-align: right; font-weight: 700; font-size: 18px; color: #161f35;">Totaal</td>
          <td style="padding: 16px; text-align: right; font-weight: 700; font-size: 18px; color: #161f35;">${formatPrice(order.totalPrice)}</td>
        </tr>
      </tfoot>
    </table>
    
    <h2 style="${styles.heading2}">Bezorgadres</h2>
    
    <div style="${styles.box}">
      <p style="margin: 0; line-height: 1.6;">
        <strong>${order.customerFirstName} ${order.customerLastName}</strong><br>
        ${order.shippingStreet} ${order.shippingHouseNumber}${order.shippingHouseNumberAddition || ""}<br>
        ${order.shippingPostalCode} ${order.shippingCity}
      </p>
      ${order.customerPhone ? `<p style="margin: 10px 0 0 0; color: #6b7280;">Tel: ${order.customerPhone}</p>` : ""}
    </div>
    
    ${
      order.customerNotes
        ? `
    <div style="${styles.boxHighlight}">
      <p style="margin: 0 0 5px 0; font-weight: 600; color: #92400e;">Jouw opmerking:</p>
      <p style="margin: 0; color: #78350f;">${order.customerNotes}</p>
    </div>
    `
        : ""
    }
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Wat gebeurt er nu?</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 10px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 40px; vertical-align: top;">
                <div style="width: 28px; height: 28px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; color: #16a34a;">1</div>
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Betaling verwerken</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Na ontvangst van je betaling gaan we aan de slag.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 40px; vertical-align: top;">
                <div style="width: 28px; height: 28px; background-color: #e0e7ff; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; color: #4f46e5;">2</div>
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Productie op maat</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Jouw horren worden op maat gemaakt in onze werkplaats.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 40px; vertical-align: top;">
                <div style="width: 28px; height: 28px; background-color: #fef3c7; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; color: #d97706;">3</div>
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Verzending</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Je ontvangt een e-mail met track & trace zodra je bestelling onderweg is.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.paragraph}">
      Heb je vragen over je bestelling? Neem gerust contact met ons op via 
      <a href="mailto:Info@kozijnmontagepartners.nl" style="${styles.link}">Info@kozijnmontagepartners.nl</a> 
      of bel ons op <a href="tel:+31643065041" style="${styles.link}">+31 6 43 06 50 41</a>.
    </p>
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: `Bedankt voor je bestelling ${order.orderNumber}! We gaan er direct mee aan de slag.`,
    children: content,
  });
}
