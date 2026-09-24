import { useState } from "react";
import { profile } from "../data";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-4v-11Z" /></svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" /></svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    window.setTimeout(() => setCopied("idle"), 2200);
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-card">
        <h2 id="contact-title">Get in touch</h2>
        <p className="contact-lede">I welcome conversations about technical leadership, product delivery and cross-platform engineering.</p>

        <div className="email-row">
          <a className="email-link" href={`mailto:${profile.email}`}>
            <MailIcon />
            <span>{profile.email}</span>
          </a>
          <button type="button" className="btn btn-ghost copy-btn" onClick={copy}>
            {copied === "done" ? "Email copied" : copied === "failed" ? "Copy failed, select it instead" : "Copy email"}
          </button>
          <span className="sr-only" role="status">{copied === "done" ? "Email address copied to clipboard" : ""}</span>
        </div>

        <ul className="socials">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              <span><b>LinkedIn</b><small>{profile.linkedinHandle}</small></span>
            </a>
          </li>
          <li>
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <span><b>Instagram</b><small>@{profile.instagramHandle}</small></span>
            </a>
          </li>
        </ul>
      </div>
      <footer className="footer">© 2026 {profile.name}. All rights reserved.</footer>
    </section>
  );
}
