import { CodeHighlight, FeatureItem, OverviewItem } from "@/components/case-study";

export const withYouOverview: OverviewItem[] = [
  { label: "Role", value: "Frontend Engineer + Product Designer" },
  { label: "Timeline", value: "Jan - Apr 2025" },
  { label: "Tools", value: "React Native, TypeScript, Express, Prisma" },
  { label: "Focus", value: "UX Systems, Performance, Accessibility" },
];

export const withYouFeatures: FeatureItem[] = [
  {
    title: "Communication UI",
    description:
      "Mood check-ins break emotional states into needs, support, and intentions instead of a single emoji score.",
    whyItMatters:
      "Couples can express nuance quickly, which leads to better conversations and less defensive back-and-forth.",
  },
  {
    title: "Shared Moments",
    description:
      "The app creates low-pressure prompts and saves meaningful moments so couples can revisit what worked.",
    whyItMatters:
      "It shifts the product from passive logging to active relationship maintenance with concrete follow-through.",
  },
  {
    title: "Interaction Patterns",
    description:
      "Core flows are intentionally short with progressive disclosure, clear empty states, and feedback on every action.",
    whyItMatters:
      "Touch interactions feel calm and predictable, especially when users are stressed or emotionally overloaded.",
  },
];

export const withYouCodeHighlights: CodeHighlight[] = [
  {
    title: "Reusable Async Action Hook",
    filePath: "apps/mobile/src/api/hooks.ts",
    language: "ts",
    code: `export function useAsyncAction<TArgs extends unknown[], TResult>(\n  fn: (...args: TArgs) => Promise<TResult>\n) {\n  const [loading, setLoading] = useState(false);\n  const [errorText, setErrorText] = useState<string | null>(null);\n\n  const run = useCallback(\n    async (...args: TArgs) => {\n      setLoading(true);\n      setErrorText(null);\n      try {\n        return await fn(...args);\n      } catch (e) {\n        if (e instanceof ApiError) setErrorText(e.message);\n        else setErrorText(CONTENT.app.errors.unknown);\n        throw e;\n      } finally {\n        setLoading(false);\n      }\n    },\n    [fn]\n  );\n\n  return { run, loading, errorText, setErrorText };\n}`,
    rationale:
      "This pattern gives every API action a consistent loading and error lifecycle. It reduces copy-paste state code and keeps UX feedback behavior predictable across screens.",
  },
  {
    title: "Check-in Submission Data Flow",
    filePath: "apps/mobile/src/hooks/useSubmitCheckIn.ts",
    language: "ts",
    code: `const payload: CheckInPayload = {\n  date: dateString,\n  needs: draft.needs,\n  intentions: draft.intentions,\n  support: draft.support,\n  ...(draft.note && { note: draft.note }),\n};\n\nconst response = await api.request<Record<string, unknown>>("/checkins", {\n  method: "POST",\n  body: JSON.stringify(payload),\n});`,
    rationale:
      "Payload creation is explicit and constrained before the API call, so frontend state maps cleanly to backend contracts. Optional fields are included intentionally, not by accident.",
  },
  {
    title: "Platform-aware Session Storage",
    filePath: "apps/mobile/src/state/session.ts",
    language: "ts",
    code: `async function getItem(key: string): Promise<string | null> {\n  if (Platform.OS === "web") {\n    return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;\n  }\n  return SecureStore.getItemAsync(key);\n}\n\nexport async function setSession(token: string, userId: string) {\n  await setItem(TOKEN_KEY, token);\n  await setItem(USER_ID_KEY, userId);\n}`,
    rationale:
      "One storage abstraction supports mobile and web environments without branching logic throughout the app. Security-sensitive tokens use SecureStore on native platforms.",
  },
  {
    title: "Safe-area Mobile-first Layout",
    filePath: "apps/mobile/src/components/checkin/CheckInHero.tsx",
    language: "tsx",
    code: `<View\n  style={[\n    styles.topBar,\n    {\n      paddingTop: insets.top + 12,\n      paddingHorizontal: 16,\n    },\n  ]}\n>\n  <Pressable onPress={onBackPress} accessibilityRole="button">\n    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />\n  </Pressable>\n</View>`,
    rationale:
      "Insets from device safe areas are applied directly in layout, so controls avoid notches and status bars. This is a practical mobile-first decision that protects usability on real hardware.",
  },
];

export const withYouContent = {
  title: "WithYou",
  subtitle:
    "A relationship wellness app that turns daily check-ins into intentional moments couples can actually keep.",
  heroImage: "https://opengraph.githubassets.com/1/Epetaway/WithYou",
  oneLiner:
    "Designed and built a warm, private, mobile-first experience focused on communication quality, not engagement addiction.",
  problem: [
    "Couples usually communicate in bursts: a quick text, a missed conversation, then emotional catch-up later when both people are drained.",
    "Most apps in this space optimize for daily streak pressure instead of emotional clarity. That creates noise, not connection.",
    "WithYou targets couples who want practical structure: a place to check in, align on needs, and create shared momentum without over-managing each other.",
  ],
  approach: [
    "I framed the product around low-friction rituals: short check-ins, shared prompts, and visible progress signals that reward consistency over intensity.",
    "Trade-off: fewer flashy features, more reliability. I prioritized predictable interactions, fast state updates, and clear empty/error states.",
    "Constraint: emotional products can become manipulative quickly. We kept language neutral, made interactions consent-based, and avoided dark patterns like aggressive streak mechanics.",
  ],
  designSystem: [
    "Typography uses a high-contrast display tone for hierarchy and a quieter body style for readability during emotional moments.",
    "Color is warm and calm: coral for primary actions, peach accents for supportive states, cool neutrals for dense content.",
    "Component reuse is intentional: cards, selectors, and action bars share shape, spacing, and affordance rules across flows.",
    "Spacing follows a compact mobile rhythm first, then expands at tablet/desktop breakpoints to maintain scanability.",
  ],
  mobileFirst: [
    "Start with single-column content and thumb-zone controls. No desktop assumptions in baseline layouts.",
    "Use safe-area insets and touch target sizing to avoid accidental taps around notches and gesture zones.",
    "Promote progressive disclosure so dense relationship content is revealed in small, clear steps.",
    "Scale to tablet/desktop by widening grids and line length, not by rewriting interaction models.",
  ],
  impact: [
    "Communication becomes more actionable: users can describe what they need now, not just how they feel.",
    "Shared rituals become easier to sustain because each flow is short and intentionally paced.",
    "The architecture supports scale: reusable hooks and data contracts keep new features from bloating core flows.",
    "Success would be measured by completion quality metrics, repeat healthy check-ins, and fewer abandoned flows.",
  ],
  reflection: [
    "This project sharpened how I connect product intent to implementation details. UX language and API contracts need to reinforce each other.",
    "If I extended this further, I would add in-app qualitative research loops and behavior-level analytics that stay privacy-respecting.",
    "It represents the kind of engineer I am: frontend-first, systems-aware, and deliberate about how interface decisions shape real behavior.",
  ],
  implementationNotes: [
    "Template model: keep content in per-project data files, theme in per-project theme files, and render through shared section components.",
    "New case studies can reuse this exact layout by swapping data + theme while preserving section order and mobile-first defaults.",
    "Engineering snippets should always come from real source files and be tied to a product decision, not pasted as decoration.",
  ],
};
