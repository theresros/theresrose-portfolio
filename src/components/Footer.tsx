import { Github, Linkedin, Mail, Phone, ArrowUp } from "lucide-react";
import { PROFILE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 bg-section border-t border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-display font-bold text-xl text-heading">
              {PROFILE.name}<span className="text-primary">.</span>
            </div>
            <p className="mt-3 text-sm text-body max-w-xs">
              {PROFILE.tagline}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 text-body hover:text-primary">
              <Mail className="h-4 w-4" /> {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-2 text-body hover:text-primary">
              <Phone className="h-4 w-4" /> {PROFILE.phone}
            </a>
          </div>
          <div className="flex md:justify-end items-start gap-3">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="h-10 w-10 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center text-body transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-10 w-10 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center text-body transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-body flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {PROFILE.name}. Crafted with care.</span>
          <span>Built with TanStack Start, Tailwind & Framer Motion.</span>
        </div>
      </div>
    </footer>
  );
}