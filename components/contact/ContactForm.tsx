"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log("Contact form submission:", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    });

    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-introduction">
        <span>Start a conversation</span>

        <h2>
          Have a project
          <br />
          in mind?
        </h2>

        <p>
          Feel free to ask questions, get information, or tell us about your
          project. We would be glad to learn more and explore potential
          collaborations.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number"
          />
        </label>

        <label>
          Project type
          <select name="projectType" defaultValue="">
            <option value="" disabled>
              Select a project type
            </option>
            <option value="industrial">Industrial</option>
            <option value="office">Office</option>
            <option value="residential">Residential</option>
            <option value="villa">Villa</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Tell us about your project
          <textarea
            name="message"
            placeholder="Tell us about your project, questions, or requirements..."
            rows={6}
            required
          />
        </label>

        <button type="submit">
          Send inquiry
        </button>

        {submitted && (
          <p className="contact-form-success">
            Thank you. Your inquiry has been received.
          </p>
        )}
      </form>
    </div>
  );
}