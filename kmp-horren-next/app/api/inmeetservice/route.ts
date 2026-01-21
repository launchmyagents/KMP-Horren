import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail, sendAdminNotification } from "@/lib/resend";
import {
  inmeetserviceAdminNotificationEmail,
  inmeetserviceCustomerConfirmationEmail,
} from "@/lib/email-templates";
import { InsertTables } from "@/lib/supabase/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      street,
      houseNumber,
      postalCode,
      city,
      preferredDate,
      preferredTime,
      notes,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !street || !houseNumber || !postalCode || !city) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Prepare request data for database
    const requestData: InsertTables<"inmeetservice_requests"> = {
      name,
      email,
      phone,
      street,
      house_number: houseNumber,
      postal_code: postalCode,
      city,
      preferred_date: preferredDate || null,
      preferred_time: preferredTime || null,
      notes: notes || null,
      status: "pending",
    };

    // Insert request into database
    const { data: savedRequest, error: dbError } = await supabase
      .from("inmeetservice_requests")
      .insert(requestData)
      .select()
      .single();

    if (dbError || !savedRequest) {
      console.error("Error saving inmeetservice request:", dbError);
      return NextResponse.json(
        { error: "Kon aanvraag niet opslaan" },
        { status: 500 }
      );
    }

    console.log("Inmeetservice request created:", savedRequest.id);

    // Prepare email data
    const emailData = {
      name,
      email,
      phone,
      street,
      houseNumber,
      postalCode,
      city,
      preferredDate,
      preferredTime,
      notes,
      createdAt: savedRequest.created_at,
    };

    // Send confirmation email to customer
    const customerEmailResult = await sendEmail({
      to: email,
      subject: "Bevestiging Inmeetservice Aanvraag - KMP Horren",
      html: inmeetserviceCustomerConfirmationEmail(emailData),
    });

    if (customerEmailResult.success) {
      console.log(`Inmeetservice confirmation email sent to ${email}`);
    } else {
      console.error(`Failed to send inmeetservice confirmation: ${customerEmailResult.error}`);
    }

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(
      `Nieuwe Inmeetservice Aanvraag - ${name} (${city})`,
      inmeetserviceAdminNotificationEmail(emailData),
      email // Reply-to customer email
    );

    if (adminEmailResult.success) {
      console.log(`Inmeetservice admin notification sent for ${name}`);
    } else {
      console.error(`Failed to send inmeetservice admin notification: ${adminEmailResult.error}`);
    }

    return NextResponse.json({
      success: true,
      id: savedRequest.id,
      message: "Aanvraag succesvol ingediend",
    });
  } catch (error) {
    console.error("Error creating inmeetservice request:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het indienen van de aanvraag" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint could be used to check status of a request
  // For now, return method not allowed
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
