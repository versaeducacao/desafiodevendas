import { useState } from "react";
import { OPEN_QUESTIONS } from "../data/questions";

interface Props {
  initial: Record<string, string>;
  onSave: (answers: Record<string, string>) => void;
}

export function StepOpen({ initial, onSave }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>(initial);
  const [saved, setSaved] = useState(false);

  function set(key: string, val: string) {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  function handleSave() {
    onSave(answers);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="ev-fade-up" style={{ maxWidth: 640, margin: "0 auto" }}>
      <span className="ev-kicker" style={{ display: "block", marginBottom: 8 }}>Perguntas abertas</span>
      <h2 style={{ fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>
        Contexto da loja
      </h2>
      <p style={{ color: "var(--ev-muted)", fontSize: 14, marginBottom: 28 }}>
        Essas respostas não entram no score — elas ajudam a IA a gerar recomendações muito mais precisas.
        Responda apenas o que fizer sentido para você.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {OPEN_QUESTIONS.map((q, i) => {
          const key = `O${i + 1}`;
          return (
            <div key={key} className="ev-card" style={{ padding: "16px 20px" }}>
              <label style={{
                display: "block", fontSize: 13, fontWeight: 600,
                color: "var(--ev-muted)", marginBottom: 10, lineHeight: 1.5,
              }}>
                <span style={{ color: "var(--ev-gold)", fontFamily: "var(--ev-font-display)", marginRight: 6 }}>
                  {i + 1}.
                </span>
                {q}
              </label>
              <textarea className="ev-textarea"
                value={answers[key] || ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder="Sua resposta (opcional)…"
                rows={2}
              />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24, paddingBottom: 40 }}>
        <button className="ev-btn-ghost" onClick={handleSave}>
          {saved ? "✓ Salvo!" : "Salvar progresso"}
        </button>
        <button className="ev-btn" onClick={handleSave}>
          Ver diagnóstico →
        </button>
      </div>
    </div>
  );
}
