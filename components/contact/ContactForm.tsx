"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { ActionButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const PLACEHOLDER_ID = "your_form_id";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;

const emptyValues: Values = { name: "", email: "", message: "" };

function configuredId() {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID || profile.formspreeId;
  return id && id !== PLACEHOLDER_ID ? id : "";
}

function readError(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  if ("error" in payload && typeof payload.error === "string") return payload.error;
  if ("errors" in payload && Array.isArray(payload.errors)) {
    return payload.errors
      .map((item) => {
        if (item && typeof item === "object" && "message" in item) return String(item.message);
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }
  return "";
}

function fieldErrors(values: Values) {
  const errors: Partial<Record<Field, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Use at least 2 characters.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Use at least 10 characters.";
  return errors;
}

const control =
  "mt-2 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted aria-invalid:border-danger";

export function ContactForm() {
  const id = configuredId();
  const configured = id.length > 0;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [values, setValues] = useState<Values>(emptyValues);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const errors = fieldErrors(values);

  function touch(field: Field) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(fieldErrors(values)).length > 0) return;

    if (!configured) {
      setStatus("error");
      setError(
        "Add your Formspree id in data/profile.ts (formspreeId), or set NEXT_PUBLIC_FORMSPREE_ID, then restart the dev server.",
      );
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(`https://formspree.io/f/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus("error");
        setError(readError(payload) || "The form service rejected this message.");
        return;
      }
      setStatus("success");
      setValues(emptyValues);
      setTouched({});
    } catch {
      setStatus("error");
      setError("Could not reach the form service.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[18px] border border-border bg-card p-6 sm:p-8" role="status">
        <div className="success-mark" aria-hidden="true" />
        <h3 className="mt-5 text-lg font-semibold">Message sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thanks. Your message is on its way, and I will get back to you soon.
        </p>
        <ActionButton variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another
        </ActionButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action={configured ? `https://formspree.io/f/${id}` : undefined}
      method="POST"
      className="rounded-[18px] border border-border bg-card p-6 sm:p-8"
      aria-describedby={configured ? "contact-status" : "form-setup contact-status"}
    >
      <p className="text-sm text-muted">All fields are required.</p>
      <div className="mt-5 flex flex-col gap-4">
        <Field
          id="contact-name"
          label="Name"
          error={touched.name ? errors.name : undefined}
          hint="At least 2 characters."
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            maxLength={100}
            placeholder="Your name"
            value={values.name}
            aria-invalid={touched.name && errors.name ? true : undefined}
            aria-describedby={touched.name && errors.name ? "contact-name-error" : undefined}
            onBlur={() => touch("name")}
            onInvalid={() => touch("name")}
            onChange={(event) => update("name", event.target.value)}
            className={`${control} h-11`}
          />
        </Field>
        <Field
          id="contact-email"
          label="Email"
          error={touched.email ? errors.email : undefined}
          hint="A real email address."
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            placeholder="you@example.com"
            value={values.email}
            aria-invalid={touched.email && errors.email ? true : undefined}
            aria-describedby={touched.email && errors.email ? "contact-email-error" : undefined}
            onBlur={() => touch("email")}
            onInvalid={() => touch("email")}
            onChange={(event) => update("email", event.target.value)}
            className={`${control} h-11`}
          />
        </Field>
        <Field
          id="contact-message"
          label="Message"
          error={touched.message ? errors.message : undefined}
          hint="At least 10 characters."
        >
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            placeholder="Tell me about the role or project"
            value={values.message}
            aria-invalid={touched.message && errors.message ? true : undefined}
            aria-describedby={touched.message && errors.message ? "contact-message-error" : undefined}
            onBlur={() => touch("message")}
            onInvalid={() => touch("message")}
            onChange={(event) => update("message", event.target.value)}
            className={`${control} min-h-32 py-3`}
          />
        </Field>
      </div>
      {!configured ? (
        <p id="form-setup" className="mt-4 font-mono text-xs leading-relaxed text-muted">
          Form endpoint not set. Replace formspreeId in data/profile.ts with your Formspree id.
        </p>
      ) : null}
      <p id="contact-status" role={status === "error" ? "alert" : "status"} className="mt-4 text-sm">
        {status === "error" ? (
          <>
            {error} You can also email{" "}
            <a data-cursor="pointer" className="underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </>
        ) : status === "sending" ? (
          "Sending your message."
        ) : null}
      </p>
      <ActionButton type="submit" className="mt-2 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </ActionButton>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium" htmlFor={id}>
      {label}
      <span className="sr-only">. {hint}</span>
      {children}
      {error ? (
        <span id={`${id}-error`} className="mt-1 block text-xs font-normal text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}
