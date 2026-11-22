"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { contact, site, socials } from "@/data/portfolio";
import { iconPaths, type IconName } from "@/lib/icons";
import { SectionHeader, StatusDot } from "@/components/ui/Bits";
import { RollText } from "@/components/ui/Text";

type FormStatus = "idle" | "sending" | "sent" | "error";

/* EmailJS — keys are public by design (they only allow sending through the
   configured template). Set them in .env.local and on your host. */
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_ID;
const CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const inputClass =
  "mt-2 block w-full border border-line bg-fg/5 px-4 py-3 font-display text-base tracking-[-0.02em] text-fg outline-none transition-colors duration-300 placeholder:text-muted/50 hover:border-fg/40 focus:border-fg focus:bg-transparent focus-visible:outline-none md:text-lg";

export function Contact() {
  const channels: {
    label: string;
    handle: string;
    /** Omitted for rows that are read-only (e.g. the phone number). */
    href?: string;
    icon: IconName;
    external: boolean;
  }[] = [
    { label: "Email", handle: site.email, href: `mailto:${site.email}`, icon: "mail", external: false },
    { label: "Phone", handle: site.phone, icon: "phone", external: false },
    ...socials.map((s) => ({
      label: s.label,
      handle: s.handle,
      href: s.href,
      icon: s.icon ?? "mail",
      external: true,
    })),
  ];

  return (
    <section id="contact" className="relative">
      <div className="frame pb-16 md:pb-24">
        <SectionHeader id="contact" title="Contact" titleSize="compact" />

        <div className="cell border-t border-line pb-8 pt-8 md:pb-10 md:pt-10">
          <h2 className="display text-[clamp(1.25rem,2.4vw,1.85rem)] uppercase leading-none">
            Send a message
          </h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted md:text-base">{contact.intro}</p>
        </div>

        <div className="grid border-t border-line lg:grid-cols-12">
          {/* Message form */}
          <div className="lg:col-span-7">
            <div className="cell py-8 md:py-12">
              <ContactForm />
            </div>
          </div>

          {/* Direct links */}
          <div className="border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
            <div className="cell flex items-baseline justify-between pb-4 pt-8 md:pt-12">
              <h3 className="display text-xl uppercase leading-none md:text-2xl">Contact</h3>
              <p className="label text-muted">Direct</p>
            </div>

            <ul>
              {channels.map((channel) => {
                const content = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center border border-line transition-colors duration-500 group-hover:border-bg/40">
                      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d={iconPaths[channel.icon]} />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="display block text-xl uppercase leading-none">{channel.label}</span>
                      <span className="label mt-1 block truncate text-muted transition-colors duration-500 group-hover:text-bg/70">
                        {channel.handle}
                      </span>
                    </span>
                    {channel.href && (
                      <span
                        aria-hidden
                        className="shrink-0 text-xl transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    )}
                  </>
                );

                return (
                  <li key={channel.label} className="border-t border-line last:border-b">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group cell flex items-center gap-4 py-4 transition-colors duration-500 hover:bg-fg hover:text-bg"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="cell flex items-center gap-4 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="cell flex items-center gap-2 py-6">
              <StatusDot />
              <p className="label text-muted">{site.availability.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [note, setNote] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never touch this hidden field.
    if (data.get("botcheck")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      setNote("Please fill in your name, email and message.");
      return;
    }

    if (!CONFIGURED) {
      setStatus("error");
      setNote(
        `The form isn't configured — add NEXT_PUBLIC_PUBLIC_ID, NEXT_PUBLIC_SERVICE_ID and NEXT_PUBLIC_TEMPLATE_ID to .env.local. Meanwhile, email me at ${site.email}.`,
      );
      return;
    }

    setStatus("sending");
    setNote("");
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          from_name: name,
          name,
          email,
          reply_to: email,
          to_name: site.name,
          subject: `New message from ${name} — ${site.name}`,
          message,
        },
        { publicKey: PUBLIC_KEY! },
      );

      setStatus("sent");
      setNote("Thanks — your message is on its way. I'll reply within two working days.");
      form.reset();
    } catch (error) {
      const detail =
        typeof error === "object" && error !== null && "text" in error
          ? String((error as { text?: unknown }).text ?? "")
          : "";
      console.error("EmailJS send failed:", error);
      setStatus("error");
      setNote(
        detail && detail !== ""
          ? `Couldn't send (${detail}). Please email me at ${site.email}.`
          : `Something went wrong. Please email me at ${site.email}.`,
      );
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-5 border border-line px-6 py-10 md:px-10 md:py-14"
      >
        <span className="flex size-12 items-center justify-center border border-line">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <path d="m4 12.5 5 5L20 6.5" />
          </svg>
        </span>

        <h3 className="display text-[clamp(1.75rem,3.5vw,3rem)] uppercase leading-[0.95]">
          Thank you
        </h3>

        <p className="max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
          Your message was successfully sent to <span className="text-fg">{site.email}</span>.
          I read every message and reply within two working days.
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setNote("");
          }}
          className="group mt-2 flex w-full items-center justify-between bg-fg px-5 py-4 text-bg transition-opacity duration-300 hover:opacity-90 md:py-5"
        >
          <span className="display text-xl uppercase md:text-2xl">
            <RollText>Send another message</RollText>
          </span>
          <span
            aria-hidden
            className="text-xl transition-transform duration-500 ease-expo group-hover:translate-x-1 md:text-2xl"
          >
            ←
          </span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label block">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label block">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="label block">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="What are you building, and when do you need it?"
          className={`${inputClass} min-h-40 resize-none`}
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex w-full items-center justify-between bg-fg px-5 py-4 text-bg transition-opacity duration-300 disabled:opacity-60 md:py-5"
        >
          <span className="display text-xl uppercase md:text-2xl">
            <RollText>{status === "sending" ? "Sending…" : "Send message"}</RollText>
          </span>
          <span
            aria-hidden
            className="text-xl transition-transform duration-500 ease-expo group-hover:translate-x-1 md:text-2xl"
          >
            →
          </span>
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`label mt-3 min-h-5 ${status === "error" ? "text-fg" : "text-muted"}`}
        >
          {status === "error" && note ? `✕ ${note}` : note}
        </p>
      </div>
    </form>
  );
}
