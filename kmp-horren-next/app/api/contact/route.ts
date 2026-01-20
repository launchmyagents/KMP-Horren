import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendEmail, sendAdminNotification } from "@/lib/resend";
import {
  contactAdminNotificationEmail,
  contactCustomerConfirmationEmail,
} from "@/lib/email-templates/contact-notification";
import { createAdminClient } from "@/lib/supabase/server";

// Validation
function validateContactForm(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Naam is verplicht (minimaal 2 karakters)");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Geldig e-mailadres is verplicht");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Bericht is verplicht (minimaal 10 karakters)");
  }

  return { valid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    const validation = validateContactForm({ name, email, subject, message });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(", ") },
        { status: 400 }
      );
    }

    // Create contact message object
    const contactMessage = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || null,
      message: message.trim(),
      is_read: false,
      created_at: new Date().toISOString(),
    };

    // Save to Supabase
    const supabase = createAdminClient();
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert(contactMessage);

    if (dbError) {
      console.error("Failed to save contact message:", dbError);
      // Continue anyway - we still want to send emails
    }

    console.log("Contact message received:", {
      id: contactMessage.id,
      name: contactMessage.name,
      email: contactMessage.email,
      subject: contactMessage.subject,
    });

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(
      `Nieuw bericht van ${name}${subject ? `: ${subject}` : ""}`,
      contactAdminNotificationEmail({
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject || undefined,
        message: contactMessage.message,
        createdAt: contactMessage.created_at,
      }),
      contactMessage.email // Reply-to customer email
    );

    if (!adminEmailResult.success) {
      console.error("Failed to send admin notification:", adminEmailResult.error);
    }

    // Send confirmation email to customer
    const customerEmailResult = await sendEmail({
      to: contactMessage.email,
      subject: "Bedankt voor je bericht - KMP Horren",
      html: contactCustomerConfirmationEmail({
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject || undefined,
        message: contactMessage.message,
      }),
    });

    if (!customerEmailResult.success) {
      console.error("Failed to send customer confirmation:", customerEmailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Bericht succesvol verzonden",
      id: contactMessage.id,
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verzenden van je bericht" },
      { status: 500 }
    );
  }
}
