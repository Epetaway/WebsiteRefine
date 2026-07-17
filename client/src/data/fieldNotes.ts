export type FieldNoteSection = {
  heading?: string;
  kind: "Personal experience" | "Project fact" | "Interpretation" | "Proposed research";
  paragraphs: string[];
  points?: string[];
  references?: { label: string; href: string }[];
};

export type FieldNote = {
  slug: string;
  number: string;
  title: string;
  theme: "Learning" | "Relationships" | "Decision Support";
  themeColor: string;
  claim: string;
  summary: string;
  date: string;
  datePublished: string;
  readingTime: string;
  sections: FieldNoteSection[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: fieldNoteSlugs[0],
    number: "01",
    title: "Teaching Jiu-Jitsu Changed the Way I Think About UX",
    theme: "Learning",
    themeColor: "#16B889",
    claim: "Learning is not information transfer.",
    summary:
      "How teaching martial arts changed the way I understand feedback, progression, and what it means to help someone build a capability.",
    date: "July 14, 2026",
    datePublished: "2026-07-14",
    readingTime: "8 min",
    sections: [
      {
        kind: "Personal experience",
        paragraphs: [
          "The first time I realized a student understood my explanation but still could not perform the technique, I had to reconsider what I meant by teaching.",
          "I had explained the grip, the hip movement, and the angle. She could repeat the mechanics back to me. Then we drilled it, and the pieces were present without becoming the technique itself. I had transferred information. I had not taught anything.",
        ],
      },
      {
        heading: "What a coach actually does",
        kind: "Interpretation",
        paragraphs: [
          "A beginner cannot absorb a whole technique at once. A coach shows the grip, watches the attempt, adds the next piece, and changes the explanation in response to the person in front of them. Good coaches practice progressive disclosure without naming it as a design pattern.",
          "Software does not read hesitation in real time. It has to anticipate what someone is ready for, and it often guesses badly by showing everything and calling the resulting overwhelm power.",
        ],
      },
      {
        heading: "The stages between learned and done",
        kind: "Interpretation",
        paragraphs: [
          "Learning a technique is not a single event. Seeing it, describing it, drilling it, recognizing it under pressure, and adapting it in a new context are different capabilities.",
          "When I began DojoNet, a completion bar felt obvious. Using it against my own training exposed the flaw: a count can tell me that I drilled an armbar many times while hiding that I still lose the position in live practice.",
        ],
        points: [
          "Seen — the movement has been introduced.",
          "Practiced — the motion works in a controlled drill.",
          "Recognized — the opening becomes visible under pressure.",
          "Adapted — the principle can transfer to an unfamiliar context.",
        ],
      },
      {
        heading: "The journal came from the mat",
        kind: "Project fact",
        paragraphs: [
          "DojoNet's structured journal came from needing a more honest observation than done or not done. Qualitative stages give a practitioner language for their present understanding without pretending to calculate mastery.",
          "Structure can make reflection possible when energy and vocabulary are limited. Ask how a round went and the answer may be fine. Ask what worked and what was missed, and there is something a coach can use.",
        ],
      },
      {
        heading: "What remains uncertain",
        kind: "Proposed research",
        paragraphs: [
          "The four-stage model is still a design hypothesis shaped by my own practice. Whether other practitioners experience it as support or constraint requires observation and diary study. That study has not happened yet.",
          "What I can say is that good instruction and good interfaces share a responsibility: create the conditions under which understanding can become action.",
        ],
      },
    ],
  },
  {
    slug: fieldNoteSlugs[1],
    number: "02",
    title: "Designing Consent Into Digital Products",
    theme: "Relationships",
    themeColor: "#C65788",
    claim: "Consent should be part of the interaction model, not a paragraph in the privacy policy.",
    summary:
      "What building a relationship-centered application taught me about the difference between a privacy promise and a privacy architecture.",
    date: "July 14, 2026",
    datePublished: "2026-07-14",
    readingTime: "10 min",
    sections: [
      {
        kind: "Personal experience",
        paragraphs: [
          "I initially thought the hard problem was building a shared experience. The implementation forced me to realize that the harder question was deciding what should not automatically become shared.",
          "WithYou made consent concrete—not only as a legal concept or a settings page, but as an engineering constraint.",
        ],
      },
      {
        heading: "What consent actually is",
        kind: "Interpretation",
        paragraphs: [
          "Many products treat consent as a sentence: a disclosure, a banner, or a toggle buried in settings. But either the system prevents information from crossing a boundary without an explicit scope, or the copy is a promise the code cannot keep.",
          "A check-in can contain a win, something hard, a feeling, and a request for support. Those are emotionally different facts. A single share-with-partner switch collapses differences the product should preserve.",
        ],
      },
      {
        heading: "Field-level visibility",
        kind: "Project fact",
        paragraphs: [
          "The design direction became field-level visibility. Agreeing to share a mood is not the same as agreeing to share the experience behind it. The schema, service, API, and interface all need to hold that distinction.",
          "This is why trust is an engineering problem. A private field included in a partner response is not repaired by better privacy copy. The implementation path has already broken the promise.",
        ],
      },
      {
        heading: "What I got wrong",
        kind: "Project fact",
        paragraphs: [
          "The invite-code flow does not include a separate approval step after the code exchange. Pairing requires deliberate participation from both people, but the current flow could explain the consequence more carefully.",
          "A legacy endpoint also exposes four fields using the earlier unconditional behavior. The newer sharing model is more granular, but a privacy model is only as strong as its least-consistent path.",
        ],
      },
      {
        heading: "Formal comprehension is future work",
        kind: "Proposed research",
        paragraphs: [
          "I can make privacy choices visible. I still need to learn whether people interpret those choices as intended. Does summary-only feel clear? Does additional granularity create control or anxiety?",
          "Those are research questions, not implementation facts. Scope-comprehension testing is future work, and the site does not present it as completed.",
        ],
      },
    ],
  },
  {
    slug: fieldNoteSlugs[2],
    number: "03",
    title: "What Trading Card Games Teach Us About Information Architecture",
    theme: "Decision Support",
    themeColor: "#315CFF",
    claim: "More information does not necessarily create more understanding.",
    summary:
      "Why access to information is not the same as being able to use it—and what a physical card table reveals about how people think.",
    date: "July 14, 2026",
    datePublished: "2026-07-14",
    readingTime: "9 min",
    sections: [
      {
        kind: "Personal experience",
        paragraphs: [
          "Watch someone build a deck at a physical table. They sort cards into piles, fan duplicates, arrange a cost curve, and cluster synergies. The table is an information architecture: spatial, glanceable, and persistent.",
          "Many digital deck builders discard that evolved practice for a sortable list, then add more panels when the tool still does not feel useful.",
        ],
      },
      {
        heading: "The fragmentation problem",
        kind: "Interpretation",
        paragraphs: [
          "The rulebook, card catalog, restrictions, and remembered combinations often live in separate places. Consolidating them into one crowded panel does not solve fragmentation; it only moves it.",
          "Gundam Forge instead tries to surface a constraint when it becomes relevant. The question is not how to show all the information, but when each piece matters.",
        ],
      },
      {
        heading: "Recognition over recall",
        kind: "Interpretation",
        paragraphs: [
          "Recall asks a player to remember a rule while balancing many other variables. Recognition turns that burden into a visible cue: this card has a warning, this count is too high, this deck is one card short.",
          "Physical arrangements create recognition conditions naturally. A digital tool should study the information architecture players already built before replacing it.",
        ],
      },
      {
        heading: "A familiar pattern can still be wrong",
        kind: "Project fact",
        paragraphs: [
          "Early versions borrowed an end-of-process legality check from other card-game tools. It was familiar, but it worked as an audit after a chain of decisions rather than support during those decisions.",
          "Continuous validation replaced that pattern. The player can still explore an invalid idea, but the consequence is visible before another ten decisions depend on it.",
        ],
      },
      {
        heading: "Surface, do not decide",
        kind: "Proposed research",
        paragraphs: [
          "The tool can know that a card count violates a constraint. It cannot know that a card is strategically right for this person. That judgment belongs to the player.",
          "Whether stack view improves scanning or continuous validation changes deck-building behavior remains untested. The current implementation is evidence of a design argument, not proof of an outcome.",
        ],
      },
    ],
  },
];

export const getFieldNote = (slug?: string) =>
  fieldNotes.find((note) => note.slug === slug);
import { fieldNoteSlugs } from "./publishedRoutes";
