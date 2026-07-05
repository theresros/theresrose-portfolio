import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from "lucide-react";
import { listActivities, type Activity } from "@/lib/activities.functions";

const TYPE_COLORS: Record<string, string> = {
  Learning: "bg-primary", Coding: "bg-heading", Research: "bg-secondary",
  Presentation: "bg-primary/70", Meeting: "bg-body", Workshop: "bg-success",
  Hackathon: "bg-primary", Testing: "bg-secondary/80", Deployment: "bg-success/70",
};

function toISO(d: Date) {
  const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function MonthCalendar() {
  const list = useServerFn(listActivities);
  const { data: activities = [] } = useQuery({ queryKey: ["activities"], queryFn: () => list() });

  const [cursor, setCursor] = useState(() => {
    const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); return d;
  });

  const byDate = useMemo(() => {
    const m = new Map<string, Activity[]>();
    for (const a of activities) {
      const arr = m.get(a.activity_date) ?? []; arr.push(a); m.set(a.activity_date, arr);
    }
    return m;
  }, [activities]);

  const cells = useMemo(() => {
    const first = new Date(cursor);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const arr: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const todayISO = toISO(new Date());

  function shift(delta: number) {
    const d = new Date(cursor); d.setMonth(d.getMonth() + delta); setCursor(d);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-heading font-semibold">
          <CalIcon className="h-5 w-5 text-primary" /> Monthly task calendar
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => shift(-1)} className="p-2 rounded-lg border border-border hover:bg-section" aria-label="Previous month"><ChevronLeft className="h-4 w-4" /></button>
          <div className="text-sm font-semibold text-heading min-w-[140px] text-center">{monthLabel}</div>
          <button onClick={() => shift(1)} className="p-2 rounded-lg border border-border hover:bg-section" aria-label="Next month"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] uppercase tracking-wider text-body font-semibold mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="aspect-square rounded-lg" />;
          const key = toISO(d);
          const acts = byDate.get(key) ?? [];
          const isToday = key === todayISO;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.005 }}
              className={`aspect-square min-h-[64px] rounded-lg border p-1.5 flex flex-col text-left overflow-hidden ${isToday ? "border-primary bg-primary/5" : "border-border bg-white"}`}
            >
              <div className={`text-xs font-semibold ${isToday ? "text-primary" : "text-heading"}`}>{d.getDate()}</div>
              <div className="mt-1 flex-1 space-y-0.5 overflow-hidden">
                {acts.slice(0, 3).map((a) => (
                  <div key={a.id} title={`${a.activity_type} · ${a.title}`} className="flex items-center gap-1 min-w-0">
                    <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${TYPE_COLORS[a.activity_type] ?? "bg-primary"}`} />
                    <span className="truncate text-[10px] text-body">{a.title}</span>
                  </div>
                ))}
                {acts.length > 3 && <div className="text-[10px] text-body font-semibold">+{acts.length - 3} more</div>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}