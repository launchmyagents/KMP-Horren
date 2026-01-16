import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { welcomeEmail } from "@/lib/email-templates/password-reset";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, verificationUrl } = body;

    if (!email) {
      return NextResponse.json(
        { error: "E-mail is verplicht" },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to: email,
      subject: "Welkom bij KMP Horren!",
      html: welcomeEmail({
        firstName,
        verificationUrl,
      }),
    });

    if (!result.success) {
      console.error("Failed to send welcome email:", result.error);
      return NextResponse.json(
        { error: "Kon e-mail niet versturen" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
