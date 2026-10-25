import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getFieldNote } from "@/data/fieldNotes";

const Home = lazy(() => import("@/pages/home"));
const Work = lazy(() => import("@/pages/work"));
const InvestigationPage = lazy(() => import("@/pages/investigation"));
const EarlTheKaiju = lazy(() => import("@/pages/earl-the-kaiju"));
const Research = lazy(() => import("@/pages/research"));
const FieldNotes = lazy(() => import("@/pages/field-notes"));
const FieldNotePage = lazy(() => import("@/pages/field-note"));
const About = lazy(() => import("@/pages/about"));
const Resume = lazy(() => import("@/pages/resume"));
const Contact = lazy(() => import("@/pages/contact"));
const GraduateReview = lazy(() => import("@/pages/graduate-review"));
const NotFound = lazy(() => import("@/pages/not-found"));

const legacyProjects: Record<string, string> = {
  withyou: "/work/withyou",
  "dojonet-prototype-max": "/work/dojonet",
  dojonet: "/work/dojonet",
  "gundam-forge": "/work/gundam-forge",
  "earl-the-kaiju": "/work/earl-the-kaiju",
  earldkaiju: "/work/earl-the-kaiju",
};

const legacyWriting: Record<string, string> = {
  "bjj-habits-better-front-end-engineer":
    "/field-notes/teaching-jiu-jitsu-and-ux",
};

function LegacyProjectRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={legacyProjects[slug.toLowerCase()] ?? "/work"} replace />;
}

function LegacyBlogRedirect() {
  const { slug } = useParams();
  const destination =
    (slug && legacyWriting[slug]) ||
    (slug && getFieldNote(slug) ? `/field-notes/${slug}` : "/field-notes");
  return <Navigate to={destination} replace />;
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
        <Suspense fallback={<p className="route-loading" role="status">Loading page…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/earl-the-kaiju" element={<EarlTheKaiju />} />
            <Route path="/work/:slug" element={<InvestigationPage />} />
            <Route path="/research" element={<Research />} />
            <Route path="/field-notes" element={<FieldNotes />} />
            <Route path="/field-notes/:slug" element={<FieldNotePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/graduate-review" element={<GraduateReview />} />

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
            {/* The archived Earl d. Kaiju microsite stays archived; its old addresses
                (matched case-insensitively, so /EarldKaiju too) lead to the case study. */}
            <Route path="/earldkaiju" element={<Navigate to="/work/earl-the-kaiju" replace />} />
            <Route path="/earl-the-kaiju" element={<Navigate to="/work/earl-the-kaiju" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
