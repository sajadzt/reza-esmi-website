"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setSubmitted(false);
    setError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const inquiryData = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      projectType: String(
        formData.get("projectType") || ""
      ).trim(),
      message: String(
        formData.get("message") || ""
      ).trim(),
      website: String(
        formData.get("website") || ""
      ).trim(),
    };

    try {
      const response = await fetch(
        "/api/inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inquiryData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Inquiry submission failed");
      }

      setSubmitted(true);
      form.reset();

    } catch (error) {
      console.error(
        "Inquiry submission error:",
        error
      );

      setError(true);

    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4"
    >
      {/* Honeypot field: hidden from normal users,
          useful for blocking simple bots. */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          display: "none",
        }}
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">
          Name
        </Label>

        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email address"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">
          Phone
        </Label>

        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your phone number"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="projectType">
          Project type
        </Label>

        <select
          id="projectType"
          name="projectType"
          defaultValue=""
          className="
            flex h-10 w-full rounded-md
            border border-input
            bg-background
            px-3 py-2
            text-sm
          "
        >
          <option value="" disabled>
            Select a project type
          </option>

          <option value="industrial">
            Industrial
          </option>

          <option value="office">
            Office
          </option>

          <option value="residential">
            Residential
          </option>

          <option value="villa">
            Villa
          </option>

          <option value="other">
            Other
          </option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">
          Message
        </Label>

        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project, questions, or requirements..."
          rows={5}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={sending}
      >
        {sending
          ? "Sending..."
          : "Send inquiry"}
      </Button>

      {submitted && (
        <p className="text-sm text-green-600">
          Thank you. Your inquiry has been sent successfully.
          We will contact you shortly.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500">
          We could not send your inquiry.
          Please try again later.
        </p>
      )}
    </form>
  );
}