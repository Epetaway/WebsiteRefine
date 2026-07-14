import { useState } from "react";
import { PrototypeAnnotation, PrototypeControls, PrototypeEvidencePanel, PrototypeFrame, PrototypeStage } from "./PrototypeFrame";

const sampleEntry = "I need a quiet evening and a little reassurance. No problem-solving tonight.";

export function WithYouSharingPrototype() {
  const [stage, setStage] = useState(0);
  const [entry, setEntry] = useState(sampleEntry);
  const [sharing, setSharing] = useState<"private" | "summary">("private");

  const reset = () => { setStage(0); setEntry(sampleEntry); setSharing("private"); };
  const announcement = [
    "Private entry ready. It has not been shared.",
    `Sharing decision selected: ${sharing === "private" ? "keep private" : "share a partner-safe summary"}.`,
    "Review the sharing consequence before confirming.",
    sharing === "summary" ? "Partner result contains a safe summary without the private raw entry." : "Partner result contains no entry because the user kept it private.",
  ][stage];

  return (
    <PrototypeFrame label="withyou" title="Private entry to partner result" argument="Pairing creates connection. It does not automatically create permission." step={stage + 1} totalSteps={4} announcement={announcement} onReset={reset} accent="#C65788">
      <PrototypeStage title={["Private entry", "Sharing decision", "Review", "Partner result"][stage]}>
        {stage === 0 && <label className="prototype-field">Fictional private reflection<textarea value={entry} onChange={(event) => setEntry(event.target.value)} rows={4} /><small>Stored only in this component until reset or page exit.</small></label>}
        {stage === 1 && <fieldset className="prototype-options"><legend>What should a partner receive?</legend><label><input type="radio" name="sharing" checked={sharing === "private"} onChange={() => setSharing("private")} /><span><strong>Keep private</strong><small>No partner result is created.</small></span></label><label><input type="radio" name="sharing" checked={sharing === "summary"} onChange={() => setSharing("summary")} /><span><strong>Share a safe summary</strong><small>The raw note remains private.</small></span></label></fieldset>}
        {stage === 2 && <div className="prototype-review"><div><span>Private source</span><p>{entry}</p></div><div><span>Partner consequence</span><p>{sharing === "summary" ? "A partner-safe signal: “They could use reassurance and a quiet evening.”" : "Nothing from this entry will be visible to the partner."}</p><small>{sharing === "summary" ? "The raw note remains private." : "No partner result will be created."}</small></div></div>}
        {stage === 3 && <div className="prototype-result"><span>Partner view</span><p>{sharing === "summary" ? "Your partner could use reassurance and a quiet evening." : "No new shared check-in."}</p><small>{sharing === "summary" ? "Summary shared · raw reflection remains private" : "Connected does not mean automatically shared"}</small></div>}
        <PrototypeControls>
          {stage > 0 && <button type="button" className="prototype-button prototype-button--secondary" onClick={() => setStage(stage - 1)}>Back</button>}
          {stage < 3 && <button type="button" className="prototype-button" onClick={() => setStage(stage + 1)}>{stage === 2 ? "Confirm decision" : "Continue"}</button>}
        </PrototypeControls>
      </PrototypeStage>
      <div className="prototype-sidecar"><PrototypeAnnotation label="Evidence boundary">The prototype demonstrates an interaction model. It does not prove relationship outcomes.</PrototypeAnnotation><PrototypeEvidencePanel><p>The partner result changes only after an explicit field-level decision and review.</p></PrototypeEvidencePanel></div>
    </PrototypeFrame>
  );
}
