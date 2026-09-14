import Link from "next/link";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

import { ContactCard } from "@/components/ui/contact-card";
import InquiryForm from "@/components/contact/InquiryForm";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <span>Contact</span>

        <h1>
          Let's build
          <br />
          something meaningful.
        </h1>
      </section>

      <section className="contact-information">
        <div className="contact-block">
          <span>Phone</span>

          <a href="tel:+985135056430">
            0513 605 6430
          </a>

          <a href="tel:+989151156509">
            +98 915 115 6509
          </a>
        </div>

        <div className="contact-block">
          <span>Email</span>

          <a href="mailto:esmireza5@gmail.com">
            esmireza5@gmail.com
          </a>
        </div>

        <div className="contact-block">
          <span>Office</span>

          <address>
            Sajjad Blvd,
            <br />
            Sajjad 20,
            <br />
            No. 46,
            <br />
            Mashhad, Iran
          </address>
        </div>

        <div className="contact-block">
          <span>Instagram</span>

          <a
            href="https://instagram.com/rezaesmi.architecture"
            target="_blank"
            rel="noreferrer"
          >
            @rezaesmi.architecture
          </a>
        </div>
      </section>

      <section className="contact-inquiry">
        <ContactCard
          title="Get in touch"
          description="Feel free to ask questions, get information, or tell us about your project. We would be glad to learn more and explore potential collaborations."
          contactInfo={[
            {
              icon: MailIcon,
              label: "Email",
              value: "esmireza5@gmail.com",
            },
            {
              icon: PhoneIcon,
              label: "Phone",
              value: "+98 915 812 0101",
            },
            {
              icon: MapPinIcon,
              label: "Office",
              value: "Mashhad, Iran",
              className: "col-span-2",
            },
          ]}
        >
          <InquiryForm />
        </ContactCard>
      </section>

      <section className="contact-footer">
        <Link href="/">
          ← Back to home
        </Link>
      </section>
    </main>
  );
}