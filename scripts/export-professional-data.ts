import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fieldNotes } from "../client/src/data/fieldNotes";
import { investigations } from "../client/src/data/investigations";
import {
  capabilities,
  certifications,
  education,
  experience,
  professionalLinks,
  profile,
  research,
  teaching,
} from "../client/src/data/professional";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "resume", "content.json");

const documentData = {
  schemaVersion: 1,
  profile,
  links: professionalLinks,
  experience,
  education,
  certifications,
  capabilities,
  teaching,
  research,
  investigations: investigations.map((investigation) => ({
    slug: investigation.slug,
    name: investigation.name,
    theme: investigation.theme,
    question: investigation.question,
    status: investigation.status,
    role: investigation.role,
    product: investigation.abstract.product,
    stack: investigation.stack,
    evidence: investigation.evidence,
    limitations: investigation.limitations,
    proposedMethods: investigation.proposedMethods,
  })),
  selectedWriting: fieldNotes.map((note) => ({
    title: note.title,
    path: `/field-notes/${note.slug}`,
    theme: note.theme,
    date: note.date,
  })),
};

mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(documentData, null, 2)}\n`, "utf8");
process.stdout.write(`Wrote ${path.relative(root, output)}\n`);
