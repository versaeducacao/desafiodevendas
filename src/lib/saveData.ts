import { supabase } from "./supabase";
import type { StoreProfile } from "../data/questions";
import type { DiagnosticResult } from "../data/scoring";

const SESSION_KEY = "edv_session_id";

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function clearSessionId() {
  localStorage.removeItem(SESSION_KEY);
}

// ── Profile ───────────────────────────────────────────────────

export async function upsertProfile(profile: StoreProfile) {
  if (!supabase) return;
  const session_id = getSessionId();

  const produtos = [1, 2, 3, 4, 5].map((n) => ({
    nome: profile[`produto_${n}_nome` as keyof StoreProfile] as string,
    preco: profile[`produto_${n}_preco` as keyof StoreProfile] as string,
  })).filter((p) => p.nome);

  await supabase.from("diagnosticos").upsert({
    session_id,
    nome_responsavel:       profile.nome_responsavel,
    email:                  profile.email,
    whatsapp:               profile.whatsapp,
    nome_loja:              profile.nome_loja,
    quantidade_lojas:       profile.quantidade_lojas,
    escopo_diagnostico:     profile.escopo_diagnostico,
    segmento:               profile.segmento,
    localizacao_tipo:       profile.localizacao_tipo,
    cidade:                 profile.cidade,
    bairro:                 profile.bairro,
    descricao_loja:         profile.descricao_loja,
    quantidade_funcionarios: profile.quantidade_funcionarios,
    quantidade_vendedores:  profile.quantidade_vendedores,
    produtos,
    faturamento_mensal:     profile.faturamento_mensal,
    ticket_medio:           profile.ticket_medio,
    vendas_dia_normal:      profile.vendas_dia_normal,
    vendas_dia_movimentado: profile.vendas_dia_movimentado,
    vendedores_entraram_12m: profile.vendedores_entraram_12m,
    vendedores_sairam_12m:  profile.vendedores_sairam_12m,
    tempo_casa_mais_antigo: profile.tempo_casa_mais_antigo,
    tempo_casa_mais_novo:   profile.tempo_casa_mais_novo,
    vendedores_junior:      profile.vendedores_junior,
    vendedores_experientes: profile.vendedores_experientes,
    datas_comerciais:       profile.datas_comerciais,
    completed: false,
  }, { onConflict: "session_id" });
}

// ── Answers ───────────────────────────────────────────────────

export async function upsertAnswers(
  answers: Record<string, number>,
  openAnswers: Record<string, string>
) {
  if (!supabase) return;
  const session_id = getSessionId();

  // 1. Save open answers to main table
  await supabase.from("diagnosticos").upsert(
    { session_id, open_answers: openAnswers },
    { onConflict: "session_id" }
  );

  // 2. Upsert individual answer rows — one per question
  // Get the diagnostico id first
  const { data: diag } = await supabase
    .from("diagnosticos")
    .select("id")
    .eq("session_id", session_id)
    .single();

  if (!diag) return;

  const rows = Object.entries(answers).map(([questao_id, resposta]) => ({
    session_id,
    diagnostico_id: diag.id,
    questao_id,                     // e.g. "A1", "B3"
    bloco: questao_id.charAt(0),    // e.g. "A", "B"
    resposta,
  }));

  if (rows.length === 0) return;

  await supabase.from("respostas").upsert(rows, { onConflict: "session_id,questao_id" });
}

// ── Result ────────────────────────────────────────────────────

export async function saveResult(result: DiagnosticResult) {
  if (!supabase) return;
  const session_id = getSessionId();

  await supabase.from("diagnosticos").upsert({
    session_id,
    score_total:      result.totalScore,
    cohort_geral:     result.generalCohort,
    scores_por_bloco: Object.fromEntries(
      result.blockScores.map((b) => [
        b.id,
        { score: b.score, max: b.max, cohort: b.cohort },
      ])
    ),
    pontos_fortes:    result.strengths,
    pontos_criticos:  result.criticalPoints,
    calibragem_ia:    result.aiCalibration,
    completed: true,
  }, { onConflict: "session_id" });
}
