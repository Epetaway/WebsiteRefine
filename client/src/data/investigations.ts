export type EvidenceStatus =
  | "IMPLEMENTED + INTEGRATED"
  | "IMPLEMENTED, NOT INTEGRATED"
  | "PARTIAL"
  | "DESIGNED"
  | "PLANNED"
  | "KNOWN GAP"
  | "VERIFIED LIVE"
  | "DEVELOPMENT-STAGE IMPLEMENTATION"
  | "CONCEPTUAL EDITORIAL ILLUSTRATION"
  | "IMPLEMENTATION CAPTURE";

export type Investigation = {
  slug: "withyou" | "dojonet" | "gundam-forge";
  number: string;
  name: string;
  theme: string;
  question: string;
  status: string;
  role: string;
  context: string;
  accent: string;
  accentSecondary: string;
  surface: string;
  previewImage: string;
  previewAlt: string;
  abstract: {
    product: string;
    problem: string;
    built: string;
    insight: string;
    remember: string;
  };
  argument: string;
  changedMind: string;
  humanContext: string[];
  tension: { label: string; detail: string }[];
  interactionDecision: string;
  technicalConsequence: string;
  implementation: { status: EvidenceStatus; claim: string }[];
  evidence: string[];
  limitations: string[];
  openQuestions: string[];
  proposedMethods: string[];
  stack: string[];
  captures: { src: string; alt: string; caption: string; label: EvidenceStatus }[];
};

const asset = (project: string, file: string) =>
  `/assets/projects/${project}/implementation/${file}`;

