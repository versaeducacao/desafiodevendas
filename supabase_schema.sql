-- ============================================================
-- ELITE DO VAREJO — Diagnóstico de Loja
-- Execute no Supabase SQL Editor
-- ============================================================

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

  -- Respostas pontuadas (ex.: {"A1": 2, "B3": 1, ...})
  answers       jsonb DEFAULT '{}',

  -- Perguntas abertas (ex.: {"O1": "texto...", ...})
  open_answers  jsonb DEFAULT '{}',

  -- Resultado
  score_total        integer,
  cohort_geral       text,
  scores_por_bloco   jsonb DEFAULT '{}',
  pontos_fortes      text[] DEFAULT '{}',
  pontos_criticos    text[] DEFAULT '{}',
  calibragem_ia      jsonb DEFAULT '{}',

  -- Estado
  completed  boolean DEFAULT false
);

-- Atualiza updated_at automaticamente
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

-- RLS: qualquer um pode inserir/atualizar pelo session_id
ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_own" ON diagnosticos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "update_own" ON diagnosticos
  FOR UPDATE USING (true);

CREATE POLICY "select_own" ON diagnosticos
  FOR SELECT USING (true);
