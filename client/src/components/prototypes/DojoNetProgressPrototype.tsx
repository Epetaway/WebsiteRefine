import { useState } from "react";
import { PrototypeAnnotation, PrototypeControls, PrototypeEvidencePanel, PrototypeFrame, PrototypeStage } from "./PrototypeFrame";

const techniques = ["Armbar from guard", "Hip escape", "Technical stand-up"];
const stages = ["Introduced", "Practicing", "Connecting", "Applying under pressure"];

export function DojoNetProgressPrototype() {
  const [step, setStep] = useState(0);
  const [technique, setTechnique] = useState(techniques[0]);
  const [progress, setProgress] = useState(stages[1]);
  const [reflection, setReflection] = useState("I found the angle during drills, but lost the grip when resistance increased.");
  const reset = () => { setStep(0); setTechnique(techniques[0]); setProgress(stages[1]); setReflection("I found the angle during drills, but lost the grip when resistance increased."); };

  return (
    <PrototypeFrame label="dojonet" title="Record a learning history" argument="Progression is practice, feedback, and capability—not a completion percentage." step={step + 1} totalSteps={4} announcement={`Step ${step + 1}. ${["Choose a technique", "Choose a qualitative stage", "Add a reflection", "Learning history recorded"][step]}.`} onReset={reset} accent="#16B889">
      <PrototypeStage title={["Choose a technique", "Select a qualitative stage", "Add reflection", "Learning history"][step]}>
        {step === 0 && <div className="prototype-choice-grid" role="group" aria-label="Technique">{techniques.map((item) => <button type="button" key={item} aria-pressed={technique === item} onClick={() => setTechnique(item)}>{item}</button>)}</div>}
        {step === 1 && <div className="prototype-choice-grid" role="group" aria-label="Learning stage">{stages.map((item, index) => <button type="button" key={item} aria-pressed={progress === item} onClick={() => setProgress(item)}><span>{String(index + 1).padStart(2, "0")}</span>{item}</button>)}</div>}
        {step === 2 && <label className="prototype-field">What changed during practice?<textarea value={reflection} onChange={(event) => setReflection(event.target.value)} rows={4} /></label>}
        {step === 3 && <div className="learning-history"><span>{technique}</span><strong>{progress}</strong><p>{reflection}</p><div aria-label="Qualitative learning path">Introduced <i /> Practicing <i /> Connecting <i /> Applying</div><small>No completion score calculated</small></div>}
        <PrototypeControls>{step > 0 && <button type="button" className="prototype-button prototype-button--secondary" onClick={() => setStep(step - 1)}>Back</button>}{step < 3 && <button type="button" className="prototype-button" onClick={() => setStep(step + 1)}>{step === 2 ? "Record session" : "Continue"}</button>}</PrototypeControls>
      </PrototypeStage>
      <div className="prototype-sidecar"><PrototypeAnnotation label="Counter-model">One logged session does not mean a technique is complete.</PrototypeAnnotation><PrototypeEvidencePanel><p>The history preserves a stage and reflection instead of converting practice into a percentage.</p></PrototypeEvidencePanel></div>
    </PrototypeFrame>
  );
}
