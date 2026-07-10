#!/usr/bin/env node
// Generates the tailored resume variants (Markdown) from resume/content.json.
// Usage: node resume/generate.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(readFileSync(path.join(__dirname, "content.json"), "utf-8"));
const outDir = path.join(__dirname, "output");
mkdirSync(outDir, { recursive: true });

function renderVariant(key) {
  const { person, variants, skills, experience, education, projects, areasOfInterest, footer } = content;
  const variant = variants[key];
  const lines = [];

  lines.push(`# ${person.name}`, "");
  lines.push(variant.resumeTitle, "");
  lines.push(`${person.location} · ${person.email} · ${person.site} · ${person.github} · ${person.linkedin}`, "");

  lines.push(...variant.summary, "");

  lines.push("## Core Skills", "");
  for (const group of skills[key]) {
    lines.push(`**${group.group}:** ${group.items.join(", ")}`, "");
  }

  lines.push("## Experience", "");
  for (const job of experience) {
    const bullets = job.bullets[key];
    if (!bullets || bullets.length === 0) continue;
    const heading = job.title
      ? `**${job.company}** — ${job.title} *(${job.start} – ${job.end})*`
      : `**${job.company}** *(${job.start} – ${job.end})*`;
    lines.push(heading, "");
    if (job.note) lines.push(`*${job.note}*`, "");
    for (const bullet of bullets) lines.push(`- ${bullet}`);
    lines.push("");
  }

  lines.push("## Education & Certifications", "");
  for (const item of education[key]) {
    lines.push(`**${item.degree}**`, "");
    lines.push(item.date ? `${item.org} · ${item.date}` : item.org, "");
    if (item.note) lines.push(`*${item.note}*`, "");
    lines.push("");
  }

  lines.push("## Selected Projects", "");
  for (const project of projects[key]) {
    lines.push(`**${project.name}** — ${project.stack}`, "");
    lines.push(`- ${project.description}`, "");
  }

  if (areasOfInterest[key]) {
    lines.push("## Selected Areas of Interest", "");
    lines.push(areasOfInterest[key].join(" · "), "");
  }

  if (footer[key]) {
    lines.push(footer[key]);
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

for (const key of Object.keys(content.variants)) {
  const markdown = renderVariant(key);
  const outPath = path.join(outDir, `${content.variants[key].fileBaseName}.md`);
  writeFileSync(outPath, markdown, "utf-8");
  console.log(`wrote ${path.relative(process.cwd(), outPath)}`);
}
