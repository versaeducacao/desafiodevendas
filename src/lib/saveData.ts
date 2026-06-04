import { supabase } from "./supabase";
import { BLOCKS } from "../data/questions";
import type { StoreProfile } from "../data/questions";
import type { DiagnosticResult } from "../data/scoring";

// Gera string compacta das respostas na ordem A1..G6
// Ex: "21210021201101..." — posição = ordem das perguntas, valor = 0/1/2 ou "-" se não respondido
export function generateStringPerfil(answers: Record<string, number>): string {
  return BLOCKS.flatMap((block) =>
    block.questions.map((_, i) => {
      const key = `${block.id}${i + 1}`;
      return answers[key] !== undefined ? String(answers[key]) : "-";
    })
  ).join("");
}

const SESSION_KEY = "edv_session_id";
const USER_ID_KEY  = "edv_user_id";

// ── Session helpers ───────────────────────────────────────────

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, id); }
  return id;
}

export function setSessionId(id: string) {
  localStorage.setItem(SESSION_KEY, id);
}

export function getUserId(): string | null {
  return localStorage.getItem(USER_ID_KEY);
}

export function setUserId(id: string) {
  localStorage.setItem(USER_ID_KEY, id);
}

export function clearSessionId() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(LOJA_ID_KEY);
}

// ── Tipos ─────────────────────────────────────────────────────

export interface ExistingSession {
  usuario_id: string;
  nome: string;
  session_id: string;
  diagnostico_id: string;
  completed: boolean;
  nome_loja: string | null;
  updated_at: string;
}

// ── Verificar usuário por email ───────────────────────────────
// Retorna null se não existe, ou os dados da sessão mais recente

export async function checkUserByEmail(
  email: string
): Promise<ExistingSession | null> {
  if (!supabase) return null;

  const { data: usuario } = await supabase
    .from("usuarios")
    .select("id, nome")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();

  if (!usuario) return null;

  // Busca o diagnóstico mais recente desse usuário
  const { data: diag } = await supabase
    .from("diagnosticos")
    .select("id, session_id, completed, nome_loja, updated_at")
    .eq("usuario_id", usuario.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!diag) return null;

  return {
    usuario_id: usuario.id,
    nome: usuario.nome,
    session_id: diag.session_id,
    diagnostico_id: diag.id,
    completed: diag.completed,
    nome_loja: diag.nome_loja,
    updated_at: diag.updated_at,
  };
}

// ── Criar ou atualizar usuário ────────────────────────────────

export async function upsertUsuario(
  nome: string,
  email: string,
  whatsapp: string
): Promise<string | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("usuarios")
    .upsert(
      { nome, email: email.toLowerCase().trim(), whatsapp },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (error || !data) return null;
  setUserId(data.id);
  return data.id;
}

// ── Deletar diagnósticos anteriores de um usuário ────────────

export async function deletePreviousDiagnosticos(usuario_id: string) {
  if (!supabase) return;

  // Busca IDs de todos os diagnósticos do usuário
  const { data: diags } = await supabase
    .from("diagnosticos")
    .select("id")
    .eq("usuario_id", usuario_id);

  if (!diags?.length) return;

  const ids = diags.map((d) => d.id);

  // Deleta respostas vinculadas (cascade faria isso, mas garantimos)
  await supabase.from("respostas").delete().in("diagnostico_id", ids);
  await supabase.from("diagnosticos").delete().eq("usuario_id", usuario_id);
}

// ── Criar novo session_id e iniciar diagnóstico ───────────────

export function startNewSession(): string {
  const id = crypto.randomUUID();
  setSessionId(id);
  return id;
}

// ── Loja ──────────────────────────────────────────────────────

const LOJA_ID_KEY = "edv_loja_id";

export function getLojaId(): string | null {
  return localStorage.getItem(LOJA_ID_KEY);
}

export function setLojaId(id: string) {
  localStorage.setItem(LOJA_ID_KEY, id);
}

export function clearLojaId() {
  localStorage.removeItem(LOJA_ID_KEY);
}

