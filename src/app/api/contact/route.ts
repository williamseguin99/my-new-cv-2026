import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: ContactBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  // Validation
  if (!name?.trim()) {
    return NextResponse.json({ success: false, error: "Name is required." }, { status: 422 });
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 422 });
  }
  if (!subject?.trim()) {
    return NextResponse.json({ success: false, error: "Subject is required." }, { status: 422 });
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json({ success: false, error: "Message must be at least 10 characters." }, { status: 422 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "William Séguin <hello@williamseguin.com>",
      to: ["hello@williamseguin.com"],
      replyTo: email,
      subject: `[williamseguin.com] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #5e0b15; border-bottom: 2px solid #ffba7a; padding-bottom: 12px;">
            New message from williamseguin.com
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 12px; background: #f5f0f0; font-weight: bold; width: 120px; border-radius: 4px 0 0 4px;">From</td>
              <td style="padding: 8px 12px; background: #faf8f8;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f0f0; font-weight: bold;">Email</td>
              <td style="padding: 8px 12px; background: #faf8f8;"><a href="mailto:${email}" style="color: #5e0b15;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f0f0; font-weight: bold;">Subject</td>
              <td style="padding: 8px 12px; background: #faf8f8;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f0f0; border-left: 4px solid #ffba7a; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; color: #333;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent via williamseguin.com contact form. Reply-To is set to the sender's address.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend API error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 500 },
      );
    }

    console.log("[contact] Email sent successfully. ID:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
