import { researchThemes } from "@/data/researchThemes";

export function CapabilityNetwork() {
  return (
    <figure className="capability-network" aria-labelledby="capability-network-title">
      <svg viewBox="0 0 760 480" role="img" aria-labelledby="capability-network-title capability-network-description">
        <title id="capability-network-title">Human capability investigation network</title>
        <desc id="capability-network-description">
          Relationships, learning, and decision support connect to a central human capability question.
        </desc>
        <g className="capability-network__grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => <line key={`v-${i}`} x1={i * 70} y1="0" x2={i * 70} y2="480" />)}
          {Array.from({ length: 8 }).map((_, i) => <line key={`h-${i}`} x1="0" y1={i * 70} x2="760" y2={i * 70} />)}
        </g>
        <g className="capability-network__connections" aria-hidden="true">
          <path d="M380 240 L175 120" style={{ stroke: researchThemes[0].color }} />
          <path d="M380 240 L585 120" style={{ stroke: researchThemes[1].color }} />
          <path d="M380 240 L380 400" style={{ stroke: researchThemes[2].color }} />
        </g>
        <g className="capability-network__center">
          <circle cx="380" cy="240" r="80" />
          <text x="380" y="228">HUMAN</text><text x="380" y="250">CAPABILITY</text>
          <text className="capability-network__question" x="380" y="278">WHAT DOES THIS ENABLE?</text>
        </g>
        {[
          { x: 175, y: 120, theme: researchThemes[0] },
          { x: 585, y: 120, theme: researchThemes[1] },
          { x: 380, y: 400, theme: researchThemes[2] },
        ].map(({ x, y, theme }) => (
          <g key={theme.id} className="capability-network__node">
            <circle cx={x} cy={y} r="55" style={{ stroke: theme.color }} />
            <text x={x} y={y - 4}>{theme.label.toUpperCase()}</text>
            <text className="capability-network__node-number" x={x} y={y + 18}>{theme.number}</text>
          </g>
        ))}
      </svg>
      <figcaption>Three independent investigations, one recurring human question.</figcaption>
    </figure>
  );
}
