-- ============================================================
-- ELITE DO VAREJO — Schema completo
-- Pode ser executado do zero em um projeto limpo.
-- Em projetos existentes, use as migrações individuais.
-- ============================================================

-- ── Função utilitária ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- ── usuarios ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  nome       text NOT NULL,
  email      text UNIQUE NOT NULL,
  whatsapp   text NOT NULL
);

DROP TRIGGER IF EXISTS usuarios_updated_at ON usuarios;
CREATE TRIGGER usuarios_updated_at
  BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "usuarios_insert" ON usuarios FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "usuarios_update" ON usuarios FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "usuarios_select" ON usuarios FOR SELECT USING (true);

-- ── lojas ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lojas (
  id                      uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now(),

  usuario_id              uuid REFERENCES usuarios(id) ON DELETE SET NULL,

  nome_loja               text NOT NULL,
  descricao_loja          text,
  segmento                text,
  quantidade_lojas        text,
  escopo_diagnostico      text,
  localizacao_tipo        text,
  cidade                  text,
  bairro                  text,

  quantidade_funcionarios text,
  quantidade_vendedores   text,
  faturamento_mensal      text,
  ticket_medio            text,
  vendas_dia_normal       text,
  vendas_dia_movimentado  text,

  produtos                jsonb DEFAULT '[]',
  datas_comerciais        text[] DEFAULT '{}',

  vendedores_entraram_12m text,
  vendedores_sairam_12m   text,
  tempo_casa_mais_antigo  text,
  tempo_casa_mais_novo    text,
  vendedores_junior       text,
  vendedores_experientes  text
);

DROP TRIGGER IF EXISTS lojas_updated_at ON lojas;
CREATE TRIGGER lojas_updated_at
  BEFORE UPDATE ON lojas FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE lojas ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "lojas_insert" ON lojas FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "lojas_update" ON lojas FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "lojas_select" ON lojas FOR SELECT USING (true);

-- ── diagnosticos ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS diagnosticos (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  session_id text UNIQUE NOT NULL,

  usuario_id uuid REFERENCES usuarios(id),
  loja_id    uuid REFERENCES lojas(id),

  -- Contato (fonte: usuarios)
  nome_responsavel text,
  email            text,
  whatsapp         text,

  -- Denormalizados de lojas para busca rápida sem JOIN
  nome_loja text,
  segmento  text,
  cidade    text,

  -- Perguntas abertas (O1..O10)
  open_answers jsonb DEFAULT '{}',

  -- Resultado
  score_total        integer,
  cohort_geral       text,
  scores_por_bloco   jsonb DEFAULT '{}',
  pontos_fortes      text[] DEFAULT '{}',
  pontos_criticos    text[] DEFAULT '{}',
  calibragem_ia      jsonb DEFAULT '{}',

  completed boolean DEFAULT false
);

DROP TRIGGER IF EXISTS diagnosticos_updated_at ON diagnosticos;
CREATE TRIGGER diagnosticos_updated_at
  BEFORE UPDATE ON diagnosticos FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_diagnosticos_usuario_id ON diagnosticos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_diagnosticos_loja_id    ON diagnosticos(loja_id);
CREATE INDEX IF NOT EXISTS idx_diagnosticos_email      ON diagnosticos(email);

ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "diag_insert" ON diagnosticos FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "diag_update" ON diagnosticos FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "diag_select" ON diagnosticos FOR SELECT USING (true);

-- ── respostas ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS respostas (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at     timestamptz DEFAULT now(),
  diagnostico_id uuid REFERENCES diagnosticos(id) ON DELETE CASCADE,
  session_id     text NOT NULL,
  questao_id     text NOT NULL,  -- "A1" … "G8"
  bloco          text NOT NULL,  -- "A" … "G"
  resposta       integer NOT NULL CHECK (resposta IN (0, 1, 2)),
  UNIQUE (session_id, questao_id)
);

ALTER TABLE respostas ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "resp_insert" ON respostas FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "resp_update" ON respostas FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "resp_select" ON respostas FOR SELECT USING (true);

-- ── Views ─────────────────────────────────────────────────────

-- Média e distribuição de cada pergunta entre todos os diagnósticos
CREATE OR REPLACE VIEW v_media_por_questao AS
SELECT
  questao_id,
  bloco,
  COUNT(*)                                     AS total_respostas,
  ROUND(AVG(resposta)::numeric, 2)             AS media,
  COUNT(*) FILTER (WHERE resposta = 0)         AS total_0,
  COUNT(*) FILTER (WHERE resposta = 1)         AS total_1,
  COUNT(*) FILTER (WHERE resposta = 2)         AS total_2
FROM respostas
GROUP BY questao_id, bloco
ORDER BY bloco, questao_id;

-- Score por bloco por diagnóstico completo, com dados da loja
CREATE OR REPLACE VIEW v_scores_por_bloco AS
SELECT
  r.session_id,
  l.nome_loja,
  l.segmento,
  l.cidade,
  d.cohort_geral,
  r.bloco,
  SUM(r.resposta) AS score_bloco
FROM respostas r
JOIN diagnosticos d ON d.session_id = r.session_id
LEFT JOIN lojas l   ON l.id = d.loja_id
WHERE d.completed = true
GROUP BY r.session_id, l.nome_loja, l.segmento, l.cidade, d.cohort_geral, r.bloco
ORDER BY r.session_id, r.bloco;

-- Visão consolidada por loja (último diagnóstico completo)
CREATE OR REPLACE VIEW v_lojas_diagnostico AS
SELECT DISTINCT ON (d.loja_id)
  l.id             AS loja_id,
  l.nome_loja,
  l.segmento,
  l.cidade,
  l.quantidade_lojas,
  u.nome           AS responsavel,
  u.email,
  u.whatsapp,
  d.score_total,
  d.cohort_geral,
  d.calibragem_ia,
  d.completed,
  d.updated_at     AS ultimo_diagnostico
FROM lojas l
LEFT JOIN diagnosticos d ON d.loja_id = l.id AND d.completed = true
LEFT JOIN usuarios u     ON u.id = l.usuario_id
ORDER BY d.loja_id, d.updated_at DESC;
