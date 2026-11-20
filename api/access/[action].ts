// Vercel serverless function for the gated-content flow: /api/access/{request,decide,login,content,logout}.
// All logic lives in server/access/handler.ts, which the Express dev server also mounts.
import type { IncomingMessage, ServerResponse } from "node:http";
import { handleAccess, type AccessRequest } from "../../server/access/handler.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const request = req as AccessRequest;
  const action = request.query?.action;
  await handleAccess(request, res, typeof action === "string" ? action : "");
}
