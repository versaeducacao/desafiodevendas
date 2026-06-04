import { useState, useEffect, useRef } from "react";
import type { BLOCKS } from "../data/questions";
import { MACRO_BLOCKS, QUESTION_ANSWERS } from "../data/questions";

interface Props {
  block: typeof BLOCKS[number];
  initial: Record<string, number>;
  onSave: (answers: Record<string, number>) => void;
  onBack: () => void;
}

const SCORE_STYLE = [
  { color: "#ff7070", bg: "rgba(255,112,112,.10)", border: "rgba(255,112,112,.35)", activeBorder: "rgba(255,112,112,.7)" },
  { color: "#e0b84a", bg: "rgba(201,162,75,.10)", border: "rgba(201,162,75,.35)", activeBorder: "rgba(201,162,75,.7)" },
  { color: "#5ad1b0", bg: "rgba(90,209,176,.10)", border: "rgba(90,209,176,.35)", activeBorder: "rgba(90,209,176,.7)" },
];

function getMacroColor(blockId: string): string {
  const macro = MACRO_BLOCKS.find((m) => m.blocks.includes(blockId as never));
  const map: Record<string, string> = { loja: "var(--ev-gold-bright)", gestao: "#7fb0ff", time: "#5ad1b0" };
  return macro ? map[macro.id] : "var(--ev-gold)";
}

export function StepBlock({ block, initial, onSave, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    const filtered: Record<string, number> = {};
    block.questions.forEach((_, i) => {
      const key = `${block.id}${i + 1}`;
      if (initial[key] !== undefined) filtered[key] = initial[key];
    });
    return filtered;
  });

  const answeredCount = block.questions.filter((_, i) => answers[`${block.id}${i + 1}`] !== undefined).length;
  const [revealed, setRevealed] = useState(() => Math.min(answeredCount + 1, block.questions.length));

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    return () => clearTimeout(t);
  }, [revealed]);

  function answer(questionIndex: number, value: number) {
    const key = `${block.id}${questionIndex + 1}`;
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    const nextRevealed = questionIndex + 2;
    if (nextRevealed <= block.questions.length) {
      setTimeout(() => setRevealed(nextRevealed), 300);
    }
  }

  function removeAnswer(questionIndex: number) {
    const key = `${block.id}${questionIndex + 1}`;
    const newAnswers = { ...answers };
    delete newAnswers[key];
    setAnswers(newAnswers);
    setRevealed(questionIndex + 1);
  }

  const allAnswered = answeredCount === block.questions.length;
  const macroColor = getMacroColor(block.id);
  const progressPct = Math.round((answeredCount / block.questions.length) * 100);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Block header */}
      <div className="ev-fade-up" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 14,
            background: `${macroColor}20`, border: `1px solid ${macroColor}60`,
            color: macroColor,
          }}>{block.id}</div>
          <div>
            <h2 style={{
              fontFamily: "var(--ev-font-display)", fontWeight: 800,
              fontSize: 18, color: "var(--ev-ink)", margin: 0,
            }}>{block.label}</h2>
            <p style={{ fontSize: 11, color: "var(--ev-muted-2)", marginTop: 1 }}>{block.fullLabel}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--ev-line)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2, width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${macroColor}, ${macroColor}cc)`,
              transition: "width .4s ease",
            }} />
          </div>
          <span style={{ fontSize: 11, color: "var(--ev-muted-2)", whiteSpace: "nowrap" }}>
            {answeredCount}/{block.questions.length}
          </span>
        </div>
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {block.questions.slice(0, revealed).map((q, i) => {
          const key = `${block.id}${i + 1}`;
          const cur = answers[key];
          const isAnswered = cur !== undefined;
          const isLast = i === revealed - 1;
          const cfg = cur !== undefined ? SCORE_STYLE[cur] : null;

          const qAnswers = QUESTION_ANSWERS[key] ?? ["Não fazemos isso", "Fazemos às vezes", "Sim, fazemos sempre"];
          const s = cfg ? SCORE_STYLE[cur!] : null;

          // Answered & not last — compact row
          if (isAnswered && !isLast) {
            return (
              <div key={key} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 12,
                border: `1px solid ${s!.border}`, background: s!.bg,
                gap: 12,
              }}>
                <p style={{
                  fontSize: 13, color: "var(--ev-muted)", lineHeight: 1.4, flex: 1,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{q}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 11, color: s!.color, fontWeight: 700,
                    padding: "2px 10px", borderRadius: 999,
                    border: `1px solid ${s!.border}`, background: s!.bg,
                    whiteSpace: "nowrap",
                  }}>
                    {qAnswers[cur!]}
                  </span>
                  <button onClick={() => removeAnswer(i)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--ev-muted-2)", fontSize: 11, padding: "2px 4px",
                  }}>editar</button>
                </div>
              </div>
            );
          }

          // Active question — full card
          return (
            <div
              key={key}
              ref={isLast ? bottomRef : undefined}
              className="ev-fade-up"
              style={{
                borderRadius: 16,
                border: `1px solid ${s ? s.border : "var(--ev-line)"}`,
                background: s
                  ? `linear-gradient(160deg, ${s.bg}, rgba(16,12,76,.7))`
                  : "linear-gradient(180deg, var(--ev-panel), var(--ev-bg-2))",
                padding: "20px 20px 16px",
                transition: "border-color .25s",
              }}
            >
              <p style={{
                fontSize: 15, lineHeight: 1.65, color: "var(--ev-ink)",
                fontWeight: 500, marginBottom: 18,
              }}>{q}</p>

              <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                {SCORE_STYLE.map((style, v) => (
                  <button
                    key={v}
                    onClick={() => answer(i, v)}
                    style={{
                      width: "100%", padding: "13px 16px",
                      borderRadius: 12, cursor: "pointer", textAlign: "left",
                      border: `2px solid ${cur === v ? style.activeBorder : style.border}`,
                      background: cur === v ? style.bg : "rgba(255,255,255,.02)",
                      display: "flex", alignItems: "center", gap: 12,
                      transition: "all .15s",
                    }}
                  >
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                      background: cur === v ? style.color : style.border,
                      transition: "background .15s",
                    }} />
                    <span style={{
                      fontSize: 14, fontWeight: cur === v ? 700 : 500,
                      color: cur === v ? style.color : "var(--ev-muted)",
                      transition: "color .15s",
                      lineHeight: 1.4,
                    }}>
                      {qAnswers[v]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginTop: 24, paddingBottom: 48 }}>
        <button className="ev-btn-ghost" onClick={onBack} style={{ fontSize: 13 }}>← Voltar</button>
        {allAnswered && (
          <button className="ev-btn ev-fade-up" onClick={() => onSave(answers)}>
            Próximo →
          </button>
        )}
      </div>
    </div>
  );
}
