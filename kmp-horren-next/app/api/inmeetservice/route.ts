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
    console.log("Inmeetservice request received:", {
      hasName: !!body.name,
      hasEmail: !!body.email,
      hasPhone: !!body.phone,
      hasStreet: !!body.street,
      hasHouseNumber: !!body.houseNumber,
      hasPostalCode: !!body.postalCode,
      hasCity: !!body.city,
    });

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
    
    // Check if admin client is properly initialized
    if (!supabase) {
      console.error("Supabase admin client is not initialized");
      return NextResponse.json(
        { error: "Database verbinding niet beschikbaar" },
        { status: 500 }
      );
    }

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

    console.log("Attempting to insert request:", {
      ...requestData,
      email: requestData.email.substring(0, 3) + "***", // Log partial email for privacy
    });

    // Insert request into database
    const { data: savedRequest, error: dbError } = await supabase
      .from("inmeetservice_requests")
      .insert(requestData)
      .select()
      .single();

    if (dbError) {
      console.error("Error saving inmeetservice request:", {
        error: dbError,
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code,
        requestData,
      });
      return NextResponse.json(
        { 
          error: "Kon aanvraag niet opslaan",
          details: dbError.message || "Database error",
        },
        { status: 500 }
      );
    }

    if (!savedRequest) {
      console.error("No data returned from insert:", { requestData });
      return NextResponse.json(
        { error: "Kon aanvraag niet opslaan - geen data teruggekregen" },
        { status: 500 }
      );
    }

    console.log("Inmeetservice request created successfully:", {
      id: savedRequest.id,
      name: savedRequest.name,
      city: savedRequest.city,
      status: savedRequest.status,
      createdAt: savedRequest.created_at,
    });

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
    console.error("Error creating inmeetservice request:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { 
        error: "Er ging iets mis bij het indienen van de aanvraag",
        details: error instanceof Error ? error.message : "Unknown error",
      },
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
