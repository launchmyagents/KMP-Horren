import { baseLayout, styles, formatPrice, formatDateTime } from "./base-layout";
import { Order, OrderItem } from "@/types";

interface PaymentConfirmationProps {
  order: Order;
}

export function paymentConfirmationEmail({ order }: PaymentConfirmationProps): string {
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
        <td style="${styles.tableCellRight}"><strong>${formatPrice(item.lineTotal)}</strong></td>
      </tr>
    `
    )
    .join("");

  const content = `
    <h1 style="${styles.heading1}">Betaling ontvangen! ✓</h1>
    
    <p style="${styles.paragraph}">
      Beste ${order.customerFirstName},
    </p>
    
    <p style="${styles.paragraph}">
      Goed nieuws! We hebben je betaling van <strong>${formatPrice(order.totalPrice)}</strong> ontvangen. 
      Je bestelling wordt nu in productie genomen.
    </p>
    
    <div style="background-color: #dcfce7; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #166534;">Betaling succesvol verwerkt</p>
      <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: 700; color: #166534;">${formatPrice(order.totalPrice)}</p>
      <p style="margin: 10px 0 0 0; font-size: 13px; color: #15803d;">
        ${order.paidAt ? formatDateTime(order.paidAt) : formatDateTime(new Date())}
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
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Betaalmethode</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 500; color: #161f35; text-transform: capitalize;">${order.paymentMethod || "iDEAL"}</p>
          </td>
          <td>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">Status</p>
            <p style="margin: 5px 0 0 0;">
              <span style="${styles.badge}">Betaald</span>
            </p>
          </td>
        </tr>
      </table>
    </div>
    
    <h2 style="${styles.heading2}">Je bestelling</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr>
          <th style="${styles.tableHeader}">Product</th>
          <th style="${styles.tableHeader} text-align: right;">Aantal</th>
          <th style="${styles.tableHeader} text-align: right;">Totaal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
      <tfoot>
        <tr style="background-color: #f8fafc;">
          <td colspan="2" style="padding: 16px; text-align: right; font-weight: 700; font-size: 18px; color: #161f35;">Totaal betaald</td>
          <td style="padding: 16px; text-align: right; font-weight: 700; font-size: 18px; color: #166534;">${formatPrice(order.totalPrice)}</td>
        </tr>
      </tfoot>
    </table>
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Wat gebeurt er nu?</h2>
    
    <div style="${styles.boxHighlight}">
      <p style="margin: 0; font-weight: 600; color: #92400e;">🔨 In productie</p>
      <p style="margin: 10px 0 0 0; color: #78350f;">
        Onze vakmensen gaan nu aan de slag met het maken van jouw horren op maat. 
        De gemiddelde productietijd is 5-7 werkdagen.
      </p>
    </div>
    
    <p style="${styles.paragraph}">
      Zodra je bestelling verzonden wordt, ontvang je van ons een e-mail met de track & trace informatie.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://kmp-horren.nl/account/bestellingen/${order.orderNumber}" style="${styles.button}">
            Bekijk je bestelling
          </a>
        </td>
      </tr>
    </table>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.paragraph}">
      Heb je vragen? We staan voor je klaar via 
      <a href="mailto:Info@kozijnmontagepartners.nl" style="${styles.link}">Info@kozijnmontagepartners.nl</a> 
      of <a href="tel:+31643065041" style="${styles.link}">+31 6 43 06 50 41</a>.
    </p>
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: `Betaling ontvangen voor bestelling ${order.orderNumber}! Je horren worden nu gemaakt.`,
    children: content,
  });
}
