import { useState, useEffect, useRef } from "react";
import type { StoreProfile } from "../data/questions";
import {
  SEGMENTOS, LOCALIZACOES, DATAS_COMERCIAIS,
  QUANTIDADE_LOJAS_OPTIONS, isMultiLoja,
} from "../data/questions";

interface Props {
  initial: StoreProfile;
  onSave: (profile: StoreProfile) => void;
}

// ─── tiny shared primitives ────────────────────────────────────────────────

function ChoiceButton({
  label, selected, color = "var(--ev-gold)", onClick,
}: { label: string; selected: boolean; color?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 12, cursor: "pointer",
        textAlign: "left", border: `2px solid ${selected ? color : "rgba(255,255,255,.12)"}`,
        background: selected ? `${color}18` : "rgba(255,255,255,.02)",
        display: "flex", alignItems: "center", gap: 12,
        transition: "all .15s",
      }}
    >
      <div style={{
        width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
        background: selected ? color : "rgba(255,255,255,.18)",
        border: selected ? "none" : "1px solid rgba(255,255,255,.25)",
        transition: "background .15s",
      }} />
      <span style={{
        fontSize: 14, fontWeight: selected ? 700 : 500,
        color: selected ? color : "var(--ev-muted)",
        transition: "color .15s",
      }}>{label}</span>
    </button>
  );
}

function CardInput({ children, answered, summary, onEdit }: {
  children: React.ReactNode;
  answered: boolean;
  summary?: string;
  onEdit: () => void;
}) {
  if (answered) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderRadius: 12,
        border: "1px solid rgba(201,162,75,.3)", background: "rgba(201,162,75,.06)",
        gap: 12,
      }}>
        <p style={{ fontSize: 13, color: "var(--ev-muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {summary}
        </p>
        <button onClick={onEdit} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ev-muted-2)", fontSize: 11, flexShrink: 0 }}>
          editar
        </button>
      </div>
    );
  }
  return (
    <div className="ev-card ev-fade-up" style={{ padding: "20px 20px 16px" }}>
      {children}
    </div>
  );
}

function Q({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ev-ink)", fontWeight: 500, marginBottom: 18 }}>
      {text}
    </p>
  );
}

function TextIn({ value, onChange, placeholder, type = "text", autoFocus }: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; autoFocus?: boolean;
}) {
  return (
    <input
      className="ev-input" type={type} value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      style={{ display: "block" }}
    />
  );
}

// ─── Step definitions ──────────────────────────────────────────────────────

// Each "step" is an index 0..N. We compute which steps to show based on answers.
// Steps with isMeta=true are never shown as questions — they auto-advance.

