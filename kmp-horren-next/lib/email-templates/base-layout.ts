// KMP Horren E-mail Base Layout
// Professional HTML email template with KMP branding

export interface BaseLayoutProps {
  previewText?: string;
  children: string;
}

const KMP_BLUE = "#161f35";
const KMP_ORANGE = "#ef4e30";

export function baseLayout({ previewText, children }: BaseLayoutProps): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>KMP Horren</title>
  ${previewText ? `<!--[if !mso]><!--><meta name="x-apple-disable-message-reformatting"><!--<![endif]-->` : ""}
  <style>
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f4f4f5;
    }
    
    /* Typography */
    .email-body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
    }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .mobile-padding {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5;">
  ${previewText ? `
  <!-- Preview text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${previewText}
    ${"&nbsp;&zwnj;".repeat(30)}
  </div>
  ` : ""}
  
  <!-- Email wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Email container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: ${KMP_BLUE}; padding: 30px 40px; border-radius: 12px 12px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <!-- Logo placeholder - text version -->
                    <div style="font-size: 24px; font-weight: 800; color: white; letter-spacing: -0.5px;">
                      <span style="color: ${KMP_ORANGE};">■</span> KMP HORREN
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td class="email-body mobile-padding" style="background-color: #ffffff; padding: 40px;">
              ${children}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b;">
                      KMP Horren - Maatwerk horren voor elk raam en deur
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #94a3b8;">
                      100land 111, 2676 LT Maasdijk
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #94a3b8;">
                      <a href="tel:+31643065041" style="color: #94a3b8; text-decoration: none;">+31 6 43 06 50 41</a>
                      &nbsp;|&nbsp;
                      <a href="mailto:Info@kmphorren.nl" style="color: #94a3b8; text-decoration: none;">Info@kmphorren.nl</a>
                    </p>
                    <p style="margin: 20px 0 0 0; font-size: 12px; color: #cbd5e1;">
                      <a href="https://kmp-horren.nl" style="color: ${KMP_ORANGE}; text-decoration: none;">Website</a>
                      &nbsp;|&nbsp;
                      <a href="https://kmp-horren.nl/faq" style="color: ${KMP_ORANGE}; text-decoration: none;">FAQ</a>
                      &nbsp;|&nbsp;
                      <a href="https://kmp-horren.nl/contact" style="color: ${KMP_ORANGE}; text-decoration: none;">Contact</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Helper components for email content

export const styles = {
  heading1: `font-size: 28px; font-weight: 700; color: ${KMP_BLUE}; margin: 0 0 20px 0; line-height: 1.3;`,
  heading2: `font-size: 20px; font-weight: 600; color: ${KMP_BLUE}; margin: 30px 0 15px 0; line-height: 1.3;`,
  heading3: `font-size: 16px; font-weight: 600; color: ${KMP_BLUE}; margin: 20px 0 10px 0; line-height: 1.3;`,
  paragraph: `font-size: 16px; line-height: 1.6; color: #374151; margin: 0 0 16px 0;`,
  small: `font-size: 14px; line-height: 1.5; color: #6b7280; margin: 0 0 12px 0;`,
  link: `color: ${KMP_ORANGE}; text-decoration: none; font-weight: 500;`,
  button: `display: inline-block; background-color: ${KMP_ORANGE}; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;`,
  buttonSecondary: `display: inline-block; background-color: ${KMP_BLUE}; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;`,
  divider: `border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;`,
  box: `background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;`,
  boxHighlight: `background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid ${KMP_ORANGE};`,
  tableHeader: `background-color: #f1f5f9; padding: 12px 16px; text-align: left; font-weight: 600; color: ${KMP_BLUE}; font-size: 14px;`,
  tableCell: `padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151;`,
  tableCellRight: `padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: right;`,
  badge: `display: inline-block; background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;`,
  badgeOrange: `display: inline-block; background-color: #ffedd5; color: #c2410c; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;`,
  badgeBlue: `display: inline-block; background-color: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600;`,
};

// Format currency
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

// Format date with time
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
