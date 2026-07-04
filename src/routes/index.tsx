import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Download,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Copy,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
} from "lucide-react";
import { toast } from "sonner";

import { Section } from "@/components/Section";
import { Blobs } from "@/components/Blobs";
import { SmartImage } from "@/components/SmartImage";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import {
  PROFILE,
  CAREER_OBJECTIVE,
  PROFESSIONAL_SUMMARY,
  EDUCATION,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  GALLERY,
} from "@/lib/data";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Journey />
      <Contact />
    </div>
  );
}

function Typing({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[i];
    const t = setTimeout(() => {
      if (!del && txt === w) { setDel(true); return; }
      if (del && txt === "") { setDel(false); setI((v) => (v + 1) % words.length); return; }
      setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1));
    }, !del && txt === w ? 1400 : del ? 40 : 70);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);

  return (
    <span className="text-gradient">
      {txt}
      <span className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle animate-pulse" />
    </span>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-hero-glow">
      <Blobs />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-heading">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Open to full-time & internship opportunities
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-heading">
            Hi, I'm {PROFILE.name.split(" ")[0]}.<br />
            I build <Typing words={["thoughtful software.", "IoT products.", "AI experiences.", "beautiful UIs."]} />
          </h1>
          <p className="mt-6 text-lg text-body max-w-lg">
            {PROFILE.title} · {PROFILE.location}. {PROFILE.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PROFILE.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-[0_10px_30px_-10px_rgba(255,90,95,0.6)] active:scale-95"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-heading text-white px-5 py-3 text-sm font-semibold hover:bg-heading/90 transition-all active:scale-95"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-heading hover:border-primary hover:text-primary transition-colors"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-6 flex gap-3">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="h-11 w-11 rounded-full border border-border bg-white/80 flex items-center justify-center text-body hover:text-primary hover:border-primary transition-colors">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-11 w-11 rounded-full border border-border bg-white/80 flex items-center justify-center text-body hover:text-primary hover:border-primary transition-colors">
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/40 via-secondary/40 to-primary/30 blur-3xl animate-float-slow" />
          <div className="relative h-72 w-72 md:h-96 md:w-96 rounded-full p-1.5 bg-gradient-to-br from-primary via-secondary to-primary shadow-[0_30px_80px_-20px_rgba(255,90,95,0.45)]">
            <div className="h-full w-full rounded-full overflow-hidden bg-white">
              <img
                src={profileImg}
                alt={PROFILE.name}
                width={768}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-3 shadow-[0_20px_60px_-20px_rgba(30,41,59,0.2)]">
            <div className="text-xs text-body">Currently</div>
            <div className="text-sm font-semibold text-heading flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              PM-VIKAS @ IIIT Kottayam
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="A quick introduction" muted>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-premium p-8 hover:[&]:card-premium-hover">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="h-4 w-4" /> Career Objective
          </div>
          <p className="mt-4 text-body leading-relaxed">{CAREER_OBJECTIVE}</p>
        </div>
        <div className="card-premium p-8">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Briefcase className="h-4 w-4" /> Professional Summary
          </div>
          <p className="mt-4 text-body leading-relaxed">{PROFESSIONAL_SUMMARY}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-2 text-heading font-semibold">
          <GraduationCap className="h-5 w-5 text-primary" /> Education
        </div>
        <div className="mt-6 relative border-l-2 border-border pl-6 space-y-6">
          {EDUCATION.map((e, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
              <div className="text-sm text-body">{e.period}</div>
              <div className="font-semibold text-heading">{e.school}</div>
              <div className="text-sm text-body">{e.degree}{e.cgpa && ` · ${e.cgpa}`}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Toolkit" subtitle="Languages, frameworks and concepts I reach for.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group card-premium p-6 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(255,90,95,0.25)]"
          >
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Code2 className="h-4 w-4" />
              </div>
              <div className="font-semibold text-heading">{cat.label}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cat.items.map((s) => (
                <span key={s} className="rounded-full bg-section text-heading px-2.5 py-1 text-xs font-medium border border-border group-hover:border-primary/30 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been" muted>
      <div className="relative border-l-2 border-border pl-8 space-y-10">
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative card-premium p-6 md:p-8"
          >
            <span className="absolute -left-[42px] top-8 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="font-semibold text-heading text-lg">{exp.role}</div>
                <div className="text-sm text-primary font-medium">{exp.org}</div>
                <div className="text-xs text-body mt-0.5">{exp.program}</div>
              </div>
              <div className="text-sm text-body">{exp.period}</div>
            </div>
            <ul className="mt-4 space-y-2 text-body text-sm">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-2"><span className="text-primary mt-1">•</span>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work" subtitle="A few things I've shipped end-to-end.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-[18px] p-[1.5px] bg-gradient-to-br from-border via-border to-border hover:from-primary hover:via-secondary hover:to-primary transition-all"
          >
            <div className="rounded-[16px] bg-white h-full flex flex-col overflow-hidden">
              <div className="aspect-[16/10] relative bg-gradient-to-br from-primary/15 via-secondary/15 to-primary/10 flex items-center justify-center overflow-hidden">
                <div className="text-5xl font-display font-bold text-heading/25 group-hover:scale-110 transition-transform duration-500">
                  {p.name[0]}
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-heading text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-body flex-1">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 6).map((t) => (
                    <span key={t} className="text-[10px] font-semibold uppercase tracking-wider rounded-md bg-section text-heading px-2 py-1 border border-border">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-heading hover:border-primary hover:text-primary transition-colors">
                    <GithubIcon className="h-3.5 w-3.5" /> Code
                  </a>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-heading text-white px-3 py-2 text-xs font-semibold hover:bg-primary transition-colors">
                    Demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Journey() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const loop = [...GALLERY, ...GALLERY];
  return (
    <Section id="journey" eyebrow="Gallery" title="Snapshots of my journey" subtitle="Moments from labs, stages and hackathons." muted>
      <div
        className="relative overflow-hidden group"
        onMouseEnter={(e) => e.currentTarget.querySelector<HTMLDivElement>("[data-track]")?.style.setProperty("animation-play-state", "paused")}
        onMouseLeave={(e) => e.currentTarget.querySelector<HTMLDivElement>("[data-track]")?.style.setProperty("animation-play-state", "running")}
      >
        <div data-track className="flex gap-6 animate-marquee w-max">
          {loop.map((g, i) => (
            <button
              key={i}
              onClick={() => setLightbox(g.drive)}
              className="relative flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(30,41,59,0.2)] hover:scale-[1.02] transition-transform"
            >
              <SmartImage
                src={g.drive}
                fallback={g.fallback}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-section to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-section to-transparent" />
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded-xl shadow-2xl" onError={(e) => { const g = GALLERY.find(x => x.drive === lightbox); if (g) (e.currentTarget as HTMLImageElement).src = g.fallback; }} />
        </div>
      )}
    </Section>
  );
}

function Contact() {
  const copy = (v: string) => {
    navigator.clipboard.writeText(v);
    toast.success("Copied to clipboard");
  };
  const items = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: MapPin, label: "Location", value: PROFILE.location, href: null },
    { icon: GithubIcon, label: "GitHub", value: "theresros", href: PROFILE.github },
    { icon: LinkedinIcon, label: "LinkedIn", value: "theresrose-vilsan", href: PROFILE.linkedin },
  ] as const;

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something" subtitle="I'm always happy to talk about roles, collaborations or interesting problems.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.button
            key={it.label}
            onClick={() => copy(it.value)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group text-left card-premium p-6 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(255,90,95,0.25)]"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <it.icon className="h-4 w-4" />
              </div>
              <Copy className="h-3.5 w-3.5 text-body opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4 text-xs uppercase tracking-wider text-body font-semibold">{it.label}</div>
            <div className="text-heading font-medium mt-0.5 break-all">{it.value}</div>
            {it.href && (
              <a href={it.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-medium">
                Open <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </motion.button>
        ))}
      </div>
    </Section>
  );
}
