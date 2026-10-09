import { Resend } from "resend";

// Check if Resend is configured
export const isResendConfigured = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  if (apiKey === "re_xxxxxxxxxxxxxxxx") return false;
  if (apiKey.startsWith("re_") && apiKey.length > 20) return true;
  return false;
};

// Create Resend client (only if configured)
export const getResendClient = () => {
  if (!isResendConfigured()) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Default sender email.
//
// The local part is lower case as of 2026-10-09, in line with the rest of the site.
// Mail servers treat the local part of an address as case-insensitive in practice, so
// this changes nothing about delivery; it is there so that the address is written one
// way everywhere, which is what the citation and directory listings are matched on.
//
// Note that `EMAIL_FROM` and `ADMIN_EMAIL` can also be set as environment variables on
// the server, and those win over these defaults. They still have to be checked in the
// Railway dashboard.
export const EMAIL_FROM = process.env.EMAIL_FROM || "KMP Horren <info@kmp-horren.nl>";

// Email sending helper with fallback to console logging
interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const { to, subject, html, text, replyTo } = options;

  // If Resend is not configured, log to console (demo mode).
  //
  // In production this must NOT count as success. Returning `success: true`
  // here means an unconfigured or expired RESEND_API_KEY looks identical to a
  // delivered mail, all the way up to the visitor, who is told "Bericht
  // verzonden!" while nothing left the building. Demo mode stays available for
  // local development, where there is no key and no one is waiting for the mail.
  if (!isResendConfigured() && process.env.NODE_ENV === "production") {
    console.error(
      "RESEND_API_KEY ontbreekt of is ongeldig in productie. E-mail is NIET verzonden.",
      { to: Array.isArray(to) ? to.join(", ") : to, subject }
    );
    return { success: false, error: "E-mailverzending is niet geconfigureerd" };
  }

  if (!isResendConfigured()) {
    console.log("=".repeat(60));
    console.log("📧 E-MAIL (Demo Mode - Not Sent)");
    console.log("=".repeat(60));
    console.log(`To: ${Array.isArray(to) ? to.join(", ") : to}`);
    console.log(`Subject: ${subject}`);
    if (replyTo) console.log(`Reply-To: ${replyTo}`);
    console.log("-".repeat(60));
    console.log("HTML Content Preview (first 500 chars):");
    console.log(html.substring(0, 500) + (html.length > 500 ? "..." : ""));
    console.log("=".repeat(60));
    
    return { success: true, id: `demo_${Date.now()}` };
  }

  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: "Resend client not available" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log(`📧 Email sent successfully: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

// Helper to send email to admin
export async function sendAdminNotification(
  subject: string,
  html: string,
  replyTo?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL || "info@kmp-horren.nl";
  
  return sendEmail({
    to: adminEmail,
    subject: `[KMP Admin] ${subject}`,
    html,
    replyTo,
  });
}
