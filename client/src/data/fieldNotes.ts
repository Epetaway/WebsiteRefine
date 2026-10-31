/**
 * A screenshot that shows what a section describes. Images come from Earl's screenshot catalog
 * (scripts/field_note_figures.py, provenance in docs/FIELD-NOTE-FIGURES.md).
 * `alt` describes what is on screen for someone who can't see it; `caption` says why it matters
 * to the argument. Neither may claim more than the screen shows.
 */
export type FieldNoteFigure = {
  /** Root-relative path without the width suffix: `${src}-600.webp` and `${src}-1080.webp` exist. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Where the screen came from, e.g. product, platform and data used. */
  source: string;
};

export type FieldNoteSection = {
  heading?: string;
  paragraphs: string[];
  points?: string[];
  /** Shown after the section's text. */
  figure?: FieldNoteFigure;
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
  evidenceTypes: ClaimType[];
  sections: FieldNoteSection[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "a-bridge-you-meet-each-other-on",
    number: "04",
    title: "A Bridge You Meet Each Other On",
    theme: "Relationships",
    themeColor: "#8F2E54",
    claim: "The hardest conversations aren't missing words. They're missing a safe way to start.",
    summary:
      "Why I'm building a relationship app that isn't meant to be lived in, and what it does on the days someone needs their partner most.",
    date: "October 31, 2026",
    datePublished: "2026-10-31",
    readingTime: "6 min",
    evidenceTypes: [
      "personal-reflection",
      "implementation-evidence",
      "design-rationale",
      "known-gap",
    ],
    sections: [
      {
        paragraphs: [
          "My wife and I have been married for less than five years, and we have a young son. Being newly married doesn't make the hard conversations easier. Sometimes it makes them harder, because you're still learning how the other person carries things. Money, worry about the future, the stress you don't notice you're holding. Everyone is struggling with something, and most of us hide it in our own way.",
          "I'm building WithYou to make those conversations a little easier to start: a place to say what you're carrying, at your own pace, so the person who matters most can understand it. Not an app you live in. A bridge you meet each other on.",
        ],
      },
      {
        heading: "What a hard day should feel like",
        paragraphs: [
          "When someone opens WithYou on a bad day, I want them to feel safe reaching out in a way they might not feel safe doing face to face yet. Not a vague \"I'm fine.\" A clear flare for help, sent in a way their partner can actually receive.",
          "Most hard conversations go wrong before anyone says anything difficult. One person hints. The other guesses. Both end up feeling let down, and neither one did anything wrong except fail to read a mind.",
          "So the daily check-in ends with one question: What would help right now? The answers are plain on purpose. Just listen. Hold me. Give me space. Help me think it through. Patience. A distraction. Celebrate with me. Nothing needed.",
          "That last one matters as much as the others. Sometimes the most useful thing you can tell the person you love is that you're okay and don't need anything from them today.",
        ],
      },
      {
        heading: "Sharing at your own pace",
        paragraphs: [
          "Saying \"I'm struggling\" is not the same as handing over every detail behind it. A check-in can hold a win, something hard, how you feel, and what would help. Those don't all have to go to your partner at once.",
          "Everything in a check-in starts out private until you choose to share it. If you share nothing, your partner only sees that you checked in. That alone says something: I'm thinking about us. You decide how far across the bridge you walk on a given day.",
          "I wrote about the engineering behind this in Designing Consent Into Digital Products. The short version is that a privacy promise is only real if the system can't break it.",
        ],
        figure: {
          src: "/assets/field-notes/figures/a-bridge-you-meet-each-other-on/withyou-today",
          width: 1080,
          height: 1860,
          alt: "WithYou's Today screen on an Android phone. The first card reads “Your weekly check-in is open” with the note “A few quiet minutes to reflect on the week. Sending late is fine.” and a Start weekly check-in link. Below it, “Today's check-in is open” says you answer a few quick questions and choose what to share, and a third card offers to send a quick note you review before it goes.",
          caption: "The Today screen. The weekly check-in says sending late is fine, and the daily check-in says you choose what to share.",
          source: "WithYou · Android build · demo account · captured Oct 28, 2026",
        },
      },
      {
        heading: "An app you're not supposed to live in",
        paragraphs: [
          "A lot of apps are built to be hard to put down. I didn't want WithYou to work that way. Some of that intent is now written into the project as rules:",
        ],
        points: [
          "No scores, streaks, grades, or shame notifications. Missing a check-in costs you nothing, and your partner doesn't get a report card on you.",
          "No relationship score, ever. That includes a \"health index\" quietly built by combining other numbers. A relationship isn't a percentage.",
          "Time in the app isn't the goal. The project's analytics rules say session length and daily-active-user metrics are the wrong way to judge this product. The right question is whether the thing you came to do got done.",
          "You decide when it talks to you. Notifications have quiet hours, mute, snooze, and per-type switches.",
        ],
      },
      {
        paragraphs: [
          "The project's own definition of what WithYou is not says it plainly: not a social feed, not a scoring or streak app, not an always-on chatbot.",
        ],
      },
      {
        heading: "What the app won't do",
        paragraphs: [
          "WithYou isn't here to tell anyone how to have a relationship. If a couple is comfortable sending each other notes from across the room, that's their choice. We're not policing partners or deciding what a healthy relationship looks like for two people we've never met.",
          "The one thing it's for is making sure the communication every relationship needs is actually happening. That's it.",
          "It also isn't therapy, and it doesn't pretend to be. Sometimes the bridge leads to your partner, and from there to real help. The app includes safety resources that people choose for their own region; it never guesses their location.",
        ],
        figure: {
          src: "/assets/field-notes/figures/a-bridge-you-meet-each-other-on/withyou-guidance",
          width: 1080,
          height: 1860,
          alt: "WithYou's Guidance screen on an Android phone, labeled “Only you see this.” The text says it is private to you, your partner can't see anything unless you choose to share it, AI is optional, and this is not therapy. Below, a card to start a private session asks whether it should be just yours or tied to the relationship with Jordan, and says it stays private either way.",
          caption: "Guidance says what it isn't on the screen itself: private by default, AI optional, not therapy.",
          source: "WithYou · Android build · demo account · captured Oct 28, 2026",
        },
      },
      {
        heading: "What I can't promise",
        paragraphs: [
          "I can't promise that your partner will give you what you need. That part belongs to them. What the app can honestly do is make the ask clear and easier to receive, so they don't have to guess.",
          "I also can't tell you yet whether it works. WithYou hasn't launched, and everything I've tested has used demo accounts. Nothing in the app measures whether couples actually talk more or spend more time together away from their phones. I'm not sure it should, because measuring that well would mean watching people more closely than I'm comfortable with. That's an open question, not a solved one.",
          "What I can say is what I'm building toward: fewer conversations left sitting for years, and more people who know exactly how to show up for the person they love.",
        ],
      },
    ],
  },
  {
    slug: "teaching-jiu-jitsu-and-ux",
    number: "01",
    title: "Teaching Jiu-Jitsu Changed the Way I Think About UX",
    theme: "Learning",
    themeColor: "#076B50",
    claim: "Learning is not information transfer.",
    summary:
      "How teaching martial arts changed the way I understand feedback, progression, and what it means to help someone build a capability.",
    date: "July 14, 2026",
    datePublished: "2026-07-14",
    readingTime: "8 min",
    evidenceTypes: [
      "personal-reflection",
      "implementation-evidence",
      "known-gap",
      "proposed-research",
    ],
    sections: [
      {
        paragraphs: [
          "The first time I realized a student understood my explanation but still could not perform the technique, I had to reconsider what I meant by teaching.",
          "I had explained the grip, the hip movement, and the angle. She could repeat the mechanics back to me. Then we drilled it, and the pieces were present without becoming the technique itself. I had transferred information. I had not taught anything.",
        ],
      },
      {
        heading: "What a coach actually does",
        paragraphs: [
          "A beginner cannot absorb a whole technique at once. A coach shows the grip, watches the attempt, adds the next piece, and changes the explanation in response to the person in front of them. Good coaches practice progressive disclosure without naming it as a design pattern.",
          "Software does not read hesitation in real time. It has to anticipate what someone is ready for, and it often guesses badly by showing everything and calling the resulting overwhelm power.",
        ],
      },
      {
        heading: "The stages between learned and done",
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
        paragraphs: [
          "DojoNet's structured journal came from needing a more honest observation than done or not done. Qualitative stages give a practitioner language for their present understanding without pretending to calculate mastery.",
          "Structure can make reflection possible when energy and vocabulary are limited. Ask how a round went and the answer may be fine. Ask what worked and what was missed, and there is something a coach can use.",
        ],
      },
      {
        heading: "What remains uncertain",
        paragraphs: [
          "The four-stage model is still a design hypothesis shaped by my own practice. Whether other practitioners experience it as support or constraint requires observation and diary study. That study has not happened yet.",
          "What I can say is that good instruction and good interfaces share a responsibility: create the conditions under which understanding can become action.",
        ],
      },
    ],
  },
  {
    slug: "designing-consent",
    number: "02",
    title: "Designing Consent Into Digital Products",
    theme: "Relationships",
    themeColor: "#8F2E54",
    claim: "Consent should be part of the interaction model, not a paragraph in the privacy policy.",
    summary:
      "What building a relationship-centered application taught me about the difference between a privacy promise and a privacy architecture.",
    date: "July 14, 2026",
    datePublished: "2026-07-14",
    readingTime: "10 min",
    evidenceTypes: [
      "personal-reflection",
      "implementation-evidence",
      "known-gap",
      "proposed-research",
    ],
    sections: [
      {
        paragraphs: [
          "I initially thought the hard problem was building a shared experience. The implementation forced me to realize that the harder question was deciding what should not automatically become shared.",
          "WithYou made consent concrete—not only as a legal concept or a settings page, but as an engineering constraint.",
        ],
      },
      {
        heading: "What consent actually is",
        paragraphs: [
          "Many products treat consent as a sentence: a disclosure, a banner, or a toggle buried in settings. But either the system prevents information from crossing a boundary without an explicit scope, or the copy is a promise the code cannot keep.",
          "A check-in can contain a win, something hard, a feeling, and a request for support. Those are emotionally different facts. A single share-with-partner switch collapses differences the product should preserve.",
        ],
        figure: {
          src: "/assets/field-notes/figures/designing-consent/withyou-quick-note-review",
          width: 1080,
          height: 1860,
          alt: "WithYou's “Review your note” screen on an Android phone. It says “This is exactly what Jordan will see. Nothing is sent until you tap Send.” A preview shows the note's kind, “No kind chosen,” and the note text, “Thinking of you today,” followed by “Written by you. Nothing here was changed or added.” and buttons to Send Quick Note or Edit.",
          caption: "Before anything crosses to a partner, the person sees exactly what will cross and has to tap Send.",
          source: "WithYou · Android build · demo account · captured Oct 28, 2026",
        },
      },
      {
        heading: "Field-level visibility",
        paragraphs: [
          "The design direction became field-level visibility. Agreeing to share a mood is not the same as agreeing to share the experience behind it. The schema, service, API, and interface all need to hold that distinction.",
          "This is why trust is an engineering problem. A private field included in a partner response is not repaired by better privacy copy. The implementation path has already broken the promise.",
        ],
        figure: {
          src: "/assets/field-notes/figures/designing-consent/withyou-weekly-check-in",
          width: 1080,
          height: 1860,
          alt: "WithYou's Weekly check-in screen on an Android phone. A banner says the draft stays only on this phone and that uninstalling the app, clearing its data or losing the phone deletes it. Two questions follow, “What felt good between us this week?” and “What felt difficult?”, and each carries its own “Only you” label above an empty answer field.",
          caption: "Visibility is labeled on each answer, not once for the whole check-in.",
          source: "WithYou · Android build · demo account · captured Oct 28, 2026",
        },
      },
      {
        heading: "What I got wrong",
        paragraphs: [
          "The invite-code flow does not include a separate approval step after the code exchange. Pairing requires deliberate participation from both people, but the current flow could explain the consequence more carefully.",
          "A legacy endpoint also exposes four fields using the earlier unconditional behavior. The newer sharing model is more granular, but a privacy model is only as strong as its least-consistent path.",
        ],
      },
      {
        heading: "Formal comprehension is future work",
        paragraphs: [
          "I can make privacy choices visible. I still need to learn whether people interpret those choices as intended. Does summary-only feel clear? Does additional granularity create control or anxiety?",
          "Those are research questions, not implementation facts. Scope-comprehension testing is future work, and the site does not present it as completed.",
        ],
      },
    ],
  },
  {
    slug: "information-architecture-and-card-games",
    number: "03",
    title: "What Trading Card Games Teach Us About Information Architecture",
    theme: "Decision Support",
    themeColor: "#244BCF",
    claim: "More information does not necessarily create more understanding.",
    summary:
      "Why access to information is not the same as being able to use it—and what a physical card table reveals about how people think.",
    date: "July 14, 2026",
    datePublished: "2026-07-14",
    readingTime: "9 min",
    evidenceTypes: [
      "personal-reflection",
      "implementation-evidence",
      "design-rationale",
      "known-gap",
    ],
    sections: [
      {
        paragraphs: [
          "Watch someone build a deck at a physical table. They sort cards into piles, fan duplicates, arrange a cost curve, and cluster synergies. The table is an information architecture: spatial, glanceable, and persistent.",
          "Many digital deck builders discard that evolved practice for a sortable list, then add more panels when the tool still does not feel useful.",
        ],
      },
      {
        heading: "The fragmentation problem",
        paragraphs: [
          "The rulebook, card catalog, restrictions, and remembered combinations often live in separate places. Consolidating them into one crowded panel does not solve fragmentation; it only moves it.",
          "Gundam Forge instead tries to surface a constraint when it becomes relevant. The question is not how to show all the information, but when each piece matters.",
        ],
      },
      {
        heading: "Recognition over recall",
        paragraphs: [
          "Recall asks a player to remember a rule while balancing many other variables. Recognition turns that burden into a visible cue: this card has a warning, this count is too high, this deck is one card short.",
          "Physical arrangements create recognition conditions naturally. A digital tool should study the information architecture players already built before replacing it.",
        ],
      },
      {
        heading: "A familiar pattern can still be wrong",
        paragraphs: [
          "Early versions borrowed an end-of-process legality check from other card-game tools. It was familiar, but it worked as an audit after a chain of decisions rather than support during those decisions.",
          "Continuous validation replaced that pattern. The player can still explore an invalid idea, but the consequence is visible before another ten decisions depend on it.",
        ],
      },
      {
        heading: "Surface, do not decide",
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
import type { ClaimType } from "./professional";
