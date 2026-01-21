import { baseLayout, styles, formatDateTime } from "./base-layout";

interface InmeetserviceRequest {
  name: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  notes?: string | null;
  createdAt?: Date | string;
}

// Email to admin when inmeetservice request is submitted
export function inmeetserviceAdminNotificationEmail(
  request: InmeetserviceRequest
): string {
  const address = `${request.street} ${request.houseNumber}, ${request.postalCode} ${request.city}`;
  const createdAt = request.createdAt || new Date();

  const content = `
    <h1 style="${styles.heading1}">Nieuwe Inmeetservice Aanvraag</h1>
    
    <p style="${styles.paragraph}">
      Er is een nieuwe inmeetservice aanvraag binnengekomen.
    </p>
    
    <div style="${styles.box}">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Naam</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: #161f35;">${request.name}</p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</p>
            <p style="margin: 4px 0 0 0;">
              <a href="mailto:${request.email}" style="${styles.link}">${request.email}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Telefoon</p>
            <p style="margin: 4px 0 0 0;">
              <a href="tel:${request.phone}" style="${styles.link}">${request.phone}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Adres</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #161f35;">${address}</p>
          </td>
        </tr>
        ${
          request.preferredDate
            ? `
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Voorkeursdatum</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #161f35;">${new Date(request.preferredDate).toLocaleDateString("nl-NL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </td>
        </tr>
        `
            : ""
        }
        ${
          request.preferredTime
            ? `
        <tr>
          <td style="padding-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Voorkeurstijd</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #161f35;">${request.preferredTime}</p>
          </td>
        </tr>
        `
            : ""
        }
        <tr>
          <td>
            <p style="margin: 0; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Aangevraagd op</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #161f35;">${formatDateTime(createdAt)}</p>
          </td>
        </tr>
      </table>
    </div>
    
    ${
      request.notes
        ? `
    <h2 style="${styles.heading2}">Opmerkingen van de klant</h2>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #161f35; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #374151;">${request.notes}</p>
    </div>
    `
        : ""
    }
    
    <hr style="${styles.divider}">
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center">
          <a href="tel:${request.phone}" style="${styles.button}">
            Bel ${request.name.split(" ")[0]}
          </a>
        </td>
      </tr>
    </table>
    
    <p style="${styles.small}; text-align: center; margin-top: 20px;">
      Je kunt deze aanvraag ook bekijken in het <a href="https://kmp-horren.nl/admin/inmeetservice" style="${styles.link}">admin dashboard</a>.
    </p>
  `;

  return baseLayout({
    previewText: `Nieuwe inmeetservice aanvraag van ${request.name} in ${request.city}`,
    children: content,
  });
}

// Confirmation email to customer after submitting inmeetservice request
export function inmeetserviceCustomerConfirmationEmail(
  request: InmeetserviceRequest
): string {
  const address = `${request.street} ${request.houseNumber}, ${request.postalCode} ${request.city}`;

  const content = `
    <h1 style="${styles.heading1}">Bedankt voor uw aanvraag!</h1>
    
    <p style="${styles.paragraph}">
      Beste ${request.name.split(" ")[0]},
    </p>
    
    <p style="${styles.paragraph}">
      Bedankt voor uw aanvraag voor onze inmeetservice. We hebben uw aanvraag in goede orde ontvangen 
      en nemen binnen 1-2 werkdagen contact met u op om een afspraak in te plannen.
    </p>
    
    <div style="${styles.box}">
      <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #161f35;">Uw gegevens</h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 8px;">
            <span style="color: #6b7280; font-size: 14px;">Naam:</span>
            <span style="color: #161f35; font-weight: 500; margin-left: 8px;">${request.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 8px;">
            <span style="color: #6b7280; font-size: 14px;">Adres:</span>
            <span style="color: #161f35; font-weight: 500; margin-left: 8px;">${address}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 8px;">
            <span style="color: #6b7280; font-size: 14px;">Telefoon:</span>
            <span style="color: #161f35; font-weight: 500; margin-left: 8px;">${request.phone}</span>
          </td>
        </tr>
        ${
          request.preferredDate
            ? `
        <tr>
          <td style="padding-bottom: 8px;">
            <span style="color: #6b7280; font-size: 14px;">Voorkeursdatum:</span>
            <span style="color: #161f35; font-weight: 500; margin-left: 8px;">${new Date(request.preferredDate).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
          </td>
        </tr>
        `
            : ""
        }
        ${
          request.preferredTime
            ? `
        <tr>
          <td>
            <span style="color: #6b7280; font-size: 14px;">Voorkeurstijd:</span>
            <span style="color: #161f35; font-weight: 500; margin-left: 8px;">${request.preferredTime}</span>
          </td>
        </tr>
        `
            : ""
        }
      </table>
    </div>
    
    <h2 style="${styles.heading2}">Wat kunt u verwachten?</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="40" style="vertical-align: top;">
                <div style="width: 28px; height: 28px; background-color: #f97316; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 600;">1</div>
              </td>
              <td style="vertical-align: top; padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Telefonisch contact</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">We bellen u binnen 1-2 werkdagen om een afspraak te maken.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="40" style="vertical-align: top;">
                <div style="width: 28px; height: 28px; background-color: #f97316; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 600;">2</div>
              </td>
              <td style="vertical-align: top; padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Inmeten aan huis</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Onze specialist komt bij u langs voor nauwkeurige metingen.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="40" style="vertical-align: top;">
                <div style="width: 28px; height: 28px; background-color: #f97316; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 600;">3</div>
              </td>
              <td style="vertical-align: top; padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Offerte op maat</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">U ontvangt direct ter plekke een passende offerte.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <hr style="${styles.divider}">
    
    <h2 style="${styles.heading2}">Vragen?</h2>
    
    <p style="${styles.paragraph}">
      Heeft u nog vragen? Neem gerust contact met ons op:
    </p>
    
    <div style="text-align: center; margin: 20px 0;">
      <a href="tel:+31643065041" style="font-size: 24px; font-weight: 700; color: #161f35; text-decoration: none;">
        +31 6 43 06 50 41
      </a>
      <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
        Ma - Za: 09:00 - 18:00
      </p>
    </div>
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText:
      "Bedankt voor uw inmeetservice aanvraag! We nemen binnenkort contact met u op.",
    children: content,
  });
}
