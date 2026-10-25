import { Status } from "./parts";
import type { FlagshipStatus } from "@/data/earlTheKaiju";

type Node = { title: string; detail: string; status: FlagshipStatus; audience: "public" | "private" | "shared" };

const flow: Node[] = [
  { title: "Brand identity", detail: "Crest, lettering, tokens and rules. Both products take their colors, type and logos from it.", status: "APPROVED", audience: "shared" },
  { title: "Public instructor website", detail: "Informs, builds trust, explains five programs. Collects interest — never bookings.", status: "BUILT, NOT DEPLOYED", audience: "public" },
  { title: "Secure inquiry handling", detail: "Cloudflare Worker: origin check, spam check, rate limit, D1 storage, email to me with the visitor as Reply-To.", status: "IMPLEMENTED + TESTED", audience: "public" },
  { title: "Authorized integration", detail: "Instructor-only authentication on the Worker; the app pulls inquiries into its own table. Turning one into a student is a deliberate tap.", status: "PLANNED", audience: "private" },
  { title: "Kaiju Coach", detail: "Private, offline teaching tool. Room on the phone is the source of truth; no network permission today.", status: "IMPLEMENTED + TESTED", audience: "private" },
];

export function EcosystemDiagram() {
  return (
    <figure className="etk-eco" aria-labelledby="etk-eco-caption">
      <div className="etk-eco__lanes" aria-hidden="true">
        <span>Public</span>
        <span>Private to me</span>
      </div>
      <ol className="etk-eco__flow">
        {flow.map((node, index) => (
          <li
            key={node.title}
            className={`etk-eco__node etk-eco__node--${node.audience}${node.status === "PLANNED" ? " is-planned" : ""}`}
          >
            <span className="etk-eco__step">{String(index + 1).padStart(2, "0")}</span>
            <h3>{node.title}</h3>
            <p>{node.detail}</p>
            <Status status={node.status} />
          </li>
        ))}
      </ol>
      <div className="etk-eco__side">
        <div className="etk-eco__node etk-eco__node--private is-planned">
          <span className="etk-eco__step">Separately</span>
          <h3>Desktop companion + local Wi-Fi sync</h3>
          <p>
            A React and TypeScript companion on my computer, paired once by QR code. The phone finds it over mDNS
            and syncs over pinned TLS with signed requests — same Wi-Fi only, no cloud, no account. The phone never
            depends on it to teach.
          </p>
          <Status status="DESIGNED" />
        </div>
      </div>
      <figcaption id="etk-eco-caption">
        <span className="etk-eco__legend"><i className="is-built" aria-hidden="true" /> Solid: built and tested</span>
        <span className="etk-eco__legend"><i className="is-planned" aria-hidden="true" /> Dashed: designed or planned, no code yet</span>
        <span>
          The website and the app never share a database. Public visitors have no path to instructor records, and
          students' names never leave my phone and a paired computer. Retrospective illustration drawn for this page
          from the sync architecture document (docs/06) and the Worker code.
        </span>
      </figcaption>
    </figure>
  );
}
