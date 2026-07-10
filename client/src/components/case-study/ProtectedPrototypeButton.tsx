import { useEffect, useRef, useState, type FormEvent } from "react";
import { Lock, LockOpen, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UNLOCK_STORAGE_KEY = "prototype-access-expiry";
const DEFAULT_TTL_MINUTES = 30;

function isUnlocked(): boolean {
  const raw = localStorage.getItem(UNLOCK_STORAGE_KEY);
  if (!raw) return false;
  const expiry = Number(raw);
  return Number.isFinite(expiry) && Date.now() < expiry;
}

type ProtectedPrototypeButtonProps = {
  url: string;
  /** Button text. Defaults to "View Prototype". */
  label?: string;
  /** Optional hover tooltip with extra context about the prototype. */
  description?: string;
  className?: string;
};

/**
 * Reusable, password-gated CTA for any case study with a prototype link.
 * The password is checked server-side (POST /api/prototype-access) against
 * PROTOTYPE_ACCESS_PASSWORD so it never ships in the client bundle. A
 * successful check unlocks every prototype on the site for a time-limited
 * window (localStorage timestamp), after which the password is required
 * again. On success the prototype opens in a new tab.
 */
export function ProtectedPrototypeButton({
  url,
  label = "View Prototype",
  description,
  className = "",
}: ProtectedPrototypeButtonProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUnlocked(isUnlocked());
  }, []);

  const handleClick = () => {
    if (isUnlocked()) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setError(null);
    setPassword("");
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/prototype-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(body.error ?? "Incorrect password. Try again.");
        setPassword("");
        inputRef.current?.focus();
        return;
      }

      const ttlMinutes = typeof body.ttlMinutes === "number" ? body.ttlMinutes : DEFAULT_TTL_MINUTES;
      localStorage.setItem(UNLOCK_STORAGE_KEY, String(Date.now() + ttlMinutes * 60_000));
      setUnlocked(true);
      setOpen(false);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title={description}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--cs-text-primary,#F5F5F5)] border border-[var(--cs-border-strong,#363C42)] bg-[var(--cs-surface,#1A1A1A)] transition-all hover:-translate-y-0.5 hover:border-[var(--case-accent,#8057FF)] hover:shadow-lg ${className}`}
      >
        {unlocked ? <LockOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        {label}
      </button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setError(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password required
            </DialogTitle>
            <DialogDescription>
              This prototype is password-protected. Enter the password to open it in a new tab.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prototype-password">Password</Label>
              <Input
                id="prototype-password"
                ref={inputRef}
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={submitting || !password}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                "Unlock"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
