import { baseLayout, styles } from "./base-layout";

interface PasswordResetProps {
  firstName?: string;
  resetUrl: string;
  expiresIn?: string;
}

export function passwordResetEmail({
  firstName,
  resetUrl,
  expiresIn = "1 uur",
}: PasswordResetProps): string {
  const content = `
    <h1 style="${styles.heading1}">Wachtwoord herstellen</h1>
    
    <p style="${styles.paragraph}">
      ${firstName ? `Beste ${firstName},` : "Hallo,"}
    </p>
    
    <p style="${styles.paragraph}">
      We hebben een verzoek ontvangen om het wachtwoord van je KMP Horren account te herstellen. 
      Klik op de onderstaande knop om een nieuw wachtwoord in te stellen.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="${resetUrl}" style="${styles.button}">
            Nieuw wachtwoord instellen
          </a>
        </td>
      </tr>
    </table>
    
    <div style="${styles.boxHighlight}">
      <p style="margin: 0; font-size: 14px; color: #92400e;">
        <strong>⏱ Let op:</strong> Deze link is ${expiresIn} geldig.
      </p>
    </div>
    
    <p style="${styles.paragraph}">
      Werkt de knop niet? Kopieer dan deze link in je browser:
    </p>
    
    <div style="${styles.box}">
      <p style="margin: 0; word-break: break-all; font-size: 14px; color: #6b7280;">
        <a href="${resetUrl}" style="color: #ef4e30; text-decoration: none;">${resetUrl}</a>
      </p>
    </div>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.small}">
      <strong>Heb je dit verzoek niet gedaan?</strong><br>
      Dan kun je deze e-mail negeren. Je wachtwoord blijft ongewijzigd en je account is veilig.
    </p>
    
    <p style="${styles.small}">
      Als je denkt dat iemand anders toegang probeert te krijgen tot je account, 
      neem dan contact met ons op via 
      <a href="mailto:info@kmp-horren.nl" style="${styles.link}">info@kmp-horren.nl</a>.
    </p>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: "Herstel je wachtwoord voor je KMP Horren account",
    children: content,
  });
}

// Email verification / Welcome email
export function welcomeEmail({
  firstName,
  verificationUrl,
}: {
  firstName?: string;
  verificationUrl?: string;
}): string {
  const content = `
    <h1 style="${styles.heading1}">Welkom bij KMP Horren! 🎉</h1>
    
    <p style="${styles.paragraph}">
      ${firstName ? `Beste ${firstName},` : "Hallo,"}
    </p>
    
    <p style="${styles.paragraph}">
      Bedankt voor het aanmaken van je account bij KMP Horren. 
      Je kunt nu eenvoudig bestellingen plaatsen, je bestelgeschiedenis bekijken 
      en je voorkeuren beheren.
    </p>
    
    ${
      verificationUrl
        ? `
    <div style="${styles.boxHighlight}">
      <p style="margin: 0 0 10px 0; font-weight: 600; color: #92400e;">
        📧 Bevestig je e-mailadres
      </p>
      <p style="margin: 0 0 15px 0; font-size: 14px; color: #78350f;">
        Klik op de onderstaande knop om je e-mailadres te bevestigen en je account te activeren.
      </p>
      <a href="${verificationUrl}" style="${styles.button}">
        E-mailadres bevestigen
      </a>
    </div>
    `
        : ""
    }
    
    <h2 style="${styles.heading2}">Wat kun je doen met je account?</h2>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 40px; vertical-align: top;">
                <div style="width: 32px; height: 32px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 32px; font-size: 16px;">🛒</div>
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Sneller bestellen</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Je gegevens worden opgeslagen voor een snellere checkout.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 40px; vertical-align: top;">
                <div style="width: 32px; height: 32px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 32px; font-size: 16px;">📋</div>
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Bestelgeschiedenis</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Bekijk al je bestellingen en volg de status.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="width: 40px; vertical-align: top;">
                <div style="width: 32px; height: 32px; background-color: #fef3c7; border-radius: 50%; text-align: center; line-height: 32px; font-size: 16px;">📍</div>
              </td>
              <td style="padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #161f35;">Adressen beheren</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Bewaar meerdere bezorgadressen voor gemak.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
      <tr>
        <td align="center">
          <a href="https://kmp-horren.nl/account" style="${styles.buttonSecondary}">
            Naar mijn account
          </a>
        </td>
      </tr>
    </table>
    
    <hr style="${styles.divider}">
    
    <p style="${styles.paragraph}">
      Heb je vragen? We helpen je graag via 
      <a href="mailto:info@kmp-horren.nl" style="${styles.link}">info@kmp-horren.nl</a> 
      of <a href="tel:0881234567" style="${styles.link}">088 - 123 45 67</a>.
    </p>
    
    <p style="${styles.paragraph}">
      Met vriendelijke groet,<br>
      <strong>Het KMP Horren Team</strong>
    </p>
  `;

  return baseLayout({
    previewText: "Welkom bij KMP Horren! Je account is aangemaakt.",
    children: content,
  });
}
