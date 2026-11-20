// The gated part of the WithYou engineering notes. Served only by /api/access/content after an
// approved sign-in. Checked against the WithYou repository (TerrianAi/withyou @ 612da33) and its
// architecture decision records. Keep this file out of client imports.
import type { LockedEngineeringNotes } from "../../shared/engineeringNotes.js";

export const withYouEngineeringLocked: LockedEngineeringNotes = {
  lifecyclePatterns: [
    { id: "A", rule: "Belongs to the user and survives unpairing" },
    { id: "B", rule: "Belongs to the relationship and is removed when the couple unpairs" },
    { id: "C", rule: "Hard-deleted when the account is deleted" },
    { id: "D", rule: "Anonymized but kept for audit" },
  ],
  safetyPipeline: [
    { step: "detectRisk", does: "Checks the text for 11 risk categories and assigns a severity from 0 to 3." },
    { step: "decideAction", does: "Crisis and safety signals go to fixed resources, never to a model. Prompt injection gets a template. Blocked content gets a gentle message." },
    { step: "Filter input", does: "Trims and caps the text, and empties it defensively if the severity is high." },
    { step: "Provider", does: "OpenRouter, then Anthropic, then templates. The app still works with AI turned off or the monthly quota used up." },
    { step: "Validate output", does: "A Zod schema plus 6 output checks. Message rewrites must be exactly 3 versions, or the response is rejected." },
    { step: "Audit", does: "Records category, severity and action. The audit function's parameter type has no field for user text." },
  ],
  pipelineRules: [
    "AI is the last step, not the first. Deterministic checks run before a model is considered.",
    "The AI never auto-sends. It returns suggestions, and the author decides.",
    "A model is used only after it passes the eval harness: valid JSON, meaning preserved, crisis-miss rate of 0. openai/gpt-4o-mini is the current admitted model.",
  ],
  decisions: [
    {
      id: "monolith",
      source: "ADR-002",
      title: "A modular monolith, not microservices",
      context: "One developer, a beta of about 100 couples, one API instance, one database.",
      decision: "All 13 domain modules live in one deployable process, with logical boundaries instead of network calls.",
      gaveUp: "Modules share fate on deploy, and the AI-heavy endpoints can't scale separately from simple CRUD.",
      revisit: "When the beta needs multiple instances, or one module's load (most likely the AI gateway) grows much faster than the rest.",
    },
    {
      id: "missed",
      source: "ADR-007, replacing my own ADR-006",
      title: "“Missed” is calculated when read, never saved",
      context: "My first design used a scheduled job to change overdue commitments to status “missed.”",
      decision: "No process ever writes “missed.” The API returns isMissed when status is active and the due date has passed.",
      gaveUp: "A small calculation on every read. The final design handoff treated “missed” as tone (an amber dot, no badge), not a lifecycle state, so the scheduled job was solving a problem that didn't exist.",
    },
    {
      id: "sessions",
      source: "ADR-008",
      title: "Don't log everyone out to ship a security improvement",
      context: "I added per-device sessions so a lost phone could be signed out remotely. Tokens issued before the change had no session ID.",
      decision: "Older tokens keep working until they expire naturally, within 7 days at most. Every new token gets full revocation support.",
      gaveUp: "For up to 7 days, a device signed in before the deploy can't be remotely revoked. The gap is bounded and closes on its own.",
    },
    {
      id: "queue",
      source: "ADR-010",
      title: "Use the cron jobs I already have instead of adding a job queue",
      context: "Notifications needed retries and quiet-hours deferral. BullMQ or pg-boss were options.",
      decision: "Keep the cron scan that recalculates eligibility fresh on every run, and add a lightweight table only for retries and deferred sends.",
      gaveUp: "There's no “upcoming reminders” view. In exchange, a time-zone change or an unpairing between runs can't trigger a stale reminder.",
      revisit: "When a feature needs reminders scheduled for a specific future date that can be cancelled.",
    },
    {
      id: "deletion",
      source: "ADR-016",
      title: "Account deletion: soft-delete now, permanent purge later",
      context: "Deleting an account erased everything instantly, leaving no window for a legal hold or an accidental deletion.",
      decision: "Deletion takes effect for the user immediately and is permanently purged after 30 days. The check lives in one place, the JWT middleware every authenticated request passes through, not in each route.",
      gaveUp: "One extra indexed lookup per request, and a deleted user's email stays reserved until the purge.",
    },
    {
      id: "safety-audit",
      source: "ADR-014",
      title: "The safety audit trail can observe but never interfere",
      context: "The most serious safety events skip the model entirely, so they left almost no trace for later review.",
      decision: "A SafetyAssessment row is written after each safety decision and can never change it. If the write fails, the user still gets their safety response.",
      gaveUp: "Some duplication with an existing general audit log, rather than changing a shared model other features depend on.",
    },
  ],
  lessons: [
    {
      id: "font-scale",
      title: "Tab labels breaking mid-word at 200% font size",
      happened: "On a real Android device at 200% text size, “Connect” and “Guidance” rendered as “Conne / ct” and “Guida / nce.”",
      found: "Automated tests confirmed scaling was enabled but couldn't see how Android wraps a single word with no space to break on.",
      fix: "Two-word labels still grow onto two lines. Single words shrink on one line, with a floor so they stay readable. Re-verified at 200% in light and dark mode.",
      lesson: "Automated accessibility checks prove the wiring. Only a real device shows what the user sees.",
    },
    {
      id: "pause-sharing",
      title: "A privacy leak caught before merge",
      happened: "I moved partner-visible summaries into their own table so they could be retracted. The new read endpoints didn't respect “Pause sharing with partner.”",
      found: "A careful diff review before merge. The test suite didn't catch it.",
      fix: "Pause-sharing is now enforced on the new endpoints as well.",
      lesson: "When data moves, its privacy rules have to move with it. Every new read path needs checking against every existing privacy switch.",
    },
    {
      id: "deletion-gap",
      title: "A deletion feature that didn't fully do what it promised",
      happened: "While writing the decision record, I traced the transaction and found that older cleanup code hard-deletes messages moments after the soft-delete marker is set.",
      found: "Tracing the real behavior step by step for the ADR.",
      fix: "I documented the gap instead of shipping the feature as complete. A real fix means redesigning how shared relationship data is deleted, which is a product decision too.",
      lesson: "Writing the record is how I check my own work.",
    },
    {
      id: "safety-coverage",
      title: "Finding gaps in my own safety pipeline",
      happened: "Verifying the AI architecture doc against the code showed that two features skip the input-side risk checks, and a partner-privacy output check exists but isn't wired up.",
      found: "Checking each claim against main instead of trusting the earlier plan.",
      fix: "Both gaps are published in a coverage table and prioritized for hardening.",
      lesson: "A safety system is only as strong as its coverage. A table with red marks in it beats a claim that everything is protected.",
    },
  ],
  quality: [
    {
      status: "IMPLEMENTED + INTEGRATED",
      items: [
        "npm run qa before every merge: lint, design and accessibility contract tests, type-check, build, API tests",
        "78 API test files (Vitest + Supertest) against real PostgreSQL. If no database is reachable locally, the script starts an embedded one.",
        "19 mobile contract suites that enforce design-system, accessibility, privacy and safety rules in the source",
        "GitHub Actions on every push: lint, policy checks, build, tests against a PostgreSQL 16 container",
        "An AI eval harness with committed results; crisis-miss rate of 0 required",
      ],
    },
    {
      status: "PARTIAL",
      items: [
        "Accessibility verified on one Android device at 200% text size in light and dark mode",
        "Maestro end-to-end flows on a device or emulator",
      ],
    },
    {
      status: "KNOWN GAP",
      items: [
        "Live VoiceOver and TalkBack passes, Switch Control, a full contrast audit, and an iOS large-text pass",
        "Component-level rendering tests for the mobile UI",
        "A professional penetration test",
      ],
    },
  ],
  aiWorkflow: [
    "I own the product and the decisions: principles, design, scope and every trade-off in the decision records.",
    "I build with AI coding agents (Claude Code and GitHub Copilot) and split the work into roles like a team: frontend, backend, design-system keeper, QA lead, security reviewer.",
    "Agents work from a ranked source of truth. CLAUDE.md says which document wins when docs disagree, and lists what not to build: no scores, no streaks, no therapy claims.",
    "Verification isn't optional. The full suite runs before every merge, and I review diffs before merging. Two of the issues above were caught at that review step.",
  ],
  nextSteps: [
    "Close the two input-side safety gaps and wire up the partner-privacy output check",
    "Run live screen-reader passes on iOS and Android",
    "Decide what happens to a surviving partner's data when the other deletes their account, then fix the deletion flow to match",
    "Add rendered component tests for the mobile UI",
  ],
};
