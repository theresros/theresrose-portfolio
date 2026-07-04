import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  muted = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", muted && "bg-section", className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-12 md:mb-16"
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {eyebrow}
              </div>
            )}
            {title && <h2 className="mt-4 text-3xl md:text-5xl font-bold text-heading">{title}</h2>}
            {subtitle && <p className="mt-4 text-base md:text-lg text-body">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}