import { baseLayout, styles, formatDateTime } from "./base-layout";

interface ContactNotificationProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: Date | string;
}

// Email to admin when contact form is submitted
export function contactAdminNotificationEmail({
  name,
  email,
  subject,
  message,
  createdAt = new Date(),
}: ContactNotificationProps): string {
  const content = `
    <h1 style="${styles.heading1}">Nieuw contactbericht</h1>
    
    <p style="${styles.paragraph}">
      Er is een nieuw bericht ontvangen via het contactformulier.
    </p>
    
    <div style="${styles.box}">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Van</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #161f35;">${name}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</p>
            <p style="margin: 4px 0 0 0;">
              <a href="mailto:${email}" style="${styles.link}">${email}</a>
            </p>
          </td>
        </tr>
        ${
          subject
            ? `
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Onderwerp</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #161f35;">${subject}</p>
          </td>
        </tr>
        `
            : ""
        }
        <tr>
          <td>
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Ontvangen op</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #161f35;">${formatDateTime(createdAt)}</p>
          </td>
        </tr>
      </table>
    </div>
    
    <h2 style="${styles.heading2}">Bericht</h2>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #161f35; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #374151;">${message}</p>
    </div>
    
    <hr style="${styles.divider}">
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center">
          <a href="mailto:${email}?subject=Re: ${subject || "Uw bericht aan KMP Horren"}" style="${styles.button}">
            Beantwoorden
          </a>
        </td>
      </tr>
    </table>
    
    <p style="${styles.small}; text-align: center; margin-top: 20px;">
      Je kunt dit bericht ook bekijken in het <a href="https://kmp-horren.nl/admin/berichten" style="${styles.link}">admin dashboard</a>.
    </p>
  `;

  return baseLayout({
    previewText: `Nieuw contactbericht van ${name}: ${subject || message.substring(0, 50)}...`,
    children: content,
  });
}

// Confirmation email to customer after submitting contact form
export function contactCustomerConfirmationEmail({
  name,
  subject,
  message,
}: ContactNotificationProps): string {
  const content = `
    <h1 style="${styles.heading1}">Bedankt voor je bericht!</h1>
    
    <p style="${styles.paragraph}">
      Beste ${name.split(" ")[0]},
    </p>
    
    <p style="${styles.paragraph}">
      We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op. 
      Meestal reageren we binnen 1 werkdag.
    </p>
    
    <div style="${styles.box}">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">Een kopie van je bericht:</p>
      ${subject ? `<p style="margin: 0 0 10px 0; font-weight: 600; color: #161f35;">Onderwerp: ${subject}</p>` : ""}
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-top: 10px;">
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #374151; font-size: 14px;">${message}</p>
      </div>
    </div>
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Dringende vraag?</h2>
    
    <p style="${styles.paragraph}">
      Heb je een dringende vraag? Neem dan telefonisch contact met ons op:
    </p>
    
    <div style="text-align: center; margin: 20px 0;">
      <a href="tel:+31643065041" style="font-size: 24px; font-weight: 700; color: #161f35; text-decoration: none;">
        +31 6 43 06 50 41
      </a>
      <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
        Ma - Za: 09:00 - 18:00
      </p>
    </div>
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Veelgestelde vragen</h2>
    
    <p style="${styles.paragraph}">
      Misschien vind je het antwoord op je vraag al in onze FAQ:
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0;">
      <tr>
        <td align="center">
          <a href="https://kmp-horren.nl/faq" style="${styles.buttonSecondary}">
            Bekijk FAQ
          </a>
        </td>
      </tr>
    </table>
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
    children: content,
  });
}
