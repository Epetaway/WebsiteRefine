import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Work from "@/pages/work";
import InvestigationPage from "@/pages/investigation";
import Research from "@/pages/research";
import FieldNotes from "@/pages/field-notes";
import FieldNotePage from "@/pages/field-note";
import About from "@/pages/about";
import Resume from "@/pages/resume";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { getFieldNote } from "@/data/fieldNotes";

const legacyProjects: Record<string, string> = {
  withyou: "/work/withyou",
  "dojonet-prototype-max": "/work/dojonet",
  dojonet: "/work/dojonet",
  "gundam-forge": "/work/gundam-forge",
};

function LegacyProjectRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={legacyProjects[slug.toLowerCase()] ?? "/work"} replace />;
}

function LegacyBlogRedirect() {
  const { slug } = useParams();
  return <Navigate to={getFieldNote(slug) ? `/field-notes/${slug}` : "/field-notes"} replace />;
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
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollManager />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<InvestigationPage />} />
          <Route path="/research" element={<Research />} />
          <Route path="/field-notes" element={<FieldNotes />} />
          <Route path="/field-notes/:slug" element={<FieldNotePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/case-studies" element={<Navigate to="/work" replace />} />
          <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
          <Route path="/projects/:slug/dev" element={<LegacyProjectRedirect />} />
          <Route path="/how-i-think" element={<Navigate to="/research" replace />} />
          <Route path="/approach" element={<Navigate to="/research" replace />} />
          <Route path="/blog" element={<Navigate to="/field-notes" replace />} />
          <Route path="/blog/:slug" element={<LegacyBlogRedirect />} />
          <Route path="/case-study-preview" element={<Navigate to="/work" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
