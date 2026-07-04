import { createServerFn } from "@tanstack/react-start";

export type Activity = {
  id: string;
  activity_date: string;
  activity_type: string;
  title: string;
  description: string | null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export const listActivities = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("daily_activities")
    .select("*")
    .order("activity_date", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return (data ?? []) as Activity[];
});

export const createActivity = createServerFn({ method: "POST" })
  .inputValidator((data: {
    activity_date: string;
    activity_type: string;
    title: string;
    description?: string;
    status?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./gate.server");
    await assertAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("daily_activities")
      .insert({
        activity_date: data.activity_date,
        activity_type: data.activity_type,
        title: data.title,
        description: data.description ?? null,
        status: data.status ?? "completed",
        created_by: "admin",
      })
      .select()
      .single();
    if (error) throw error;
    return row as Activity;
  });

export const updateActivity = createServerFn({ method: "POST" })
  .inputValidator((data: {
    id: string;
    activity_type?: string;
    title?: string;
    description?: string;
    status?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./gate.server");
    await assertAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...patch } = data;
    const { data: row, error } = await supabaseAdmin
      .from("daily_activities")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return row as Activity;
  });

export const deleteActivity = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { assertAdmin } = await import("./gate.server");
    await assertAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("daily_activities")
      .delete()
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });