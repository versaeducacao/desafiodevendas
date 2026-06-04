import { hasSavedSession, clearAll } from "../data/storage";

interface Props {
  onStart: () => void;
  onResume: () => void;
}

export function Step0_Welcome({ onStart, onResume }: Props) {
  const hasSession = hasSavedSession();

  return (
    <div className="ev-fade-up" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <span className="ev-kicker" style={{ display: "block", marginBottom: 16 }}>Elite do Varejo</span>
      <h1 style={{
        fontFamily: "var(--ev-font-display)", fontWeight: 800,
        fontSize: "clamp(26px,5vw,38px)", lineHeight: 1.05,
        letterSpacing: "-.01em", marginBottom: 16,
      }}>
        Diagnóstico da <span style={{ color: "var(--ev-gold-bright)" }}>sua loja</span>
      </h1>
      <p style={{ color: "var(--ev-muted)", fontSize: 15, lineHeight: 1.65, marginBottom: 32 }}>
        Responda às perguntas e receba um diagnóstico completo da maturidade da sua loja —
        com recomendações práticas e uma trilha de desafios calibrada para o seu momento.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
        {(["Mix e produto","Tipo de cliente","Operação","Gestão","Liderança","Time de vendas","Fit com IA"] as const).map((t, i) => (
          <span key={i} className="ev-tag" style={{ animationDelay: `${i * 60}ms` }}>{t}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {hasSession ? (
          <>
            <button className="ev-btn" onClick={onResume}>Continuar de onde parei</button>
            <button className="ev-btn-ghost" onClick={() => { clearAll(); onStart(); }}>
              Começar novo diagnóstico
            </button>
          </>
        ) : (
          <button className="ev-btn" onClick={onStart} style={{ fontSize: 15, padding: "15px 28px" }}>
            Iniciar diagnóstico →
          </button>
        )}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "var(--ev-muted-2)" }}>
        ~10 minutos · suas respostas são salvas automaticamente
      </p>
    </div>
  );
}
