import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import HandoffFrame from "@/components/handoff/HandoffFrame";
import NotFound from "@/pages/not-found";

const legacyProjects: Record<string, string> = {
  withyou: "/work/withyou",
  "dojonet-prototype-max": "/work/dojonet",
  dojonet: "/work/dojonet",
  "gundam-forge": "/work/gundam-forge",
};

const publishedWritingSlugs = new Set([
  "dei-rollbacks-black-tech-job-hunt",
  "ai-ease-developer-anxiety",
  "bjj-habits-better-front-end-engineer",
  "fighting-through-the-fog",
  "why-i-started-training-jiu-jitsu",
]);

function LegacyProjectRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={legacyProjects[slug.toLowerCase()] ?? "/work"} replace />;
}

function LegacyBlogRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug && publishedWritingSlugs.has(slug) ? `/field-notes/${slug}` : "/field-notes"} replace />;
}

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [pathname]);
  return null;
}

export default function App() {
  useAnalytics();
  useEffect(() => {
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) initGA();
  }, []);

  return (
    <div className="site-shell handoff-app">
      <ScrollManager />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HandoffFrame />} />
          <Route path="/work" element={<HandoffFrame />} />
          <Route path="/work/:slug" element={<HandoffFrame />} />
          <Route path="/research" element={<HandoffFrame />} />
          <Route path="/field-notes" element={<HandoffFrame />} />
          <Route path="/field-notes/:slug" element={<HandoffFrame />} />
          <Route path="/about" element={<HandoffFrame />} />
          <Route path="/resume" element={<HandoffFrame />} />
          <Route path="/contact" element={<HandoffFrame />} />

          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/investigations" element={<Navigate to="/work" replace />} />
          <Route path="/case-studies" element={<Navigate to="/work" replace />} />
          <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
          <Route path="/projects/:slug/dev" element={<LegacyProjectRedirect />} />
          <Route path="/how-i-think" element={<Navigate to="/research" replace />} />
          <Route path="/approach" element={<Navigate to="/research" replace />} />
          <Route path="/blog" element={<Navigate to="/field-notes" replace />} />
          <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
          <Route path="/writing" element={<Navigate to="/field-notes" replace />} />
          <Route path="/writing/:slug" element={<LegacyBlogRedirect />} />
          <Route path="/case-study-preview" element={<Navigate to="/work" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
