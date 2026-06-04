import type { DiagnosticResult } from "../data/scoring";

interface Props {
  result: DiagnosticResult;
  storeName: string;
  onRestart: () => void;
}

const COHORT_COLORS: Record<string, string> = {
  "Loja Inicial": "#ff8080",
  "Loja Emergente": "var(--ev-gold)",
  "Loja Preparada": "#7fb0ff",
  "Loja Avançada": "#5ad1b0",
};

export function StepResult({ result, storeName, onRestart }: Props) {
  const cohortColor = COHORT_COLORS[result.generalCohort] || "var(--ev-gold)";
  const pct = Math.round((result.totalScore / result.maxScore) * 100);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", paddingBottom: 60 }}>
      {/* Header */}
      <div className="ev-card ev-fade-up" style={{ textAlign: "center", marginBottom: 24, padding: "32px 24px" }}>
        <span className="ev-kicker" style={{ display: "block", marginBottom: 12 }}>Diagnóstico completo</span>
        <h1 style={{ fontFamily: "var(--ev-font-display)", fontWeight: 900, fontSize: "clamp(22px,4vw,32px)", marginBottom: 8 }}>
          {storeName || "Sua loja"}
        </h1>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{
            fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 48,
            color: cohortColor, lineHeight: 1,
          }}>{result.totalScore}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, color: "var(--ev-muted)" }}>de 120 pontos</div>
            <div style={{ fontSize: 12, color: "var(--ev-muted)" }}>{pct}% de maturidade</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 8, background: "var(--ev-line)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
          <div style={{
            height: "100%", borderRadius: 4, width: `${pct}%`,
            background: `linear-gradient(90deg, ${cohortColor}, var(--ev-gold-bright))`,
            transition: "width 1s ease",
          }} />
        </div>

        <span style={{
          display: "inline-block", fontFamily: "var(--ev-font-display)", fontWeight: 800,
          fontSize: 18, color: cohortColor, padding: "6px 16px",
          border: `1px solid ${cohortColor}`, borderRadius: 999,
        }}>
          {result.generalCohort}
        </span>

        <p style={{ marginTop: 16, color: "var(--ev-muted)", fontSize: 14, lineHeight: 1.65, maxWidth: 520, margin: "16px auto 0" }}>
          {result.summary}
        </p>
      </div>

      {/* Block scores */}
      <div className="ev-card ev-fade-up" style={{ marginBottom: 24, animationDelay: "80ms" }}>
        <span className="ev-kicker" style={{ display: "block", marginBottom: 16 }}>Pontuação por bloco</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {result.blockScores.map((b, i) => {
            const bPct = Math.round((b.score / b.max) * 100);
            const color = b.isCritical ? "#ff8080" : b.isStrong ? "#5ad1b0" : "var(--ev-gold)";
            return (
              <div key={b.id} className="ev-fade-up" style={{ animationDelay: `${i * 60 + 100}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 13,
                      color, width: 22, textAlign: "center",
                    }}>{b.id}</span>
                    <span style={{ fontSize: 13, color: "var(--ev-ink)" }}>{b.label}</span>
                    {b.isStrong && <span className="ev-tag" style={{ borderColor: "rgba(90,209,176,.4)", color: "#5ad1b0" }}>forte</span>}
                    {b.isCritical && <span className="ev-tag" style={{ borderColor: "rgba(255,128,128,.4)", color: "#ff8080" }}>atenção</span>}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color, flexShrink: 0 }}>
                    {b.score}/{b.max}
                  </span>
                </div>
                <div style={{ height: 5, background: "var(--ev-line)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 3, width: `${bPct}%`,
                    background: color, transition: "width 1s ease",
                  }} />
                </div>
                <p style={{ fontSize: 11, color: "var(--ev-muted-2)", marginTop: 4 }}>{b.cohort}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Critical */}
      {(result.strengths.length > 0 || result.criticalPoints.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {result.strengths.length > 0 && (
            <div className="ev-card ev-fade-up" style={{ animationDelay: "200ms", borderColor: "rgba(90,209,176,.3)" }}>
              <span className="ev-kicker" style={{ color: "#5ad1b0", display: "block", marginBottom: 12 }}>Pontos fortes</span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {result.strengths.map((s) => (
                  <li key={s} style={{ fontSize: 13, color: "var(--ev-ink)", display: "flex", gap: 8 }}>
                    <span style={{ color: "#5ad1b0" }}>✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.criticalPoints.length > 0 && (
            <div className="ev-card ev-fade-up" style={{ animationDelay: "240ms", borderColor: "rgba(255,128,128,.3)" }}>
              <span className="ev-kicker" style={{ color: "#ff8080", display: "block", marginBottom: 12 }}>Pontos de atenção</span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {result.criticalPoints.map((s) => (
                  <li key={s} style={{ fontSize: 13, color: "var(--ev-ink)", display: "flex", gap: 8 }}>
                    <span style={{ color: "#ff8080" }}>!</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Cadence & Challenges */}
      <div className="ev-card ev-fade-up" style={{ marginBottom: 24, animationDelay: "280ms" }}>
        <span className="ev-kicker" style={{ display: "block", marginBottom: 12 }}>Cadência recomendada</span>
        <p style={{ fontSize: 14, color: "var(--ev-ink)", lineHeight: 1.6, marginBottom: 16 }}>
          {result.cadence}
        </p>
        <div className="ev-hairline" style={{ marginBottom: 16 }} />
        <span className="ev-kicker" style={{ display: "block", marginBottom: 10 }}>Tipos de desafio para começar</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {result.challengeTypes.map((c) => (
            <span key={c} className="ev-tag">{c}</span>
          ))}
        </div>
      </div>

      {/* AI Calibration */}
      <div className="ev-card ev-fade-up" style={{ marginBottom: 32, animationDelay: "320ms" }}>
        <span className="ev-kicker" style={{ display: "block", marginBottom: 12 }}>Calibragem da IA</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {Object.entries(result.aiCalibration).map(([key, val]) => {
            const isOn = val === true || (typeof val === "string" && val !== "basico");
            return (
              <div key={key} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,.03)",
                border: "1px solid var(--ev-line-soft)",
              }}>
                <span style={{ fontSize: 12, color: "var(--ev-muted)" }}>
                  {key.replace(/_/g, " ")}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                  background: isOn ? "rgba(90,209,176,.12)" : "rgba(255,255,255,.05)",
                  color: isOn ? "#5ad1b0" : "var(--ev-muted-2)",
                  border: `1px solid ${isOn ? "rgba(90,209,176,.3)" : "var(--ev-line-soft)"}`,
                }}>
                  {typeof val === "boolean" ? (val ? "sim" : "não") : String(val)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="ev-btn-ghost" onClick={onRestart}>Fazer novo diagnóstico</button>
      </div>
    </div>
  );
}
