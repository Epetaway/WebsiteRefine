import { Link } from "react-router-dom";
import SEO from "@/components/seo";

export default function NotFound() {
  return (
    <section className="not-found">
      <SEO title="Page not found — Earl Hickson Jr." description="The requested page could not be found." path="/404" />
      <p className="eyebrow eyebrow--light">404 / Known gap</p>
      <h1>This path is no longer part of the public portfolio.</h1>
      <p>The work may have moved into Work, Research, or Field Notes.</p>
      <div className="button-row"><Link className="button button--light" to="/work">View work</Link><Link className="button button--outline-light" to="/">Return home</Link></div>
    </section>
  );
}