function buildSteps(form: StoreProfile) {
  const steps: { id: string; label: string; summary: (f: StoreProfile) => string }[] = [
    {
      id: "nome_responsavel",
      label: "Como você se chama?",
      summary: (f) => f.nome_responsavel,
    },
    {
      id: "contato",
      label: "Qual é o seu e-mail e WhatsApp?",
      summary: (f) => `${f.email} · ${f.whatsapp}`,
    },
    {
      id: "nome_loja",
      label: "Qual é o nome da loja?",
      summary: (f) => f.nome_loja,
    },
    {
      id: "quantidade_lojas",
      label: "Quantas lojas você tem?",
      summary: (f) => f.quantidade_lojas,
    },
    // conditional — only when multi-loja
    ...(isMultiLoja(form.quantidade_lojas) ? [{
      id: "escopo_diagnostico",
      label: "Este diagnóstico é para toda a rede ou para uma loja específica?",
      summary: (f: StoreProfile) =>
        f.escopo_diagnostico === "rede" ? "Para toda a rede" :
        f.escopo_diagnostico === "loja_especifica" ? "Para uma loja específica" : "",
    }] : []),
    {
      id: "segmento_localizacao",
      label: "Qual é o segmento e o tipo de ponto?",
      summary: (f) => [f.segmento, f.localizacao_tipo].filter(Boolean).join(" · "),
    },
    {
      id: "localizacao",
      label: "Em qual cidade e bairro fica a loja?",
      summary: (f) => [f.cidade, f.bairro].filter(Boolean).join(", "),
    },
    {
      id: "equipe",
      label: "Quantos colaboradores você tem?",
      summary: (f) => `${f.quantidade_funcionarios || "?"} colaboradores · ${f.quantidade_vendedores || "?"} vendedores`,
    },
    {
      id: "descricao",
      label: "O que a loja vende?",
      summary: (f) => f.descricao_loja || "(não informado)",
    },
    {
      id: "produtos",
      label: "Quais são os seus top produtos ou categorias?",
      summary: (f) => [f.produto_1_nome, f.produto_2_nome, f.produto_3_nome].filter(Boolean).join(" · ") || "(não informado)",
    },
    {
      id: "numeros",
      label: "Quais são os principais números da operação?",
      summary: (f) =>
        [
          f.faturamento_mensal ? `R$ ${Number(f.faturamento_mensal).toLocaleString("pt-BR")}/mês` : null,
          f.ticket_medio ? `ticket R$ ${f.ticket_medio}` : null,
        ].filter(Boolean).join(" · ") || "(não informado)",
    },
    {
      id: "time",
      label: "Como é o histórico do time?",
      summary: (f) =>
        [
          f.vendedores_entraram_12m ? `${f.vendedores_entraram_12m} entraram` : null,
          f.vendedores_sairam_12m ? `${f.vendedores_sairam_12m} saíram` : null,
        ].filter(Boolean).join(" · ") || "(não informado)",
    },
    {
      id: "datas",
      label: "Quais datas comerciais são importantes para a loja?",
      summary: (f) => f.datas_comerciais.slice(0, 3).join(", ") + (f.datas_comerciais.length > 3 ? "…" : "") || "(nenhuma)",
    },
  ];
  return steps;
}

function isStepDone(id: string, form: StoreProfile): boolean {
  switch (id) {
    case "nome_responsavel": return !!form.nome_responsavel.trim();
    case "contato": return !!form.email.trim() && !!form.whatsapp.trim();
    case "nome_loja": return !!form.nome_loja.trim();
    case "quantidade_lojas": return !!form.quantidade_lojas;
    case "escopo_diagnostico": return !!form.escopo_diagnostico;
    case "segmento_localizacao": return !!form.segmento;
    case "localizacao": return !!form.cidade.trim();
    case "equipe": return !!form.quantidade_funcionarios;
    case "descricao": return true; // optional
    case "produtos": return true;  // optional
    case "numeros": return true;   // optional
    case "time": return true;      // optional
    case "datas": return true;     // optional
    default: return false;
  }
}

// ─── Main component ────────────────────────────────────────────────────────

