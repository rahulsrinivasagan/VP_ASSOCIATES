import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "ok", message: "VP Associates Contact API" });
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      try {
        const text = await req.text();
        body = text ? JSON.parse(text) : {};
      } catch {
        body = {};
      }
    }

    const {
      firstName = "",
      lastName = "",
      name = "",
      email = "",
      phone = "",
      phoneNumber = "",
      subject = "",
      message = "",
      sourcePage = "Website Contact Form",
      slot = "",
      date = "",
    } = body;

    // Derived fields
    const resolvedFirstName = firstName || (name ? name.split(" ")[0] : "");
    const resolvedLastName = lastName || (name ? name.split(" ").slice(1).join(" ") : "");
    const resolvedPhone = phone || phoneNumber;

    // Validate minimum requirements
    if (!resolvedFirstName && !name && !email && !resolvedPhone) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Format current date and time in IST (Indian Standard Time, UTC+5:30)
    const now = new Date();
    const istFormatterDate = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const istFormatterTime = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const submissionDate = istFormatterDate.format(now);
    const submissionTime = istFormatterTime.format(now);

    const sheetPayload = {
      submissionDate,
      submissionTime,
      sourcePage,
      firstName: resolvedFirstName,
      lastName: resolvedLastName,
      name: `${resolvedFirstName} ${resolvedLastName}`.trim() || name,
      email,
      phone: resolvedPhone,
      phoneNumber: resolvedPhone,
      subject: subject || (slot ? `Ground Slot Booking (${slot})` : "General Enquiry"),
      message: message || (date ? `Date: ${date}, Slot: ${slot}` : ""),
      slot,
      date,
    };

    const googleScriptUrl =
      process.env.GOOGLE_SHEET_SCRIPT_URL ||
      process.env.GOOGLE_SHEETS_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (googleScriptUrl) {
      try {
        const response = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetPayload),
          redirect: "follow",
        });

        if (!response.ok) {
          console.error("Google Sheets Webhook error:", response.status, response.statusText);
        }
      } catch (webhookErr) {
        console.error("Failed to forward data to Google Apps Script:", webhookErr);
      }
    } else {
      console.log(
        "[API/Contact] Received enquiry (No GOOGLE_SHEET_SCRIPT_URL configured in .env):",
        sheetPayload
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
      data: {
        submissionDate,
        submissionTime,
        sourcePage,
      },
    });
  } catch (error: any) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
