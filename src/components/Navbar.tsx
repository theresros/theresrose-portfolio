import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, ShieldCheck, Menu, X } from "lucide-react";
import { AdminModal } from "@/components/AdminModal";
import { useAdmin } from "@/lib/admin-context";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/pm-vikas", label: "PM-VIKAS" },
  { to: "/achievements", label: "Achievements" },
  { to: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { isAdmin, logout } = useAdmin();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "glass-dark shadow-[0_4px_24px_-8px_rgba(30,41,59,0.08)]" : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-lg tracking-tight text-heading">
            Theresrose<span className="text-primary">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-body hover:text-heading transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success px-3 py-1 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Admin Active
                </span>
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center gap-1.5 text-sm text-body hover:text-heading"
                  aria-label="Log out admin"
                >
                  <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-heading text-white px-4 py-2 text-sm font-medium hover:bg-heading/90 transition-colors"
              >
                <LogIn className="h-4 w-4" /> Login
              </button>
            )}
            <button
              onClick={() => setMobile((v) => !v)}
              className="md:hidden p-2 rounded-lg text-heading hover:bg-section"
              aria-label="Toggle menu"
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass-dark border-t border-border px-5 py-4 space-y-3"
          >
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobile(false)}
                className="block text-sm font-medium text-heading py-1.5"
              >
                {n.label}
              </Link>
            ))}
            {!isAdmin && (
              <button
                onClick={() => { setMobile(false); setOpen(true); }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-heading text-white px-4 py-2 text-sm font-medium"
              >
                <LogIn className="h-4 w-4" /> Login
              </button>
            )}
            {isAdmin && (
              <div className="flex items-center gap-2 text-sm text-success">
                <ShieldCheck className="h-4 w-4" /> Admin active
              </div>
            )}
          </motion.div>
        )}
      </motion.header>
      <AdminModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}