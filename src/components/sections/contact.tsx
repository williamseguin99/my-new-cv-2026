"use client";

import { useState } from "react";
import { FadeInSection } from "@/components/motion-wrapper";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error. Please try again.");
    }
  };

  const inputBase =
    "w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 text-sm";

  return (
    <section id="contact" className="section-padding bg-background print:hidden">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label">Get in Touch</p>
          <h2 className="section-heading mb-4">Contact</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg">
            Whether it&apos;s a professional opportunity, a collaboration, or just a conversation — I&apos;d love to hear from you.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="William Séguin"
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@company.com"
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Subject <span className="text-accent">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Let's collaborate"
                  className={inputBase}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me what's on your mind..."
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div role="alert" className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
                  ✅ Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div role="alert" className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                  ❌ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="self-start inline-flex items-center gap-2 bg-accent text-contrast font-bold px-8 py-3 rounded-full hover:bg-accent/90 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 text-sm uppercase tracking-wide"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 h-full">
              <h3 className="font-bold text-foreground">Direct Contact</h3>
              <a
                href="mailto:hello@williamseguin.com?subject=Hello%20William"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <span className="text-lg">📧</span>
                <span className="group-hover:underline">hello@williamseguin.com</span>
              </a>
              <a
                href="tel:+14388386087"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <span className="text-accent text-lg">📞</span>
                <span className="group-hover:underline">+1 (438) 838-6087</span>
              </a>
              <p className="text-xs text-muted-foreground">Montréal, Québec, Canada · Open to Swiss/EU market</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
