import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil, X, Calendar as CalIcon } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  listActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  type Activity,
} from "@/lib/activities.functions";

const ACTIVITY_TYPES = [
  "Learning", "Coding", "Research", "Presentation",
  "Meeting", "Workshop", "Hackathon", "Testing", "Deployment",
];

const TYPE_COLORS: Record<string, string> = {
  Learning: "bg-primary", Coding: "bg-heading", Research: "bg-secondary",
  Presentation: "bg-primary/70", Meeting: "bg-body", Workshop: "bg-success",
  Hackathon: "bg-primary", Testing: "bg-secondary/80", Deployment: "bg-success/70",
};

function toISODate(d: Date) {
  const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBack(n: number) {
  const arr: Date[] = [];
  const today = new Date(); today.setHours(0,0,0,0);
  // align to Sunday start of week; produce n weeks * 7 days ending today
  const end = new Date(today);
  const start = new Date(today);
  start.setDate(start.getDate() - (n * 7 - 1));
  // shift start back to previous Sunday
  start.setDate(start.getDate() - start.getDay());
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) arr.push(new Date(d));
  return arr;
}

export function ActivityCalendar() {
  const qc = useQueryClient();

  const list = useServerFn(listActivities);
  const create = useServerFn(createActivity);
  const update = useServerFn(updateActivity);
  const remove = useServerFn(deleteActivity);

  const { data: activities = [] } = useQuery({
    queryKey: ["activities"],
    queryFn: () => list(),
  });

  const byDate = useMemo(() => {
    const m = new Map<string, Activity[]>();
    for (const a of activities) {
      const k = a.activity_date;
      const arr = m.get(k) ?? [];
      arr.push(a); m.set(k, arr);
    }
    return m;
  }, [activities]);

  const days = useMemo(() => daysBack(20), []);

  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [form, setForm] = useState({ type: "Learning", title: "", description: "", status: "completed" });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["activities"] });

  const createMut = useMutation({
    mutationFn: (payload: { activity_date: string; activity_type: string; title: string; description?: string; status?: string }) =>
      create({ data: payload }),
    onSuccess: () => { toast.success("✅ Activity added successfully"); invalidate(); resetForm(); },
    onError: (e: Error) => toast.error(`❌ ${e.message === "Unauthorized" ? "Please log in as admin" : "Add failed"}`),
  });

  const updateMut = useMutation({
    mutationFn: (payload: { id: string; activity_type?: string; title?: string; description?: string; status?: string }) =>
      update({ data: payload }),
    onSuccess: () => { toast.success("✅ Activity updated successfully"); invalidate(); resetForm(); },
    onError: () => toast.error("❌ Update failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => { toast.success("✅ Activity deleted"); invalidate(); },
    onError: () => toast.error("❌ Delete failed"),
  });

  function resetForm() {
    setEditing(null);
    setForm({ type: "Learning", title: "", description: "", status: "completed" });
  }

  function openDay(date: string) {
    setSelected(date);
    setEditing(null);
    setForm({ type: "Learning", title: "", description: "", status: "completed" });
  }

  function submit() {
    if (!selected) return;
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (editing) {
      updateMut.mutate({ id: editing.id, activity_type: form.type, title: form.title, description: form.description, status: form.status });
    } else {
      createMut.mutate({ activity_date: selected, activity_type: form.type, title: form.title, description: form.description, status: form.status });
    }
  }

  function startEdit(a: Activity) {
    setEditing(a);
    setForm({ type: a.activity_type, title: a.title, description: a.description ?? "", status: a.status });
  }

  const dayActivities = selected ? byDate.get(selected) ?? [] : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-heading font-semibold">
          <CalIcon className="h-5 w-5 text-primary" /> Contribution grid — last 20 weeks
        </div>
        <div className="flex items-center gap-3 text-xs text-body">
          <span>Less</span>
          <div className="flex gap-1">
            {[0,1,2,3,4].map(l => (
              <div key={l} className={`h-3 w-3 rounded-[3px] ${l === 0 ? "bg-section border border-border" : l === 1 ? "bg-primary/25" : l === 2 ? "bg-primary/50" : l === 3 ? "bg-primary/75" : "bg-primary"}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-grid grid-flow-col grid-rows-7 gap-1.5 auto-cols-max">
          {days.map((d) => {
            const key = toISODate(d);
            const acts = byDate.get(key) ?? [];
            const level = Math.min(4, acts.length);
            const cls = level === 0 ? "bg-section border border-border hover:border-primary" :
              level === 1 ? "bg-primary/25 hover:bg-primary/40" :
              level === 2 ? "bg-primary/50 hover:bg-primary/70" :
              level === 3 ? "bg-primary/75 hover:bg-primary" : "bg-primary hover:bg-primary/90";
            return (
              <button
                key={key}
                onClick={() => openDay(key)}
                title={`${key} · ${acts.length} activit${acts.length === 1 ? "y" : "ies"}`}
                className={`h-4 w-4 rounded-[4px] transition-all hover:scale-125 ${cls}`}
              />
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="sm:max-w-lg rounded-[18px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalIcon className="h-4 w-4 text-primary" />
              {selected && new Date(selected + "T00:00").toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            <AnimatePresence>
              {dayActivities.length === 0 && (
                <p className="text-sm text-body italic">No activities logged for this day.</p>
              )}
              {dayActivities.map((a) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border bg-white"
                >
                  <span className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${TYPE_COLORS[a.activity_type] ?? "bg-primary"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{a.activity_type}</span>
                      <span className="text-xs text-body">· {a.status}</span>
                    </div>
                    <div className="font-medium text-heading text-sm">{a.title}</div>
                    {a.description && <div className="text-xs text-body mt-0.5">{a.description}</div>}
                  </div>
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(a)} className="p-1.5 rounded-md hover:bg-section text-body hover:text-heading" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => deleteMut.mutate(a.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-body hover:text-destructive" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-heading">{editing ? "Edit activity" : "Add activity"}</div>
                {editing && (
                  <button onClick={resetForm} className="text-xs text-body hover:text-heading inline-flex items-center gap-1">
                    <X className="h-3 w-3" /> Cancel edit
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger className="rounded-lg h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger className="rounded-lg h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. ESP32 sensor calibration" className="rounded-lg h-10" />
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional notes" className="rounded-lg min-h-[80px]" />
              </div>
              <Button onClick={submit} disabled={createMut.isPending || updateMut.isPending} className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white">
                <Plus className="h-4 w-4 mr-1" /> {editing ? "Save changes" : "Add activity"}
              </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function CalendarStats() {
  const list = useServerFn(listActivities);
  const { data: activities = [] } = useQuery({ queryKey: ["activities"], queryFn: () => list() });

  const stats = useMemo(() => {
    const total = activities.length;
    const now = new Date();
    const thisMonth = activities.filter((a) => {
      const d = new Date(a.activity_date + "T00:00");
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const daysSet = new Set(activities.map((a) => a.activity_date));
    const active = daysSet.size;
    const completed = activities.filter((a) => a.status === "completed").length;
    const completion = total ? Math.round((completed / total) * 100) : 0;
    // longest streak
    const dates = [...daysSet].sort();
    let longest = 0, current = 0, prev: Date | null = null;
    for (const d of dates) {
      const cur = new Date(d + "T00:00");
      if (prev && (cur.getTime() - prev.getTime()) === 86400000) current++;
      else current = 1;
      if (current > longest) longest = current;
      prev = cur;
    }
    return { total, thisMonth, longest, active, completion };
  }, [activities]);

  const items = [
    { label: "Total Activities", value: stats.total },
    { label: "This Month", value: stats.thisMonth },
    { label: "Longest Streak", value: stats.longest, suffix: " days" },
    { label: "Active Days", value: stats.active },
    { label: "Completion", value: stats.completion, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="card-premium p-5"
        >
          <div className="text-xs uppercase tracking-wider text-body font-semibold">{s.label}</div>
          <div className="mt-2 text-3xl font-bold text-heading font-display">
            <CountUp to={s.value} />{s.suffix ?? ""}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useMemo(() => {
    let raf = 0; const start = performance.now(); const dur = 900;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    if (typeof window !== "undefined") raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}</>;
}