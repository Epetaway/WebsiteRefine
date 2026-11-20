// The three emails in the flow: Earl's approve/deny request, the visitor's password, and a
// polite "not this time." Sent through SendGrid, which the site already uses for contact mail.
import sgMail from "@sendgrid/mail";
import { ACCESS, GATED_DOCUMENTS, type AccessEnv } from "./config.js";
import { signDecision, type Decision } from "./crypto.js";
import type { AccessRequestRow } from "./store.js";

export function escapeHtml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function decisionUrl(env: AccessEnv, requestId: string, action: Decision, expiresAt: number): string {
  const sig = signDecision(env.signingSecret, requestId, action, expiresAt);
  const query = new URLSearchParams({ id: requestId, action, exp: String(expiresAt), sig });
  return `${env.apiBaseUrl}/api/access/decide?${query}`;
}

function formatExpiry(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " ET";
}

export function createMailer(env: AccessEnv) {
  sgMail.setApiKey(env.sendgridApiKey);

  return {
    async sendOwnerRequest(request: AccessRequestRow) {
      const doc = GATED_DOCUMENTS[request.document];
      const linkExpires = Date.now() + ACCESS.decisionLinkTtlMs;
      const approve = decisionUrl(env, request.id, "approve", linkExpires);
      const deny = decisionUrl(env, request.id, "deny", linkExpires);
      const rows: [string, string | null][] = [
        ["Name", request.name],
        ["Email", request.email],
        ["Company", request.company],
        ["Why", request.reason],
      ];
      await sgMail.send({
        to: env.ownerEmail,
        from: env.fromEmail,
        replyTo: request.email,
        subject: `Access request: ${doc.title} — ${request.name}`,
        text: [
          `${request.name} asked to read ${doc.title}.`,
          ...rows.map(([label, value]) => `${label}: ${value ?? "—"}`),
          "",
          `Approve: ${approve}`,
          `Deny: ${deny}`,
          "",
          "Each link opens a confirmation page and works once. Links expire in 7 days.",
        ].join("\n"),
        html: `
          <p><strong>${escapeHtml(request.name)}</strong> asked to read <strong>${escapeHtml(doc.title)}</strong>.</p>
          <table cellpadding="6">${rows.map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value) || "—"}</td></tr>`).join("")}</table>
          <p>
            <a href="${approve}" style="display:inline-block;padding:10px 18px;background:#1a1422;color:#fff;text-decoration:none;border-radius:6px">Approve</a>
            &nbsp;
            <a href="${deny}" style="display:inline-block;padding:10px 18px;border:1px solid #1a1422;color:#1a1422;text-decoration:none;border-radius:6px">Deny</a>
          </p>
          <p style="color:#666;font-size:13px">Each link opens a confirmation page and works once. Links expire in 7 days.</p>`,
      });
    },

    async sendPassword(request: AccessRequestRow, password: string, expiresAt: Date) {
      const doc = GATED_DOCUMENTS[request.document];
      const url = `${env.siteUrl}${doc.path}`;
      await sgMail.send({
        to: request.email,
        from: env.fromEmail,
        replyTo: env.ownerEmail,
        subject: `Your access to ${doc.title}`,
        text: [
          `Hi ${request.name},`,
          "",
          `Thanks for your interest. You can now read ${doc.title}:`,
          url,
          "",
          `Email: ${request.email}`,
          `Password: ${password}`,
          "",
          `This password expires ${formatExpiry(expiresAt)}. If you need more time, request access again.`,
          "",
          "Earl Hickson Jr.",
        ].join("\n"),
        html: `
          <p>Hi ${escapeHtml(request.name)},</p>
          <p>Thanks for your interest. You can now read <a href="${url}">${escapeHtml(doc.title)}</a>.</p>
          <p>Email: ${escapeHtml(request.email)}<br>
          Password: <code style="font-size:16px;letter-spacing:1px">${password}</code></p>
          <p>This password expires ${formatExpiry(expiresAt)}. If you need more time, request access again.</p>
          <p>Earl Hickson Jr.</p>`,
      });
    },

    async sendDenied(request: AccessRequestRow) {
      const doc = GATED_DOCUMENTS[request.document];
      await sgMail.send({
        to: request.email,
        from: env.fromEmail,
        replyTo: env.ownerEmail,
        subject: `About your request for ${doc.title}`,
        text: [
          `Hi ${request.name},`,
          "",
          `Thanks for asking about ${doc.title}. I'm not able to share it right now.`,
          `The public case study is still available at ${env.siteUrl}/work/withyou, and you can reply to this email with any questions.`,
          "",
          "Earl Hickson Jr.",
        ].join("\n"),
      });
    },
  };
}

export type AccessMailer = ReturnType<typeof createMailer>;