async function upsertLoja(profile: StoreProfile, usuario_id: string | null): Promise<string | null> {
  if (!supabase) return null;

  const produtos = [1, 2, 3, 4, 5].map((n) => ({
    nome:  profile[`produto_${n}_nome`  as keyof StoreProfile] as string,
    preco: profile[`produto_${n}_preco` as keyof StoreProfile] as string,
  })).filter((p) => p.nome);

  const lojaData = {
    usuario_id,
    nome_loja:               profile.nome_loja,
    descricao_loja:          profile.descricao_loja,
    segmento:                profile.segmento,
    quantidade_lojas:        profile.quantidade_lojas,
    escopo_diagnostico:      profile.escopo_diagnostico,
    localizacao_tipo:        profile.localizacao_tipo,
    cidade:                  profile.cidade,
    bairro:                  profile.bairro,
    quantidade_funcionarios: profile.quantidade_funcionarios,
    quantidade_vendedores:   profile.quantidade_vendedores,
    faturamento_mensal:      profile.faturamento_mensal,
    ticket_medio:            profile.ticket_medio,
    vendas_dia_normal:       profile.vendas_dia_normal,
    vendas_dia_movimentado:  profile.vendas_dia_movimentado,
    produtos,
    datas_comerciais:        profile.datas_comerciais,
    vendedores_entraram_12m: profile.vendedores_entraram_12m,
    vendedores_sairam_12m:   profile.vendedores_sairam_12m,
    tempo_casa_mais_antigo:  profile.tempo_casa_mais_antigo,
    tempo_casa_mais_novo:    profile.tempo_casa_mais_novo,
    vendedores_junior:       profile.vendedores_junior,
    vendedores_experientes:  profile.vendedores_experientes,
  };

  const existingLojaId = getLojaId();

  if (existingLojaId) {
    // Atualiza loja existente
    await supabase.from("lojas").update(lojaData).eq("id", existingLojaId);
    return existingLojaId;
  } else {
    // Cria nova loja
    const { data } = await supabase.from("lojas").insert(lojaData).select("id").single();
    if (data?.id) { setLojaId(data.id); return data.id; }
    return null;
  }
}

// ── Profile ───────────────────────────────────────────────────

export async function upsertProfile(profile: StoreProfile) {
  if (!supabase) return;
  const session_id = getSessionId();
  const usuario_id = getUserId();

  // 1. Upsert loja
  const loja_id = await upsertLoja(profile, usuario_id);

  // 2. Upsert diagnóstico principal (dados denormalizados para busca rápida)
  await supabase.from("diagnosticos").upsert({
    session_id,
    usuario_id,
    loja_id,
    nome_responsavel: profile.nome_responsavel,
    email:            profile.email,
    whatsapp:         profile.whatsapp,
    // Denormalizados para consulta rápida sem JOIN
    nome_loja:        profile.nome_loja,
    segmento:         profile.segmento,
    cidade:           profile.cidade,
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

  await supabase.from("diagnosticos").upsert(
    { session_id, open_answers: openAnswers },
    { onConflict: "session_id" }
  );

  const { data: diag } = await supabase
    .from("diagnosticos")
    .select("id")
    .eq("session_id", session_id)
    .single();

  if (!diag) return;

  const rows = Object.entries(answers).map(([questao_id, resposta]) => ({
    session_id,
    diagnostico_id: diag.id,
    questao_id,
    bloco: questao_id.charAt(0),
    resposta,
  }));

  if (rows.length === 0) return;

  await supabase.from("respostas").upsert(rows, {
    onConflict: "session_id,questao_id",
  });
}

// ── Result ────────────────────────────────────────────────────

export async function saveResult(
  result: DiagnosticResult,
  answers: Record<string, number>
) {
  if (!supabase) return;
  const session_id = getSessionId();
  const loja_id    = getLojaId();

  // 1. Salva resultado no diagnóstico
  await supabase.from("diagnosticos").upsert({
    session_id,
    score_total:      result.totalScore,
    cohort_geral:     result.generalCohort,
    scores_por_bloco: Object.fromEntries(
      result.blockScores.map((b) => [b.id, { score: b.score, max: b.max, cohort: b.cohort }])
    ),
    pontos_fortes:   result.strengths,
    pontos_criticos: result.criticalPoints,
    calibragem_ia:   result.aiCalibration,
    completed: true,
  }, { onConflict: "session_id" });

  // 2. Gera e salva string_perfil na loja (rag_perfil fica vazio para preenchimento via API)
  if (loja_id) {
    const string_perfil = generateStringPerfil(answers);
    await supabase.from("lojas")
      .update({ string_perfil })
      .eq("id", loja_id);
  }
}
