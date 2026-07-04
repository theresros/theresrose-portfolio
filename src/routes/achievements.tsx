import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, ExternalLink, Trophy } from "lucide-react";
import { Section } from "@/components/Section";
import { Blobs } from "@/components/Blobs";
import { ACHIEVEMENTS } from "@/lib/data";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Theresrose Vilsan" },
      { name: "description", content: "Awards, certifications and recognitions earned by Theresrose Vilsan across engineering, data analytics and design competitions." },
      { property: "og:title", content: "Achievements — Theresrose Vilsan" },
      { property: "og:description", content: "Hackathon wins, ISRO placements, Google Data Analytics and more." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 bg-hero-glow">
        <Blobs />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-heading">
            <Trophy className="h-3.5 w-3.5 text-primary" /> Recognitions & wins
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-heading tracking-tight">
            Achievements
          </h1>
          <p className="mt-4 text-lg text-body max-w-2xl">
            A collection of milestones from hackathons, national competitions, certifications and community work.
          </p>
        </div>
      </section>

      <Section muted>
        <div className="relative border-l-2 border-border pl-8 md:pl-10 space-y-8">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative group"
            >
              <span className="absolute -left-[42px] md:-left-[50px] top-6 h-5 w-5 rounded-full bg-gradient-to-br from-primary to-secondary ring-4 ring-primary/20" />
              <div className="rounded-[20px] p-[1.5px] bg-gradient-to-br from-border to-border group-hover:from-primary group-hover:to-secondary transition-all">
                <div className="rounded-[18px] bg-white p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-heading text-lg md:text-xl">{a.title}</h3>
                        <div className="text-sm text-primary font-medium mt-1">{a.org}</div>
                        {a.year && <div className="text-xs text-body mt-0.5">{a.year}</div>}
                      </div>
                    </div>
                    {a.certificate ? (
                      <a
                        href={a.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-heading text-white px-4 py-2 text-xs font-semibold hover:bg-primary transition-colors"
                      >
                        View Certificate <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-body italic">No certificate</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}