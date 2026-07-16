import { useCallback, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const handoffRoot = "/hceps/designs";

const documentsByRoute: Record<string, string> = {
  "/": "Home.dc.html",
  "/research": "Research.dc.html",
  "/work": "Investigations.dc.html",
  "/work/withyou": "WithYou Investigation - Responsive.dc.html",
  "/work/dojonet": "DojoNet Investigation.dc.html",
  "/work/gundam-forge": "Gundam Forge Investigation.dc.html",
  "/field-notes": "Writing.dc.html",
  "/field-notes/dei-rollbacks-black-tech-job-hunt": "Note - After the Pledges.dc.html",
  "/field-notes/ai-ease-developer-anxiety": "Note - AI and Developer Anxiety.dc.html",
  "/field-notes/bjj-habits-better-front-end-engineer": "Note - Five Jiu-Jitsu Habits.dc.html",
  "/field-notes/fighting-through-the-fog": "Note - Fighting Through the Fog.dc.html",
  "/field-notes/why-i-started-training-jiu-jitsu": "Note - Why Jiu-Jitsu.dc.html",
  "/about": "About.dc.html",
  "/resume": "Resume.dc.html",
  "/contact": "Contact.dc.html",
};

const routesByDocument = Object.fromEntries(
  Object.entries(documentsByRoute).map(([route, document]) => [document, route]),
);

const titlesByDocument: Record<string, string> = {
  "Home.dc.html": "Earl Hickson Jr. — HCEPS",
  "Research.dc.html": "Research — Earl Hickson Jr.",
  "Investigations.dc.html": "Investigations — Earl Hickson Jr.",
  "WithYou Investigation - Responsive.dc.html": "WithYou Investigation — Earl Hickson Jr.",
  "DojoNet Investigation.dc.html": "DojoNet Investigation — Earl Hickson Jr.",
  "Gundam Forge Investigation.dc.html": "Gundam Forge Investigation — Earl Hickson Jr.",
  "Writing.dc.html": "Writing — Earl Hickson Jr.",
  "Note - After the Pledges.dc.html": "After the Pledges — Earl Hickson Jr.",
  "Note - AI and Developer Anxiety.dc.html": "AI and Developer Anxiety — Earl Hickson Jr.",
  "Note - Five Jiu-Jitsu Habits.dc.html": "Five Jiu-Jitsu Habits — Earl Hickson Jr.",
  "Note - Fighting Through the Fog.dc.html": "Fighting Through the Fog — Earl Hickson Jr.",
  "Note - Why Jiu-Jitsu.dc.html": "Why Jiu-Jitsu — Earl Hickson Jr.",
  "About.dc.html": "About — Earl Hickson Jr.",
  "Resume.dc.html": "Resume — Earl Hickson Jr.",
  "Contact.dc.html": "Contact — Earl Hickson Jr.",
};

function documentForPath(pathname: string) {
  return documentsByRoute[pathname] ?? "Home.dc.html";
}

export default function HandoffFrame() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const documentName = documentForPath(pathname);
  const source = useMemo(
    () => `${handoffRoot}/${encodeURIComponent(documentName).replaceAll("%2F", "/")}`,
    [documentName],
  );

  const synchronizeRoute = useCallback(() => {
    const frame = frameRef.current;
    if (!frame?.contentWindow) return;

    try {
      const filename = decodeURIComponent(
        frame.contentWindow.location.pathname.split("/").pop() ?? "",
      );
      const route = routesByDocument[filename];
      if (route && route !== pathname) navigate(route);
    } catch {
      // The handoff only uses same-origin documents. If a browser temporarily
      // withholds frame access during navigation, the next load resynchronizes it.
    }
  }, [navigate, pathname]);

  return (
    <div className="handoff-shell">
      <iframe
        key={documentName}
        ref={frameRef}
        className="handoff-frame"
        src={source}
        title={titlesByDocument[documentName] ?? "Earl Hickson Jr. portfolio"}
        onLoad={synchronizeRoute}
      />
    </div>
  );
}
