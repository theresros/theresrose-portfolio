import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Cpu, Radio, Network, Wrench, GraduationCap, Target, CheckCircle2, Rocket, BookOpen,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Blobs } from "@/components/Blobs";
import { ActivityCalendar, CalendarStats } from "@/components/ActivityCalendar";
import { MonthCalendar } from "@/components/MonthCalendar";
import { PMVIKAS } from "@/lib/data";

export const Route = createFileRoute("/pm-vikas")({
  head: () => ({
    meta: [
      { title: "PM-VIKAS Internship Dashboard — Theresrose Vilsan" },
      { name: "description", content: "PM-VIKAS IoT Assistant internship at IIIT Kottayam — overview, modules, learning outcomes and a live activity tracker." },
      { property: "og:title", content: "PM-VIKAS Internship — Theresrose Vilsan" },
      { property: "og:description", content: "Live tracker for the PM-VIKAS IoT Assistant programme at IIIT Kottayam." },
    ],
  }),
  component: PmVikasPage,
});

const SKILLS = [
  { icon: Cpu, label: "Embedded Systems" },
  { icon: Radio, label: "Sensors" },
  { icon: Cpu, label: "Microcontrollers" },
  { icon: Network, label: "IoT" },
  { icon: Network, label: "Networking" },
  { icon: Wrench, label: "Hardware" },
  { icon: Rocket, label: "Software Integration" },
  { icon: Wrench, label: "Troubleshooting" },
];

function PmVikasPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 bg-hero-glow">
        <Blobs />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-heading">
            <GraduationCap className="h-3.5 w-3.5 text-primary" /> Internship Dashboard
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-heading tracking-tight max-w-3xl">
            {PMVIKAS.program}
          </h1>
          <p className="mt-4 text-lg text-body max-w-2xl">
            {PMVIKAS.role} · {PMVIKAS.institute}
          </p>
        </div>
      </section>

      <Section muted>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 card-premium p-8">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <BookOpen className="h-4 w-4" /> Overview
            </div>
            <p className="mt-4 text-body leading-relaxed">{PMVIKAS.overview}</p>
          </div>
          <div className="card-premium p-8">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Target className="h-4 w-4" /> Objectives
            </div>
            <ul className="mt-4 space-y-2 text-sm text-body">
              {PMVIKAS.objectives.map((o, i) => (
                <li key={i} className="flex gap-2"><span className="text-primary mt-1">•</span>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 card-premium p-8">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <CheckCircle2 className="h-4 w-4" /> Learning Outcomes
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {PMVIKAS.outcomes.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-section"
              >
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-heading">{o}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Modules" title="What I'm learning" subtitle="Core modules of the IoT Assistant curriculum.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PMVIKAS.modules.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="card-premium p-5 hover:border-primary/40"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Cpu className="h-4 w-4" />
              </div>
              <div className="mt-3 font-semibold text-heading">{m.name}</div>
              <p className="mt-1 text-xs text-body">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Skills" title="Skills learned" muted>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <s.icon className="h-6 w-6 text-primary mx-auto" />
              <div className="mt-2 text-sm font-semibold text-heading">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="tracker" eyebrow="Live Tracker" title="Daily activity calendar" subtitle="A GitHub-style contribution grid tracking every learning day of the internship.">
        <div className="mb-10">
          <CalendarStats />
        </div>
        <div className="card-premium p-6 md:p-8">
          <ActivityCalendar />
        </div>
        <div className="card-premium p-6 md:p-8 mt-6">
          <MonthCalendar />
        </div>
      </Section>
    </div>
  );
}