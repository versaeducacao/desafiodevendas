import { useState, useEffect } from "react";
import { BLOCKS, STORE_PROFILE_EMPTY } from "./data/questions";
import type { StoreProfile } from "./data/questions";
import {
  saveProfile, loadProfile, saveAnswers, loadAnswers,
  saveOpenAnswers, loadOpenAnswers, saveStep, loadStep, clearAll,
} from "./data/storage";
import { computeDiagnostic } from "./data/scoring";
import { upsertProfile, upsertAnswers, saveResult, clearSessionId } from "./lib/saveData";
import { StepIndicator } from "./components/StepIndicator";
import { Step0_Welcome } from "./components/Step0_Welcome";
import { Step1_Profile } from "./components/Step1_Profile";
import { StepBlock } from "./components/StepBlock";
import { StepOpen } from "./components/StepOpen";
import { StepResult } from "./components/StepResult";

// step 0 = welcome, 1 = profile, 2..8 = blocks A-G, 9 = open, 10 = result
const BLOCK_STEP_OFFSET = 2;

function blockIdForStep(step: number): string | null {
  if (step >= BLOCK_STEP_OFFSET && step <= BLOCK_STEP_OFFSET + BLOCKS.length - 1) {
    return BLOCKS[step - BLOCK_STEP_OFFSET].id;
  }
  return null;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<StoreProfile>(loadProfile() ?? STORE_PROFILE_EMPTY);
  const [answers, setAnswers] = useState<Record<string, number>>(loadAnswers());
  const [openAnswers, setOpenAnswers] = useState<Record<string, string>>(loadOpenAnswers());

  function goTo(s: number) {
    setStep(s);
    saveStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleProfileSave(p: StoreProfile) {
    setProfile(p);
    saveProfile(p);
    upsertProfile(p);
    goTo(BLOCK_STEP_OFFSET);
  }

  function handleBlockSave(blockAnswers: Record<string, number>) {
    const merged = { ...answers, ...blockAnswers };
    setAnswers(merged);
    saveAnswers(merged);
    upsertAnswers(merged, openAnswers);
    goTo(step + 1);
  }

  function handleOpenSave(open: Record<string, string>) {
    setOpenAnswers(open);
    saveOpenAnswers(open);
    upsertAnswers(answers, open);
    goTo(10);
  }

  function handleRestart() {
    clearAll();
    clearSessionId();
    setProfile(STORE_PROFILE_EMPTY);
    setAnswers({});
    setOpenAnswers({});
    goTo(0);
  }

  // Which block IDs have been fully answered
  const completedBlocks = BLOCKS.filter((b) =>
    b.questions.every((_, i) => answers[`${b.id}${i + 1}`] !== undefined)
  ).map((b) => b.id);

  const currentBlockId = blockIdForStep(step);
  const result = step === 10 ? computeDiagnostic(answers) : null;

  useEffect(() => {
    if (step === 10 && result) saveResult(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  const showHeader = step > 0 && step < 10;

  return (
    <div className="ev-noise" style={{
      minHeight: "100vh",
      background: "var(--ev-bg-atmosphere)",
      fontFamily: "var(--ev-font-body)",
      color: "var(--ev-ink)",
    }}>
      {/* Sticky header with macro-block nav */}
      {showHeader && (
        <header style={{
          position: "sticky", top: 0, zIndex: 10,
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          background: "rgba(9,7,51,.88)", borderBottom: "1px solid var(--ev-line-soft)",
          padding: "10px 20px",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 13, color: "var(--ev-gold)" }}>
                Elite do Varejo
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {profile.nome_loja && (
                  <span style={{ fontSize: 12, color: "var(--ev-muted)" }}>{profile.nome_loja}</span>
                )}
                {step === 1 && (
                  <span className="ev-tag">Cadastro</span>
                )}
                {step === 9 && (
                  <span className="ev-tag">Contexto</span>
                )}
              </div>
            </div>
            {/* Only show macro nav when in blocks */}
            {currentBlockId && (
              <StepIndicator
                currentBlockId={currentBlockId}
                completedBlocks={completedBlocks}
                onGoToBlock={(bid) => {
                  const idx = BLOCKS.findIndex((b) => b.id === bid);
                  if (idx !== -1) goTo(idx + BLOCK_STEP_OFFSET);
                }}
              />
            )}
          </div>
        </header>
      )}

      <main style={{ padding: "36px 20px", position: "relative", zIndex: 1 }}>
        {step === 0 && (
          <Step0_Welcome
            onStart={() => goTo(1)}
            onResume={() => goTo(Math.max(loadStep() || 1, 1))}
          />
        )}

        {step === 1 && (
          <Step1_Profile initial={profile} onSave={handleProfileSave} />
        )}

        {step >= BLOCK_STEP_OFFSET && step <= BLOCK_STEP_OFFSET + BLOCKS.length - 1 && (
          <StepBlock
            key={step}
            block={BLOCKS[step - BLOCK_STEP_OFFSET]}
            initial={answers}
            onSave={handleBlockSave}
            onBack={() => goTo(step - 1)}
          />
        )}

        {step === 9 && (
          <StepOpen initial={openAnswers} onSave={handleOpenSave} />
        )}

        {step === 10 && result && (
          <StepResult
            result={result}
            storeName={profile.nome_loja}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
