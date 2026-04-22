import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeTab } from "./types";

type CaseStudyCodeTabsProps = {
  tabs: CodeTab[];
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function CodePanel({ tab }: { tab: CodeTab }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="relative rounded-b-xl border border-t-0 border-[#20252A] bg-[#0A0A0A] overflow-hidden">
      {/* File label bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#7A7A7A]">{tab.filename}</span>
          <span
            className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--case-accent)" }}
          >
            {tab.language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex items-center gap-1.5 text-[11px] text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div className="overflow-x-auto">
        <pre className="p-5 text-[13px] leading-relaxed font-mono text-[#c9d1d9] whitespace-pre min-w-0">
          <code>{tab.code}</code>
        </pre>
      </div>
    </div>
  );
}

export function CaseStudyCodeTabs({ tabs }: CaseStudyCodeTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <section id="code" className="scroll-mt-24 py-12 border-t border-[#1A1A1A]">
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35 }}
        className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--case-accent)" }}
      >
        07 Code Highlights
      </motion.p>

      <motion.h2
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.04 }}
        className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2"
      >
        Code in action
      </motion.h2>

      <motion.p
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-[#B7B7B7] text-sm leading-relaxed mb-6 max-w-lg"
      >
        Snippets that demonstrate problem-solving, clean architecture, and implementation.
      </motion.p>

      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        <Tabs defaultValue={tabs[0].label}>
          <TabsList className="w-full justify-start rounded-t-xl rounded-b-none border border-[#20252A] bg-[#111111] h-auto p-0 gap-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.label}
                className="rounded-none first:rounded-tl-xl px-4 py-3 text-xs font-medium text-[#7A7A7A] data-[state=active]:text-[#F5F5F5] data-[state=active]:bg-[#0A0A0A] border-r border-[#20252A] last:border-r-0 transition-colors"
                style={
                  {
                    "--tw-ring-shadow": "none",
                    boxShadow: "none",
                  } as React.CSSProperties
                }
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label} className="mt-0">
              <CodePanel tab={tab} />
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
}
