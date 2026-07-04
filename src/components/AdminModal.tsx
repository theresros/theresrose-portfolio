import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/lib/admin-context";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export function AdminModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await login(password);
    setBusy(false);
    if (res.ok) {
      toast.success("Welcome back, Admin");
      setPassword("");
      onClose();
    } else {
      toast.error(res.error || "Incorrect password");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm rounded-[18px]">
        <DialogHeader>
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Lock className="h-5 w-5" />
          </div>
          <DialogTitle className="text-center">Admin Login</DialogTitle>
          <DialogDescription className="text-center">
            Enter your password to manage the PM-VIKAS calendar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 pt-2">
          <Input
            autoFocus
            type="password"
            placeholder="enter your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl h-11"
          />
          <Button type="submit" disabled={busy || !password} className="w-full rounded-xl h-11 bg-primary hover:bg-primary/90 text-white">
            {busy ? "Verifying…" : "Enter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}