"use client";

import { useEffect, useState, type FormEvent } from "react";

const email = "mose_dev@proton.me";
const fields = ["name", "email", "message"] as const;
type ContactField = (typeof fields)[number];
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;
type ContactStatus = { kind: "error" | "success"; text: string };

const initialValues: ContactValues = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const replyEmail = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Add your name.";
  else if (name.length < 2) errors.name = "Use at least 2 characters.";
  else if (name.length > 80) errors.name = "Keep your name under 80 characters.";

  if (!replyEmail) errors.email = "Add your email address.";
  else if (replyEmail.length > 254 || !emailPattern.test(replyEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) errors.message = "Add a message.";
  else if (message.length < 10) errors.message = "Use at least 10 characters.";
  else if (message.length > 3000) errors.message = "Keep your message under 3,000 characters.";

  return errors;
}

function createEmailDraft(values: ContactValues) {
  const subject = `Portfolio message from ${values.name.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    "",
    values.message.trim(),
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [touched, setTouched] = useState<Record<ContactField, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [draftHref, setDraftHref] = useState<string | null>(null);
  const [status, setStatus] = useState<ContactStatus | null>(null);
  const [toastVersion, setToastVersion] = useState(0);
  const errors = validate(values);

  useEffect(() => {
    if (toastVersion === 0) return;
    const timer = window.setTimeout(() => setToastVersion(0), 5200);
    return () => window.clearTimeout(timer);
  }, [toastVersion]);

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setDraftHref(null);
    setStatus(null);
    setToastVersion(0);
  }

  function showError(field: ContactField) {
    return (attemptedSubmit || touched[field]) ? errors[field] : undefined;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);
    setTouched({ name: true, email: true, message: true });

    const nextErrors = validate(values);
    const firstInvalid = fields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setDraftHref(null);
      setToastVersion(0);
      setStatus({ kind: "error", text: "Please fix the highlighted fields and try again." });
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setDraftHref(createEmailDraft(values));
    setStatus({ kind: "success", text: "Message checked. Open the email draft below to review and send." });
    setToastVersion((current) => current + 1);
  }

  const nameError = showError("name");
  const emailError = showError("email");
  const messageError = showError("message");

  return (
    <>
    <section id="contact" className="section-shell content-section contact-section">
      <div className="contact-panel">
        <div className="contact-copy">
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> Get in touch <span className="eyebrow-divider">/</span> 03</p>
          <h2>Contact<span className="contact-period" aria-hidden="true">.</span></h2>
          <p className="contact-note">Have something interesting in mind?</p>
        </div>

        <div className="contact-actions">
          <ul className="contact-links">
            <li>
              <a href={`mailto:${email}`}>
                <span>{email}</span><span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/Mozle941" target="_blank" rel="noopener noreferrer">
                <span>GitHub</span><span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>

          <form className="contact-form" aria-label="Send a message" noValidate onSubmit={handleSubmit}>
            <div className="contact-form-fields">
              <div className="contact-field">
                <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  required
                  value={values.name}
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? "contact-name-error" : undefined}
                  onChange={(event) => updateField("name", event.currentTarget.value)}
                  onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                />
                {nameError && <span className="contact-field-error" id="contact-name-error">{nameError}</span>}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Your email <span aria-hidden="true">*</span></label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  required
                  spellCheck={false}
                  value={values.email}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "contact-email-error" : undefined}
                  onChange={(event) => updateField("email", event.currentTarget.value)}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                />
                {emailError && <span className="contact-field-error" id="contact-email-error">{emailError}</span>}
              </div>

              <div className="contact-field contact-field--message">
                <div className="contact-field-heading">
                  <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                  <span className="contact-char-count" aria-live="off">{values.message.length}/3,000</span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  minLength={10}
                  maxLength={3000}
                  required
                  value={values.message}
                  aria-invalid={Boolean(messageError)}
                  aria-describedby={messageError ? "contact-message-error" : undefined}
                  onChange={(event) => updateField("message", event.currentTarget.value)}
                  onBlur={() => setTouched((current) => ({ ...current, message: true }))}
                />
                {messageError && <span className="contact-field-error" id="contact-message-error">{messageError}</span>}
              </div>
            </div>

            <div className="contact-form-bottom">
              <button className="contact-submit" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
              <p className="contact-form-hint">Opens your email app so you can review and send.</p>
            </div>

            {status && (
              <p
                className="contact-form-status"
                data-kind={status.kind}
                role={status.kind === "error" ? "alert" : undefined}
                aria-live={status.kind === "error" ? "assertive" : "off"}
              >
                {status.text}
              </p>
            )}
            {draftHref && (
              <a className="contact-draft-link" href={draftHref}>
                Open email draft <span aria-hidden="true">↗</span>
              </a>
            )}
          </form>
        </div>
      </div>
    </section>
    {toastVersion > 0 && draftHref && (
      <div className="contact-toast" role="status" aria-live="polite" aria-atomic="true">
        <span className="contact-toast-icon" aria-hidden="true">✓</span>
        <div className="contact-toast-copy">
          <strong>Email draft ready</strong>
          <span>Review and send it from your email app.</span>
        </div>
        <a className="contact-toast-action" href={draftHref}>
          Open draft <span aria-hidden="true">↗</span>
        </a>
        <button
          className="contact-toast-dismiss"
          type="button"
          aria-label="Dismiss notification"
          onClick={() => setToastVersion(0)}
        >
          ×
        </button>
      </div>
    )}
    </>
  );
}
