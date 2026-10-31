import { Link } from "react-router-dom";
import SEO from "@/components/seo";
import { notFoundMeta } from "@/data/routeMeta/pages";

export default function NotFound() {
  return (
    <section className="not-found">
      <SEO {...notFoundMeta} />
      <p className="eyebrow eyebrow--light">404 / Known gap</p>
      <h1>This path is no longer part of the public portfolio.</h1>
      <p>The work may have moved into Work, Research, or Field Notes.</p>
      <div className="button-row"><Link className="button button--light" to="/work">View work</Link><Link className="button button--outline-light" to="/">Return home</Link></div>
    </section>
  );
}
