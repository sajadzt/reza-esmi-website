import { Resend } from "resend";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      projectType,
      message,
      website,
    } = body;

    /*
      Honeypot protection:
      Real users never see this field.
      Bots that fill it are silently accepted.
    */
    if (website) {
      return Response.json({
        success: true,
      });
    }

    /*
      Basic validation
    */
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return Response.json(
        {
          success: false,
          error: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 150 || email.length > 254 || message.length > 5000) {
      return Response.json(
        {
          success: false,
          error: "The submitted information is too long.",
        },
        {
          status: 400,
        }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing.");
      return Response.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(resendApiKey);

    const logo =
      "https://esmiarchitecture.com/logo/email-logo.png";

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone || "-");
    const safeProjectType = escapeHtml(projectType || "-");
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    /*
      1. Email to Esmi Architecture
    */
    const inquiryEmail = await resend.emails.send({
      from: "Esmi Architecture <studio@esmiarchitecture.com>",
      to: ["esmireza5@gmail.com"],
      replyTo: email.trim(),
      subject: "New Website Inquiry - Esmi Architecture",

      html: `
        <div style="
          background:#111;
          padding:30px;
          text-align:center;
        ">
          <img
            src="${logo}"
            alt="Esmi Architecture"
            style="
              width:180px;
              max-width:100%;
              margin-bottom:20px;
            "
          />
        </div>

        <div style="
          font-family:Arial,sans-serif;
          padding:30px;
          color:#222;
          line-height:1.6;
        ">
          <h2>New Project Inquiry</h2>

          <p>
            A new client submitted an inquiry through your website.
          </p>

          <hr/>

          <p>
            <strong>Name:</strong><br/>
            ${safeName}
          </p>

          <p>
            <strong>Email:</strong><br/>
            ${safeEmail}
          </p>

          <p>
            <strong>Phone:</strong><br/>
            ${safePhone}
          </p>

          <p>
            <strong>Project Type:</strong><br/>
            ${safeProjectType}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${safeMessage}
          </p>

          <hr/>

          <p style="
            font-size:12px;
            color:#777;
          ">
            Sent from Esmi Architecture website.
          </p>
        </div>
      `,
    });

    if (inquiryEmail.error) {
      console.error("Inquiry email failed:", inquiryEmail.error);

      return Response.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }

    /*
      2. Automatic confirmation email to client
    */
    const confirmationEmail = await resend.emails.send({
      from: "Esmi Architecture <info@esmiarchitecture.com>",
      to: [email.trim()],
      subject: "Thank you for contacting Esmi Architecture",

      html: `
        <div style="
          background:#111;
          padding:30px;
          text-align:center;
        ">
          <img
            src="${logo}"
            alt="Esmi Architecture"
            style="
              width:180px;
              max-width:100%;
            "
          />
        </div>

        <div style="
          font-family:Arial,sans-serif;
          padding:35px;
          color:#222;
          line-height:1.7;
        ">
          <h2>Thank you, ${safeName}</h2>

          <p>
            We have received your inquiry successfully.
          </p>

          <p>
            Our team at Esmi Architecture will review your
            project details and contact you soon.
          </p>

          <br/>

          <p>
            Regards,<br/>
            <strong>Esmi Architecture Team</strong>
          </p>

          <hr/>

          <p style="
            font-size:12px;
            color:#777;
          ">
            Industrial &amp; Office Architecture<br/>
            Mashhad, Iran
          </p>
        </div>
      `,
    });

    if (confirmationEmail.error) {
      console.error(
        "Confirmation email failed:",
        confirmationEmail.error
      );

      /*
        The inquiry was already delivered successfully.
        We still return success because the main submission worked.
      */
    }

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error("Inquiry error:", error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}