export const investigations: Investigation[] = [
  {
    slug: "withyou",
    number: "01",
    name: "WithYou",
    theme: "Relationships",
    question:
      "How might a shared digital space support intentional connection without replacing the conversations that matter?",
    status: "Beta-oriented implementation",
    role: "Solo product design, UX engineering, and full-stack development",
    context: "Private relationship application",
    accent: "#C65788",
    accentSecondary: "#C66043",
    surface: "#F2EDE3",
    previewImage: "/assets/projects/withyou/home-exhibit.webp",
    previewAlt: "WithYou product screens displayed on two mobile devices",
    abstract: {
      product:
        "A private relationship application exploring intentional connection, pairing, and field-level information visibility.",
      problem:
        "Shared software often treats connection as blanket permission, collapsing two people into one account model.",
      built:
        "A React Native and Express/PostgreSQL beta with invite-code pairing, private check-ins, field-level sharing controls, and a deterministic portfolio prototype.",
      insight: "Pairing creates connection. It does not automatically create permission.",
      remember:
        "A privacy model is only as strong as its least-consistent implementation path.",
    },
    argument: "Connection should not imply unrestricted access.",
    changedMind:
      "I originally thought the main design challenge was creating a shared experience. I eventually realized the harder challenge was creating a shared experience without erasing the individual people inside it.",
    humanContext: [
      "Relationship products operate inside a domain where closeness and privacy coexist. A partner may be trusted without being entitled to every thought, mood, or unfinished reflection.",
      "The central product problem was not how to share more. It was how to make sharing a legible, reversible decision inside a connected system.",
    ],
    tension: [
      { label: "Connection", detail: "The system should make participation feel mutual and intentional." },
      { label: "Individuality", detail: "Each person retains a private space inside the shared product." },
      { label: "Clarity", detail: "The partner result must match the sharing decision a person believes they made." },
    ],
    interactionDecision:
      "Every check-in begins privately. The person makes a field-level sharing decision, reviews the consequence, and sees a partner-safe result rather than assuming that pairing exposed the entry.",
    technicalConsequence:
      "The visibility model must be enforced consistently at the schema, service, API, and presentation layers. A compliant new route does not repair a legacy route that still exposes unconditional fields.",
    implementation: [
      { status: "IMPLEMENTED + INTEGRATED", claim: "Invite-code pairing requires deliberate participation from both people." },
      { status: "IMPLEMENTED + INTEGRATED", claim: "Newer check-in paths support field-level visibility controls." },
      { status: "KNOWN GAP", claim: "One legacy endpoint still exposes four fields using earlier unconditional sharing behavior." },
      { status: "IMPLEMENTED, NOT INTEGRATED", claim: "Some screens exist as components but are not wired into active navigation." },
      { status: "PARTIAL", claim: "There is no separate post-code approval step after the invite exchange." },
    ],
    evidence: [
      "Repository structure and integration behavior demonstrate a working mobile/backend beta.",
      "Implementation captures show active application surfaces; the portfolio prototype demonstrates the interaction argument using fictional data.",
      "Evidence supports implemented behavior, not therapeutic benefit or improved relationship outcomes.",
    ],
    proposedMethods: [
      "Scope-comprehension testing",
      "Scenario-based usability evaluation",
      "Interviews about privacy expectations",
    ],
    limitations: [
      "The legacy sharing path weakens otherwise more granular privacy controls.",
      "Implemented-but-unintegrated screens are not complete user workflows.",
      "No relationship outcome has been validated with a formal study.",
    ],
    openQuestions: [
      "How should consent change when an entry is edited after sharing?",
      "What is the least alarming way to communicate a revoked share?",
      "How should the system make legacy privacy behavior impossible to reintroduce?",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma"],
    captures: [
      { src: asset("withyou", "check-in.png"), alt: "WithYou development check-in screen with private fields", caption: "Daily check-in — private-by-default fields", label: "IMPLEMENTATION CAPTURE" },
      { src: asset("withyou", "sharing-toggle.png"), alt: "WithYou field sharing control", caption: "Field-level sharing decision", label: "IMPLEMENTATION CAPTURE" },
      { src: asset("withyou", "partner-view.png"), alt: "WithYou partner result screen", caption: "Partner result after an explicit share", label: "IMPLEMENTATION CAPTURE" },
    ],
  },
  {
    slug: "dojonet",
    number: "02",
    name: "DojoNet",
    theme: "Learning",
    question:
      "Can technology help people see their training without pretending it can replace the teacher?",
    status: "Active development",
    role: "Solo product design and frontend product development",
    context: "Martial arts learning system",
    accent: "#16B889",
    accentSecondary: "#E4AE3A",
    surface: "#E5DDCF",
    previewImage: "/assets/projects/dojonet/home-exhibit.webp",
    previewAlt: "DojoNet desktop dashboard and mobile application screens",
    abstract: {
      product:
        "A martial arts training journal and community product centered on practice history, reflection, and qualitative progression.",
      problem:
        "Completion counters can make learning look precise while hiding correction, consistency, context, and application under pressure.",
      built:
        "A React application with a training journal, technique history, reflection surfaces, and a portfolio prototype for recording a session.",
      insight:
        "Progression is a history of learning, practice, feedback, and increasing capability—not simply a list of completed items.",
      remember: "Progress is not the same thing as completion.",
    },
    argument: "Progress is not the same thing as completion.",
    changedMind:
      "I began by looking for a clean progress metric. Teaching made the flaw obvious: a student can repeat a technique many times without understanding when, why, or against whom it works.",
    humanContext: [
      "Learning in martial arts is embodied, social, and situational. Understanding purpose, receiving correction, building consistency, connecting movements, and applying them under pressure are different kinds of progress.",
      "A journal can support reflection and coaching, but only if the model resists turning a living practice into a checklist.",
    ],
    tension: [
      { label: "Motivation", detail: "Progress should be visible enough to sustain practice." },
      { label: "Honesty", detail: "The interface should not imply mastery from activity count alone." },
      { label: "Coaching", detail: "Student reflection should create a useful starting point for feedback." },
    ],
    interactionDecision:
      "A training entry records the technique, a qualitative stage, and a reflection. The resulting history shows change over time without calculating a false mastery percentage.",
    technicalConsequence:
      "The data model needs event history and context, not only a mutable completion field. Qualitative stages must remain understandable as states, not covertly become a score.",
    implementation: [
      { status: "DEVELOPMENT-STAGE IMPLEMENTATION", claim: "Practitioner-facing journal, profile, feed, and technique surfaces exist in the current application." },
      { status: "IMPLEMENTED + INTEGRATED", claim: "The portfolio prototype records a fictional session, stage, and reflection locally." },
      { status: "KNOWN GAP", claim: "A complementary instructor coaching workflow is not represented as complete." },
      { status: "PARTIAL", claim: "The current demo relies on browser-local persistence and demo-seeded data." },
    ],
    evidence: [
      "Development captures show a working React application and its student-facing journal surfaces.",
      "The prototype demonstrates the difference between qualitative stage history and percentage completion.",
      "The work does not establish that the model improves learning outcomes.",
    ],
    proposedMethods: [
      "Diary study",
      "Training-session observation",
      "Instructor interviews",
      "Comparative evaluation of completion versus qualitative progression",
    ],
    limitations: [
      "Instructor workflows require further design and implementation verification.",
      "The current demo persistence model is not a production learning record.",
      "Qualitative stages still require careful language to avoid becoming another hidden ranking system.",
    ],
    openQuestions: [
      "How should an instructor disagree with a learner's self-assessment without overwriting it?",
      "What belongs in a private training reflection versus a coach-visible note?",
      "Can progression be summarized without losing the learning history that gives it meaning?",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Browser-local persistence"],
    captures: [
      { src: asset("dojonet", "progression.png"), alt: "DojoNet qualitative technique progression screen", caption: "Four qualitative stages — no mastery percentage", label: "IMPLEMENTATION CAPTURE" },
      { src: asset("dojonet", "technique-detail.png"), alt: "DojoNet technique detail with notes and stage", caption: "Technique history and reflection", label: "IMPLEMENTATION CAPTURE" },
      { src: asset("dojonet", "student-view.png"), alt: "DojoNet student journal view", caption: "Student view; instructor complement remains a gap", label: "IMPLEMENTATION CAPTURE" },
    ],
  },
  {
    slug: "gundam-forge",
    number: "03",
    name: "Gundam Forge",
    theme: "Decision Support",
    question:
      "Does more information actually help a player decide—or just give them more to assemble themselves?",
    status: "Functional beta-oriented implementation",
    role: "Solo product design and full-stack product development",
    context: "Unofficial trading-card-game toolkit",
    accent: "#315CFF",
    accentSecondary: "#7957E8",
    surface: "#E4AE3A",
    previewImage: "/assets/projects/gundam-forge/home-exhibit.webp",
    previewAlt: "Gundam Forge playtesting interface",
    abstract: {
      product:
        "An independent, unofficial deck-building and playtesting application for the Gundam Card Game.",
      problem:
        "Large catalogs and rules documents provide information, but they do not necessarily help a player understand a decision while constructing a deck.",
      built:
        "A typed web application with a searchable card catalog, deck construction, continuous validation, deployment-dependent persistence, and a heuristic automated opponent.",
      insight:
        "Decision support should surface constraints during the decision, explain the consequence, and preserve the player's ability to choose a recovery.",
      remember: "More information does not automatically create better decisions.",
    },
    argument: "More information does not automatically create better decisions.",
    changedMind:
      "The project initially borrowed MTG-like format-legality conventions. I removed or reconsidered those patterns when they did not match the Gundam TCG mental model. A proven pattern is not automatically the right pattern when the domain changes.",
    humanContext: [
      "Deck building is a constraint-rich creative activity. The player is balancing card counts, resources, strategy, and incomplete knowledge of future matchups.",
      "A useful tool should reduce avoidable rule lookup without presenting one prescribed deck as the correct answer.",
    ],
    tension: [
      { label: "Freedom", detail: "The player should be able to explore imperfect ideas." },
      { label: "Constraints", detail: "Rules should become visible before they create downstream confusion." },
      { label: "Explanation", detail: "A warning should explain why and suggest recoveries without choosing one." },
    ],
    interactionDecision:
      "Validation runs as the deck changes. A warning identifies the card and count, explains the constraint, and clears when the player chooses a repair.",
    technicalConsequence:
      "The domain model, validator, UI status, and persistence layer must agree. A restriction represented in a type or dataset is not enforced until it participates in the active validation path.",
    implementation: [
      { status: "IMPLEMENTED + INTEGRATED", claim: "Card browsing, deck construction, count validation, and playtesting behavior exist." },
      { status: "IMPLEMENTED + INTEGRATED", claim: "A functional automated opponent uses game-state heuristics as a repeatable playtesting partner." },
      { status: "PARTIAL", claim: "Supabase-backed persistence is deployment-dependent." },
      { status: "DESIGNED", claim: "Ban/restricted-card support exists in the domain/type direction but is not fully enforced by the application." },
      { status: "KNOWN GAP", claim: "The product is deployable but not hosted at a verified public production URL." },
    ],
    evidence: [
      "Repository and capture evidence support the working deck, validation, and heuristic playtest behaviors.",
      "The portfolio prototype demonstrates warning, explanation, replacement, and recovery using fictional card data.",
      "The implementation does not establish competitive quality, official rules endorsement, or user outcome improvement.",
    ],
    proposedMethods: [
      "Comparative decision-task evaluation",
      "Think-aloud usability testing",
      "Interviews about warning comprehension and decision confidence",
    ],
    limitations: [
      "Official competitive ban/restriction coverage is incomplete.",
      "Public production hosting has not been verified.",
      "The heuristic opponent is a test partner, not generative AI or sophisticated competitive intelligence.",
    ],
    openQuestions: [
      "How much explanation helps before a warning becomes noise?",
      "When should an interface block an invalid action versus permit exploration?",
      "How can validation teach a domain model without turning into a rules manual?",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Vitest"],
    captures: [
      { src: asset("gundam-forge", "deck-builder.png"), alt: "Gundam Forge deck builder and legality status", caption: "Deck construction with persistent validation status", label: "IMPLEMENTATION CAPTURE" },
      { src: asset("gundam-forge", "validation.png"), alt: "Gundam Forge constraint warning detail", caption: "Constraint detail at the moment of decision", label: "IMPLEMENTATION CAPTURE" },
      { src: asset("gundam-forge", "battlefield.png"), alt: "Gundam Forge playtesting battlefield", caption: "Development-stage playtesting surface", label: "IMPLEMENTATION CAPTURE" },
    ],
  },
];

export const getInvestigation = (slug?: string) =>
  investigations.find((investigation) => investigation.slug === slug);
