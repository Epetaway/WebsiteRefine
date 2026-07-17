import { useMemo, useState } from "react";
import { PrototypeAnnotation, PrototypeControls, PrototypeEvidencePanel, PrototypeFrame, PrototypeStage } from "./PrototypeFrame";

const initialCards = [
  { name: "Aerial Unit", count: 3, limit: 3 },
  { name: "Tactical Relay", count: 2, limit: 4 },
  { name: "Resource Link", count: 4, limit: 4 },
];

export function GundamForgeValidationPrototype() {
  const [cards, setCards] = useState(initialCards);
  const aerial = cards.find((card) => card.name === "Aerial Unit")!;
  const warning = aerial.count > aerial.limit;
  const [inspected, setInspected] = useState(false);
  const step = warning ? (inspected ? 3 : 2) : cards === initialCards ? 1 : 4;
  const total = useMemo(() => cards.reduce((sum, card) => sum + card.count, 0), [cards]);
  const reset = () => { setCards(initialCards); setInspected(false); };
  const addAerial = () => setCards((current) => current.map((card) => card.name === "Aerial Unit" ? { ...card, count: card.count + 1 } : card));
  const removeAerial = () => { setCards((current) => current.map((card) => card.name === "Aerial Unit" ? { ...card, count: Math.max(0, card.count - 1) } : card)); setInspected(false); };
  const replace = () => { setCards((current) => current.map((card) => card.name === "Aerial Unit" ? { ...card, count: card.limit } : card.name === "Tactical Relay" ? { ...card, count: card.count + 1 } : card)); setInspected(false); };

  return (
    <PrototypeFrame label="gundam-forge" title="Constraint, explanation, recovery" argument="Decision support should surface a constraint while preserving the player's decision." step={step} totalSteps={4} announcement={warning ? `Warning: Aerial Unit count ${aerial.count} exceeds the fictional limit of ${aerial.limit}.` : `Deck has ${total} cards and no count warning.`} onReset={reset} accent="var(--project-accent)">
      <PrototypeStage title={warning ? "Validation needs attention" : cards === initialCards ? "Add a card" : "Validation recovered"}>
        <div className="deck-status" data-warning={warning}><span>DECK COUNT</span><strong>{total}</strong><span>COUNT VALIDATION</span><strong>{warning ? "1 warning" : "Clear"}</strong></div>
        <ul className="deck-list">{cards.map((card) => <li key={card.name} data-warning={card.count > card.limit}><div><strong>{card.name}</strong><small>Fictional prototype card · limit {card.limit}</small></div><span aria-label={`${card.count} copies`}>{card.count}×</span></li>)}</ul>
        {!warning && cards === initialCards && <PrototypeControls><button type="button" className="prototype-button" onClick={addAerial}>Add Aerial Unit</button></PrototypeControls>}
        {warning && !inspected && <PrototypeControls><button type="button" className="prototype-button" onClick={() => setInspected(true)}>Inspect warning</button><button type="button" className="prototype-button prototype-button--secondary" onClick={removeAerial}>Remove one Aerial Unit</button></PrototypeControls>}
        {warning && inspected && <div className="validation-detail" role="alert"><span>COUNT CONSTRAINT</span><h5>Aerial Unit exceeds its limit by {aerial.count - aerial.limit}.</h5><p>Replace one copy to keep the idea while restoring a valid count.</p><button type="button" className="prototype-button" onClick={replace}>Replace with Tactical Relay</button></div>}
        {!warning && cards !== initialCards && <div className="prototype-result"><span>Validation recovered</span><p>The player chose a replacement after seeing the reason.</p><small>The interface explained the constraint; it did not choose until asked.</small></div>}
      </PrototypeStage>
      <div className="prototype-sidecar"><PrototypeAnnotation label="Unofficial demo">Fictional cards avoid suggesting official franchise art or data.</PrototypeAnnotation><PrototypeEvidencePanel><p>The warning appears during the edit, identifies why it matters, and clears after a player-controlled recovery.</p></PrototypeEvidencePanel></div>
    </PrototypeFrame>
  );
}