export function Step1_Profile({ initial, onSave }: Props) {
  const [form, setForm] = useState<StoreProfile>(initial);
  const [activeIdx, setActiveIdx] = useState(() => {
    // Start at first unanswered step
    const steps = buildSteps(initial);
    const first = steps.findIndex((s) => !isStepDone(s.id, initial));
    return first === -1 ? steps.length - 1 : first;
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  function set(key: keyof StoreProfile, value: string | string[]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const steps = buildSteps(form);
  const visibleSteps = steps.slice(0, activeIdx + 1);
  const allRequiredDone =
    isStepDone("nome_responsavel", form) &&
    isStepDone("contato", form) &&
    isStepDone("nome_loja", form) &&
    isStepDone("quantidade_lojas", form) &&
    (!isMultiLoja(form.quantidade_lojas) || isStepDone("escopo_diagnostico", form));

  function advance() {
    const next = activeIdx + 1;
    if (next < steps.length) {
      setActiveIdx(next);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    }
  }

  function goTo(idx: number) {
    setActiveIdx(idx);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  // Auto-advance when step becomes done (for choice-only steps)
  useEffect(() => {
    const current = steps[activeIdx];
    if (!current) return;
    const autoAdvance = ["quantidade_lojas", "escopo_diagnostico", "segmento_localizacao"];
    if (autoAdvance.includes(current.id) && isStepDone(current.id, form)) {
      const t = setTimeout(advance, 320);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.quantidade_lojas, form.escopo_diagnostico, form.segmento]);

  const progressPct = Math.round(
    (steps.filter((s) => isStepDone(s.id, form)).length / steps.length) * 100
  );

  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };

  function renderActive(id: string) {
    switch (id) {
      case "nome_responsavel":
        return (
          <>
            <Q text="Como você se chama?" />
            <TextIn value={form.nome_responsavel} onChange={(v) => set("nome_responsavel", v)}
              placeholder="Ex.: Maria Silva" autoFocus />
            <NextBtn disabled={!form.nome_responsavel.trim()} onClick={advance} />
          </>
        );

      case "contato":
        return (
          <>
            <Q text="Qual é o seu e-mail e WhatsApp?" />
            <p style={{ fontSize: 12, color: "var(--ev-muted-2)", marginTop: -12, marginBottom: 14 }}>
              Vamos enviar o diagnóstico completo para você.
            </p>
            <div style={grid2}>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>E-mail</label>
                <TextIn value={form.email} onChange={(v) => set("email", v)}
                  type="email" placeholder="maria@loja.com" autoFocus />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>WhatsApp</label>
                <TextIn value={form.whatsapp} onChange={(v) => set("whatsapp", v)}
                  type="tel" placeholder="(11) 99999-9999" />
              </div>
            </div>
            <NextBtn disabled={!form.email.trim() || !form.whatsapp.trim()} onClick={advance} />
          </>
        );

      case "nome_loja":
        return (
          <>
            <Q text="Qual é o nome da loja?" />
            <TextIn value={form.nome_loja} onChange={(v) => set("nome_loja", v)}
              placeholder="Ex.: Moda Elegance" autoFocus />
            <NextBtn disabled={!form.nome_loja.trim()} onClick={advance} />
          </>
        );

      case "quantidade_lojas":
        return (
          <>
            <Q text="Quantas lojas você tem?" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {QUANTIDADE_LOJAS_OPTIONS.map((opt) => (
                <ChoiceButton key={opt} label={opt} selected={form.quantidade_lojas === opt}
                  onClick={() => set("quantidade_lojas", opt)} />
              ))}
            </div>
          </>
        );

      case "escopo_diagnostico":
        return (
          <>
            <Q text="Este diagnóstico é para toda a rede ou para uma loja específica?" />
            <p style={{ fontSize: 13, color: "var(--ev-muted)", marginTop: -12, marginBottom: 14, lineHeight: 1.5 }}>
              Se for para a rede, responda pensando no padrão geral das suas lojas. Se for para uma loja específica, foque nela.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <ChoiceButton label="Para toda a rede" selected={form.escopo_diagnostico === "rede"}
                onClick={() => set("escopo_diagnostico", "rede")} />
              <ChoiceButton label="Para uma loja específica" selected={form.escopo_diagnostico === "loja_especifica"}
                onClick={() => set("escopo_diagnostico", "loja_especifica")} />
            </div>
          </>
        );

      case "segmento_localizacao":
        return (
          <>
            <Q text="Qual é o segmento e o tipo de ponto?" />
            <div style={grid2}>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>Segmento *</label>
                <SelectInline value={form.segmento} onChange={(v) => set("segmento", v)} options={SEGMENTOS} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>Tipo de ponto</label>
                <SelectInline value={form.localizacao_tipo} onChange={(v) => set("localizacao_tipo", v)} options={LOCALIZACOES} />
              </div>
            </div>
          </>
        );

      case "localizacao":
        return (
          <>
            <Q text="Em qual cidade e bairro fica a loja?" />
            <div style={grid2}>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>Cidade</label>
                <TextIn value={form.cidade} onChange={(v) => set("cidade", v)} placeholder="Ex.: São Paulo" autoFocus />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>Bairro / shopping</label>
                <TextIn value={form.bairro} onChange={(v) => set("bairro", v)} placeholder="Ex.: Moema" />
              </div>
            </div>
            <NextBtn disabled={!form.cidade.trim()} onClick={advance} />
          </>
        );

      case "equipe":
        return (
          <>
            <Q text="Quantos colaboradores você tem?" />
            <div style={grid2}>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>Total de colaboradores</label>
                <TextIn value={form.quantidade_funcionarios} onChange={(v) => set("quantidade_funcionarios", v)} type="number" placeholder="Ex.: 5" autoFocus />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>Desses, quantos vendedores</label>
                <TextIn value={form.quantidade_vendedores} onChange={(v) => set("quantidade_vendedores", v)} type="number" placeholder="Ex.: 3" />
              </div>
            </div>
            <NextBtn disabled={!form.quantidade_funcionarios} onClick={advance} />
          </>
        );

      case "descricao":
        return (
          <>
            <Q text="O que a loja vende?" />
            <textarea className="ev-textarea"
              value={form.descricao_loja}
              onChange={(e) => set("descricao_loja", e.target.value)}
              placeholder="Ex.: Roupas femininas adulto — foco em moda casual e festa"
              rows={3} autoFocus
            />
            <NextBtn label="Continuar" onClick={advance} />
          </>
        );

      case "produtos":
        return (
          <>
            <Q text="Quais são os seus top produtos ou categorias?" />
            <p style={{ fontSize: 12, color: "var(--ev-muted-2)", marginTop: -12, marginBottom: 14 }}>
              Liste do mais importante para o menos.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, color: "var(--ev-muted-2)", display: "block", marginBottom: 4 }}>
                      Produto / categoria {n}
                    </label>
                    <TextIn
                      value={String(form[`produto_${n}_nome` as keyof StoreProfile] || "")}
                      onChange={(v) => set(`produto_${n}_nome` as keyof StoreProfile, v)}
                      placeholder={n === 1 ? "Ex.: Vestidos" : n === 2 ? "Ex.: Blusas" : "Ex.: Acessórios"}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "var(--ev-muted-2)", display: "block", marginBottom: 4 }}>Preço médio</label>
                    <TextIn
                      value={String(form[`produto_${n}_preco` as keyof StoreProfile] || "")}
                      onChange={(v) => set(`produto_${n}_preco` as keyof StoreProfile, v)}
                      type="number" placeholder="R$ 120"
                    />
                  </div>
                </div>
              ))}
            </div>
            <NextBtn label="Continuar" onClick={advance} />
          </>
        );

      case "numeros":
        return (
          <>
            <Q text="Quais são os principais números da operação?" />
            <p style={{ fontSize: 12, color: "var(--ev-muted-2)", marginTop: -12, marginBottom: 14 }}>
              Aproximados estão ótimos.
            </p>
            <div style={grid2}>
              {[
                { key: "faturamento_mensal", label: "Faturamento mensal (R$)", placeholder: "Ex.: 80000" },
                { key: "ticket_medio", label: "Ticket médio (R$)", placeholder: "Ex.: 180" },
                { key: "vendas_dia_normal", label: "Vendas num dia normal", placeholder: "Ex.: 12" },
                { key: "vendas_dia_movimentado", label: "Vendas num dia movimentado", placeholder: "Ex.: 35" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>{label}</label>
                  <TextIn value={String(form[key as keyof StoreProfile] || "")}
                    onChange={(v) => set(key as keyof StoreProfile, v)} type="number" placeholder={placeholder} />
                </div>
              ))}
            </div>
            <NextBtn label="Continuar" onClick={advance} />
          </>
        );

      case "time":
        return (
          <>
            <Q text="Como é o histórico do time de vendas?" />
            <div style={grid2}>
              {[
                { key: "vendedores_entraram_12m", label: "Entraram nos últimos 12 meses", placeholder: "Ex.: 2" },
                { key: "vendedores_sairam_12m", label: "Saíram nos últimos 12 meses", placeholder: "Ex.: 1" },
                { key: "tempo_casa_mais_antigo", label: "Tempo de casa do mais antigo", placeholder: "Ex.: 4 anos" },
                { key: "tempo_casa_mais_novo", label: "Tempo de casa do mais novo", placeholder: "Ex.: 3 meses" },
                { key: "vendedores_junior", label: "Vendedores iniciantes", placeholder: "Ex.: 1" },
                { key: "vendedores_experientes", label: "Vendedores experientes", placeholder: "Ex.: 2" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: "var(--ev-muted)", marginBottom: 5, display: "block" }}>{label}</label>
                  <TextIn value={String(form[key as keyof StoreProfile] || "")}
                    onChange={(v) => set(key as keyof StoreProfile, v)} placeholder={placeholder} />
                </div>
              ))}
            </div>
            <NextBtn label="Continuar" onClick={advance} />
          </>
        );

      case "datas":
        return (
          <>
            <Q text="Quais datas comerciais são importantes para a loja?" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {DATAS_COMERCIAIS.map((d) => (
                <button key={d}
                  className={`ev-chip ${form.datas_comerciais.includes(d) ? "is-active" : ""}`}
                  onClick={() => {
                    const cur = form.datas_comerciais;
                    set("datas_comerciais", cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]);
                  }}>
                  {d}
                </button>
              ))}
            </div>
          </>
        );

      default: return null;
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Header */}
      <div className="ev-fade-up" style={{ marginBottom: 28 }}>
        <span className="ev-kicker" style={{ display: "block", marginBottom: 8 }}>Antes de começar</span>
        <h2 style={{ fontFamily: "var(--ev-font-display)", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>
          Conte um pouco sobre a sua loja
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--ev-line)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2, width: `${progressPct}%`,
              background: "linear-gradient(90deg, var(--ev-gold-bright), var(--ev-gold))",
              transition: "width .4s ease",
            }} />
          </div>
          <span style={{ fontSize: 11, color: "var(--ev-muted-2)", whiteSpace: "nowrap" }}>
            {steps.filter((s) => isStepDone(s.id, form)).length}/{steps.length}
          </span>
        </div>
      </div>

      {/* Progressive steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visibleSteps.map((step, i) => {
          const isActive = i === activeIdx;
          const done = isStepDone(step.id, form) && !isActive;

          return (
            <div key={step.id} ref={isActive ? bottomRef : undefined}>
              <CardInput
                answered={done}
                summary={step.summary(form)}
                onEdit={() => goTo(i)}
              >
                {renderActive(step.id)}
              </CardInput>
            </div>
          );
        })}
      </div>

      {/* Final CTA */}
      {activeIdx === steps.length - 1 && (
        <div style={{ marginTop: 24, paddingBottom: 48 }}>
          <button
            className="ev-btn"
            onClick={() => onSave(form)}
            disabled={!allRequiredDone}
            style={{ width: "100%", fontSize: 15, padding: "15px 24px" }}
          >
            {allRequiredDone ? "Iniciar diagnóstico →" : "Preencha os campos obrigatórios (nome, e-mail, WhatsApp e nome da loja)"}
          </button>
        </div>
      )}

      {/* Show CTA earlier if all required are done and still mid-form */}
      {activeIdx < steps.length - 1 && allRequiredDone && (
        <div style={{ marginTop: 20, paddingBottom: 8 }}>
          <button className="ev-btn-ghost" onClick={() => onSave(form)} style={{ width: "100%", fontSize: 13 }}>
            Pular o restante e iniciar diagnóstico →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function NextBtn({ disabled = false, onClick, label = "Continuar →" }: {
  disabled?: boolean; onClick: () => void; label?: string;
}) {
  return (
    <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
      <button className="ev-btn" disabled={disabled} onClick={onClick}>{label}</button>
    </div>
  );
}

function SelectInline({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <select className="ev-select" value={value} onChange={(e) => onChange(e.target.value)}
        style={{ paddingRight: 32 }}>
        <option value="">Selecione…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span style={{
        position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
        pointerEvents: "none", color: "var(--ev-muted-2)", fontSize: 11,
      }}>▾</span>
    </div>
  );
}
