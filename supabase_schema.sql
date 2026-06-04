-- ============================================================
-- ELITE DO VAREJO — Diagnóstico de Loja
-- Execute no Supabase SQL Editor
-- ============================================================

-- ── Tabela principal ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS diagnosticos (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now(),
  session_id      text UNIQUE NOT NULL,

  -- Contato
  nome_responsavel  text,
  email             text,
  whatsapp          text,

  -- Loja
  nome_loja           text,
  quantidade_lojas    text,
  escopo_diagnostico  text,
  segmento            text,
  localizacao_tipo    text,
  cidade              text,
  bairro              text,
  descricao_loja      text,
  quantidade_funcionarios  text,
  quantidade_vendedores    text,

  -- Produtos (array de {nome, preco})
  produtos  jsonb DEFAULT '[]',

  -- Operação
  faturamento_mensal      text,
  ticket_medio            text,
  vendas_dia_normal       text,
  vendas_dia_movimentado  text,

  -- Time
  vendedores_entraram_12m  text,
  vendedores_sairam_12m    text,
  tempo_casa_mais_antigo   text,
  tempo_casa_mais_novo     text,
  vendedores_junior        text,
  vendedores_experientes   text,
  datas_comerciais         text[] DEFAULT '{}',

  -- Perguntas abertas (O1..O10)
  open_answers  jsonb DEFAULT '{}',

  -- Resultado agregado
  score_total        integer,
  cohort_geral       text,
  scores_por_bloco   jsonb DEFAULT '{}',
  pontos_fortes      text[] DEFAULT '{}',
  pontos_criticos    text[] DEFAULT '{}',
  calibragem_ia      jsonb DEFAULT '{}',

  -- Estado
  completed  boolean DEFAULT false
);

-- ── Tabela de respostas individuais ──────────────────────────
-- Uma linha por pergunta por diagnóstico.
-- questao_id: "A1" … "G8"
-- bloco:      "A"  … "G"
-- resposta:   0, 1 ou 2
CREATE TABLE IF NOT EXISTS respostas (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at     timestamptz DEFAULT now(),
  diagnostico_id uuid REFERENCES diagnosticos(id) ON DELETE CASCADE,
  session_id     text NOT NULL,
  questao_id     text NOT NULL,
  bloco          text NOT NULL,
  resposta       integer NOT NULL CHECK (resposta IN (0, 1, 2)),
  UNIQUE (session_id, questao_id)
);

-- ── Trigger: updated_at ───────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER diagnosticos_updated_at
  BEFORE UPDATE ON diagnosticos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── RLS ───────────────────────────────────────────────────────
ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE respostas    ENABLE ROW LEVEL SECURITY;

-- diagnosticos
CREATE POLICY "diag_insert" ON diagnosticos FOR INSERT WITH CHECK (true);
CREATE POLICY "diag_update" ON diagnosticos FOR UPDATE USING (true);
CREATE POLICY "diag_select" ON diagnosticos FOR SELECT USING (true);

-- respostas
CREATE POLICY "resp_insert" ON respostas FOR INSERT WITH CHECK (true);
CREATE POLICY "resp_update" ON respostas FOR UPDATE USING (true);
CREATE POLICY "resp_select" ON respostas FOR SELECT USING (true);

-- ── Views úteis ───────────────────────────────────────────────

-- Média de cada resposta por pergunta (para benchmark)
CREATE OR REPLACE VIEW v_media_por_questao AS
SELECT
  questao_id,
  bloco,
  COUNT(*)                          AS total_respostas,
  ROUND(AVG(resposta)::numeric, 2)  AS media,
  COUNT(*) FILTER (WHERE resposta = 0) AS pct_0,
  COUNT(*) FILTER (WHERE resposta = 1) AS pct_1,
  COUNT(*) FILTER (WHERE resposta = 2) AS pct_2
FROM respostas
GROUP BY questao_id, bloco
ORDER BY bloco, questao_id;

-- Score por bloco por diagnóstico completo
CREATE OR REPLACE VIEW v_scores_por_bloco AS
SELECT
  r.session_id,
  d.nome_loja,
  d.segmento,
  d.cidade,
  d.cohort_geral,
  r.bloco,
  SUM(r.resposta) AS score_bloco
FROM respostas r
JOIN diagnosticos d ON d.session_id = r.session_id
WHERE d.completed = true
GROUP BY r.session_id, d.nome_loja, d.segmento, d.cidade, d.cohort_geral, r.bloco
ORDER BY r.session_id, r.bloco;
