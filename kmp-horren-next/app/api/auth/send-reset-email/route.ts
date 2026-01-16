import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { passwordResetEmail } from "@/lib/email-templates/password-reset";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, resetUrl, firstName } = body;

    if (!email || !resetUrl) {
      return NextResponse.json(
        { error: "E-mail en reset URL zijn verplicht" },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to: email,
      subject: "Wachtwoord herstellen - KMP Horren",
      html: passwordResetEmail({
        firstName,
        resetUrl,
        expiresIn: "1 uur",
      }),
    });

    if (!result.success) {
      console.error("Failed to send password reset email:", result.error);
      return NextResponse.json(
        { error: "Kon e-mail niet versturen" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
