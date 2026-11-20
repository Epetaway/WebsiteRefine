import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AccessError,
  fetchGatedContent,
  requestAccess,
  signIn,
  signOut,
  type GatedDocument,
} from "@/lib/accessApi";

type GateState<T> =
  | { kind: "checking" }
  | { kind: "locked"; message?: string }
  | { kind: "unavailable"; message: string }
  | { kind: "unlocked"; content: T; expiresAt: string };

type Props<T> = {
  document: GatedDocument;
  /** What the locked part contains, shown before sign-in. */
  preview: string[];
  children: (content: T) => ReactNode;
};

function formatExpiry(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

/**
 * Locks part of a page behind approved access. The locked content is fetched from the access API
 * after sign-in; it is never in this bundle. Flow: request → Earl approves by email → a generated
 * password arrives by email → sign in with email + password.
 */
export function AccessGate<T>({ document, preview, children }: Props<T>) {
  const [state, setState] = useState<GateState<T>>({ kind: "checking" });
  const [mode, setMode] = useState<"request" | "signin">("request");
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const unlockedHeading = useRef<HTMLHeadingElement>(null);
  const focusAfterUnlock = useRef(false);
  const ids = useId();

  const load = useCallback(async () => {
    const result = await fetchGatedContent<T>(document);
    setState(result);
  }, [document]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    if (state.kind === "unlocked" && focusAfterUnlock.current) {
      focusAfterUnlock.current = false;
      unlockedHeading.current?.focus();
    }
  }, [state.kind]);

  async function onRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setBusy(true);
    setStatus(null);
    try {
      const message = await requestAccess({
        document,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("company") ?? ""),
        reason: String(form.get("reason") ?? ""),
        website: String(form.get("website") ?? ""),
      });
      formElement.reset();
      setStatus({ tone: "ok", text: `${message} Approved requests get a password that works for 72 hours.` });
    } catch (error) {
      setStatus({ tone: "error", text: error instanceof AccessError ? error.message : "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function onSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setStatus(null);
    try {
      await signIn(document, String(form.get("email") ?? ""), String(form.get("password") ?? ""));
      focusAfterUnlock.current = true;
      await load();
    } catch (error) {
      setStatus({ tone: "error", text: error instanceof AccessError ? error.message : "Sign-in failed. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function onSignOut() {
    await signOut();
    setStatus(null);
    setState({ kind: "locked" });
  }

  if (state.kind === "checking") {
    return <section className="access-gate" aria-busy="true"><p className="access-gate__note">Checking access…</p></section>;
  }

  if (state.kind === "unlocked") {
    return (
      <>
        <div className="access-gate__bar">
          <h2 ref={unlockedHeading} tabIndex={-1} className="sr-only">Full engineering notes</h2>
          <span>Approved access · until {formatExpiry(state.expiresAt)}</span>
          <button type="button" className="access-gate__link" onClick={onSignOut}>Sign out</button>
        </div>
        {children(state.content)}
      </>
    );
  }

  const statusId = `${ids}-status`;

  return (
    <section className="access-gate" aria-labelledby={`${ids}-title`}>
      <span className="access-gate__eyebrow">Approved access</span>
      <h2 id={`${ids}-title`}>The full notes are shared on request.</h2>
      <p>They go deeper into a private codebase, so I share them with people evaluating my work. Request access and I'll review it personally. If it's approved, you'll get an email with a password that works for 72 hours.</p>
      <ul className="access-gate__preview" aria-label="Included in the full notes">{preview.map((item) => <li key={item}>{item}</li>)}</ul>

      {state.kind === "unavailable" ? (
        <p className="access-gate__note" role="status">
          {state.message} <a href="mailto:e@ehicksonjr.com?subject=Access%20to%20WithYou%20engineering%20notes">Email Earl</a>
        </p>
      ) : (
        <>
          {state.message && <p className="access-gate__note">{state.message}</p>}
          <div className="access-gate__modes" role="group" aria-label="Choose an option">
            <button type="button" aria-pressed={mode === "request"} onClick={() => { setMode("request"); setStatus(null); }}>Request access</button>
            <button type="button" aria-pressed={mode === "signin"} onClick={() => { setMode("signin"); setStatus(null); }}>I have a password</button>
          </div>

          {mode === "request" ? (
            <form className="access-gate__form" onSubmit={onRequest} aria-describedby={status ? statusId : undefined}>
              <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
              <label>Work email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
              <label>Company <small>(optional)</small><input name="company" autoComplete="organization" maxLength={120} /></label>
              <label>What are you evaluating? <small>(optional)</small><textarea name="reason" rows={3} maxLength={1000} /></label>
              {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
              <div className="access-gate__trap" aria-hidden="true">
                <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <button type="submit" className="button nb-button" disabled={busy}>{busy ? "Sending…" : "Request access"}</button>
            </form>
          ) : (
            <form className="access-gate__form" onSubmit={onSignIn} aria-describedby={status ? statusId : undefined}>
              <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
              <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={64} spellCheck={false} /></label>
              <button type="submit" className="button nb-button" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
            </form>
          )}
          <p id={statusId} className={`access-gate__status${status ? ` access-gate__status--${status.tone}` : ""}`} role="status">
            {status?.text}
          </p>
        </>
      )}
    </section>
  );
}
