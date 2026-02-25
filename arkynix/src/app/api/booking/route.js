import { NextResponse } from "next/server";
import { sendMail } from "../../../lib/email";
import dbConnect from "../../../lib/dbConnect";
import Contact from "../../../models/Booking";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      mobile,
      service,
      message,
    } = body;

    /* ===============================
       VALIDATION
    =============================== */
    if (!fullName || !email || !mobile || !service) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    await dbConnect();

    /* ===============================
       SAVE TO DATABASE
    =============================== */
    const contact = await Contact.create({
      name: fullName,
      email,
      phone: mobile,
      service,
      message,
    });

    /* ===============================
       OWNER EMAIL NOTIFICATION
    =============================== */
    await sendMail({
      to: process.env.SMTP_USER,
      subject: `📩 New Inquiry – ${service}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b></p>
        <p>${message || "-"}</p>
      `,
    });

    /* ===============================
       CLIENT CONFIRMATION EMAIL
    =============================== */
    await sendMail({
      to: email,
      subject: "We’ve received your inquiry – Akanis Production",
      html: `
      <div style="margin:0;padding:0;background-color:#f4f6f8;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 16px;">
              
              <table width="100%" cellpadding="0" cellspacing="0" 
                style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
                
                <!-- Header -->
                <tr>
                  <td style="background:#0f172a;padding:20px 24px;">
                    <h2 style="margin:0;color:#ffffff;font-size:20px;">
                      Akanis Production
                    </h2>
                    <p style="margin:4px 0 0;color:#cbd5e1;font-size:13px;">
                      Creative • Digital • Development
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:28px 24px;color:#111827;">
                    <p style="margin:0 0 12px;font-size:15px;">
                      Hi <b>${fullName}</b>,
                    </p>

                    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
                      Thank you for contacting <b>Akanis Production</b>.
                      We’ve successfully received your inquiry regarding 
                      <b>${service}</b>.
                    </p>

                    <div style="background:#f8fafc;border-left:4px solid #0f172a;padding:12px 14px;margin:20px 0;">
                      <p style="margin:0;font-size:13px;color:#374151;">
                        <b>Service:</b> ${service}<br/>
                        <b>Mobile:</b> ${mobile}
                      </p>
                    </div>

                    <p style="margin:0;font-size:14px;color:#374151;">
                      Our team is reviewing your request and will respond shortly.
                    </p>

                    <p style="margin:24px 0 0;font-size:14px;">
                      Best regards,<br/>
                      <b>Team Akanis Production</b>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f1f5f9;padding:14px 24px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">
                      © ${new Date().getFullYear()} Akanis Production. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact submitted successfully",
        id: contact._id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/* ===============================
   GET ALL CONTACTS (ADMIN)
=============================== */
export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact GET Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}