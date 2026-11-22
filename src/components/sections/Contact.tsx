"use client";

import { useState, type FormEvent } from "react";
import { contact, site, socials } from "@/data/portfolio";
import { iconPaths, type IconName } from "@/lib/icons";
import { SectionHeader, StatusDot } from "@/components/ui/Bits";
import { RollText } from "@/components/ui/Text";

type FormStatus = "idle" | "sending" | "sent" | "error";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const inputClass =
  "mt-2 block w-full border border-line bg-fg/5 px-4 py-3 font-display text-base tracking-[-0.02em] text-fg outline-none transition-colors duration-300 placeholder:text-muted/50 hover:border-fg/40 focus:border-fg focus:bg-transparent focus-visible:outline-none md:text-lg";

export function Contact() {
  const channels: { label: string; handle: string; href: string; icon: IconName; external: boolean }[] = [
    { label: "Email", handle: site.email, href: `mailto:${site.email}`, icon: "mail", external: false },
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
        <SectionHeader id="contact" labelAs="p" />

        <div className="cell border-t border-line pb-8 pt-8 md:pb-10 md:pt-10">
          <h2 className="display text-[clamp(1.75rem,4vw,3.25rem)] uppercase leading-none">
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
              <h3 className="display text-xl uppercase leading-none md:text-2xl">Socials</h3>
              <p className="label text-muted">Direct</p>
            </div>

            <ul>
              {channels.map((channel) => (
                <li key={channel.label} className="border-t border-line last:border-b">
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group cell flex items-center gap-4 py-4 transition-colors duration-500 hover:bg-fg hover:text-bg"
                  >
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
                    <span
                      aria-hidden
                      className="shrink-0 text-xl transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
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

    // No key configured yet: fall back to the visitor's mail app with the
    // message pre-filled, so the form is usable out of the box.
    if (!ACCESS_KEY) {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Website message from ${name}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      setNote("Your email app is opening with the message ready to send.");
      return;
    }

    setStatus("sending");
    setNote("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New message from ${name} — ${site.name}`,
          from_name: name,
          name,
          email,
          message,
          botcheck: false,
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (res.ok && json?.success) {
        setStatus("sent");
        setNote("Thanks — your message is on its way. I'll reply within two working days.");
        form.reset();
      } else {
        setStatus("error");
        setNote(json?.message ?? "Something went wrong. Please email me directly instead.");
      }
    } catch {
      setStatus("error");
      setNote("Network error. Please email me directly instead.");
    }
  };

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
          {status === "error" && note ? `✕ ${note}` : status === "sent" && note ? `✓ ${note}` : note}
        </p>
      </div>
    </form>
  );
}
