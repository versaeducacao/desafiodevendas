# Diagnóstico de Loja para Calibragem de IA de Desafios Semanais

## 1. Objetivo

Este documento define a estrutura de um questionário para coletar informações sobre uma loja varejista e gerar um diagnóstico que permita calibrar uma IA responsável por criar desafios semanais, onboarding de vendedores, campanhas sazonais, coach de vendas e recomendações de gestão.

O diagnóstico deve ajudar a identificar:

1. Perfil da loja.
2. Tipo de cliente e jornada de compra.
3. Tamanho e potencial da operação.
4. Maturidade gerencial.
5. Maturidade da liderança.
6. Maturidade do time de vendas.
7. Fit para desafios semanais com IA.
8. Recomendações práticas para a próxima etapa do produto.

A lógica central é: o questionário não deve apenas classificar a loja. Ele deve definir o que a IA fará na prática.

---

## 2. Tipos de campos

A ferramenta deve trabalhar com três tipos de campos:

### 2.1. Campos cadastrais

Campos abertos, numéricos ou de seleção. Não entram no score, mas alimentam a personalização da IA.

Exemplos:

- Nome da loja.
- Segmento.
- O que vende.
- Localização.
- Tamanho em metros quadrados.
- Top 5 produtos mais vendidos e preço médio.
- Faturamento mensal.
- Faturamento semanal.
- Número de funcionários.
- Número de vendedores.
- Ticket médio.
- Número médio de vendas por dia.
- Datas comerciais importantes.
- Tempo de casa do funcionário mais antigo.
- Tempo de casa do funcionário mais novo.
- Entradas e saídas de vendedores nos últimos 12 meses.

### 2.2. Perguntas pontuadas

Todas as perguntas pontuadas devem usar a escala:

```txt
0 = Não / não sabe / não faz
1 = Minimamente / faz às vezes / faz informalmente
2 = Muito / faz com consistência / mede / acompanha / usa para decidir
```

### 2.3. Perguntas abertas

Não entram no score, mas ajudam a IA a gerar recomendações mais específicas.

Exemplos:

- Qual é o maior desafio comercial da loja hoje?
- O que você gostaria que seus vendedores fizessem melhor?
- O que já tentou para treinar o time?
- Que tipo de desafio semanal seu time aceitaria?
- Que tipo de desafio seu time rejeitaria?

---

# 3. Estrutura do questionário

## Parte 1 — Cadastro básico da loja

Estes campos não entram no score.

| Campo | Tipo sugerido | Observação |
|---|---|---|
| nome_loja | texto | Nome fantasia da loja |
| descricao_loja | texto | O que a loja vende |
| segmento | select | Segmento principal |
| localizacao_tipo | select | Shopping, rua, centro comercial, galeria, quiosque etc. |
| cidade | texto | Cidade |
| bairro | texto | Bairro |
| tamanho_m2 | número | Área aproximada da loja |
| produto_1_nome | texto | Produto ou categoria mais vendido |
| produto_1_preco_medio | número | Preço médio |
| produto_2_nome | texto | Produto ou categoria |
| produto_2_preco_medio | número | Preço médio |
| produto_3_nome | texto | Produto ou categoria |
| produto_3_preco_medio | número | Preço médio |
| produto_4_nome | texto | Produto ou categoria |
| produto_4_preco_medio | número | Preço médio |
| produto_5_nome | texto | Produto ou categoria |
| produto_5_preco_medio | número | Preço médio |
| datas_comerciais_fortes | multiselect | Dia das Mães, Natal, Black Friday etc. |

### Opções sugeridas para segmento

- Moda feminina
- Moda masculina
- Moda infantil
- Calçados
- Ótica
- Cosméticos
- Acessórios
- Casa e decoração
- Eletrônicos
- Alimentação
- Perfumaria
- Presentes
- Outro

### Opções sugeridas para localização

- Shopping
- Centro comercial
- Rua
- Galeria
- Quiosque
- Loja dentro de outro estabelecimento
- Outro

---

# 4. Blocos pontuados

## Bloco A — Clareza sobre tipo de loja, mix e produto

**Objetivo:** entender se a loja sabe o que vende, quais produtos importam e como o mix pode ser usado em desafios.

**Pontuação máxima:** 16 pontos  
**Número de perguntas:** 8  
**Escala:** 0 a 2 por pergunta

| ID | Pergunta |
|---|---|
| A1 | Você sabe dizer claramente quais produtos ou categorias mais puxam o faturamento da loja? |
| A2 | Você sabe quais produtos têm maior margem ou são mais interessantes para vender? |
| A3 | O time sabe quais produtos devem ser priorizados em uma venda? |
| A4 | A loja tem produtos que exigem explicação, demonstração ou argumentação do vendedor? |
| A5 | A loja tem produtos complementares que poderiam ser oferecidos junto com a compra principal? |
| A6 | O time sabe quais combinações de produtos aumentam o ticket médio? |
| A7 | A loja muda o foco de venda conforme campanha, coleção, estoque ou sazonalidade? |
| A8 | A loja tem clareza sobre quais produtos costumam gerar mais dúvidas ou objeções dos clientes? |

### Cohorts do Bloco A

| Pontuação | Cohort |
|---|---|
| 0 a 5 | Baixa clareza de mix |
| 6 a 10 | Clareza parcial |
| 11 a 13 | Boa clareza comercial |
| 14 a 16 | Mix bem gerido e pronto para desafios específicos |

---

## Bloco B — Tipo de cliente e jornada de compra

**Objetivo:** entender se a venda é assistida, consultiva, recorrente ou mais próxima de autosserviço.

**Pontuação máxima:** 14 pontos  
**Número de perguntas:** 7

| ID | Pergunta |
|---|---|
| B1 | Você consegue descrever quem é o principal cliente da loja? |
| B2 | Quando um cliente entra, o vendedor influencia muito o que ele leva, ou a pessoa já chega sabendo? |
| B3 | O cliente costuma pedir ajuda para escolher, comparar ou decidir? |
| B4 | O time sabe identificar diferentes perfis de cliente e adaptar a abordagem? |
| B5 | A loja conhece as principais objeções dos clientes antes da compra? |
| B6 | A loja sabe quais motivos fazem o cliente desistir da compra? |
| B7 | Existe alguma rotina para registrar perguntas, objeções ou dúvidas frequentes dos clientes? |

### Cohorts do Bloco B

| Pontuação | Cohort |
|---|---|
| 0 a 4 | Cliente pouco mapeado |
| 5 a 8 | Entendimento intuitivo do cliente |
| 9 a 11 | Boa leitura de cliente e objeções |
| 12 a 14 | Venda bem calibrada por perfil de cliente |

---

## Bloco C — Tamanho da operação e potencial comercial

**Objetivo:** medir se a loja acompanha volume, vendas, ticket e desempenho por vendedor.

### Campos cadastrais associados

| Campo | Tipo |
|---|---|
| faturamento_mensal_medio | número |
| faturamento_semanal_medio | número |
| vendas_dia_normal | número |
| vendas_dia_movimentado | número |
| ticket_medio | número |
| quantidade_funcionarios | número |
| quantidade_vendedores | número |
| turnos_operacao | número |

**Pontuação máxima:** 16 pontos  
**Número de perguntas:** 8

| ID | Pergunta |
|---|---|
| C1 | Você acompanha o faturamento semanal da loja? |
| C2 | Você acompanha o faturamento por vendedor? |
| C3 | Você sabe o ticket médio da loja e olha esse número com frequência? |
| C4 | Você acompanha peças por atendimento, itens por venda ou produtos por venda? |
| C5 | Você sabe quantas vendas cada vendedor faz por semana? |
| C6 | Você sabe quais vendedores convertem melhor atendimento em venda? |
| C7 | Você compara dias fortes e dias fracos para entender o que mudou? |
| C8 | Você usa esses números para definir metas ou desafios para o time? |

### Cohorts do Bloco C

| Pontuação | Cohort |
|---|---|
| 0 a 5 | Operação pouco medida |
| 6 a 10 | Operação parcialmente acompanhada |
| 11 a 13 | Boa visibilidade comercial |
| 14 a 16 | Operação bem medida e pronta para metas semanais |

---

## Bloco D — Maturidade gerencial da loja

**Objetivo:** entender se existem sistemas, rotinas e processos que sustentam a operação.

**Pontuação máxima:** 20 pontos  
**Número de perguntas:** 10

| ID | Pergunta |
|---|---|
| D1 | A loja usa algum sistema de vendas, ERP, PDV ou planilha para acompanhar resultados? |
| D2 | Os dados de venda são confiáveis e atualizados com frequência? |
| D3 | A loja tem metas claras por semana ou por mês? |
| D4 | As metas são desdobradas por vendedor? |
| D5 | A loja acompanha resultado durante o período, e não só no fechamento do mês? |
| D6 | Existe rotina de fechamento ou leitura de resultado semanal? |
| D7 | A loja sabe quais indicadores precisa melhorar quando as vendas caem? |
| D8 | Existem campanhas internas, prêmios ou incentivos para movimentar o time? |
| D9 | A loja registra aprendizados de campanhas anteriores? |
| D10 | A gestão consegue transformar números em ações práticas para os vendedores? |

### Cohorts do Bloco D

| Pontuação | Cohort |
|---|---|
| 0 a 6 | Gestão informal |
| 7 a 12 | Gestão básica |
| 13 a 16 | Gestão estruturada |
| 17 a 20 | Gestão orientada por dados e ação |

---

## Bloco E — Maturidade da liderança da loja

**Objetivo:** medir se dono ou gerente consegue sustentar feedback, acompanhamento e rotina semanal.

**Pontuação máxima:** 20 pontos  
**Número de perguntas:** 10

| ID | Pergunta |
|---|---|
| E1 | O gerente ou dono conversa com o time sobre metas toda semana? |
| E2 | O gerente acompanha indicadores de venda de forma recorrente? |
| E3 | O gerente sabe quais indicadores cada vendedor precisa melhorar? |
| E4 | O gerente dá feedback individual para os vendedores? |
| E5 | Esse feedback é estruturado, com exemplos e próximos passos? |
| E6 | O gerente reconhece boas práticas quando alguém vende bem? |
| E7 | O gerente corrige comportamentos de venda ruins antes que virem padrão? |
| E8 | O gerente consegue explicar para o time o motivo de uma meta ou desafio? |
| E9 | O gerente acompanha se o vendedor aplicou o combinado depois do feedback? |
| E10 | O gerente tem tempo e disciplina para rodar uma rotina semanal simples com o time? |

### Cohorts do Bloco E

| Pontuação | Cohort |
|---|---|
| 0 a 6 | Liderança reativa |
| 7 a 12 | Liderança presente, mas informal |
| 13 a 16 | Liderança ativa e com rotina |
| 17 a 20 | Liderança forte para sustentar evolução semanal |

---

## Bloco F — Maturidade do time de vendas

**Objetivo:** entender nível do time, dependência de talentos individuais, necessidade de onboarding e risco de turnover.

### Campos cadastrais associados

| Campo | Tipo |
|---|---|
| vendedores_entraram_12m | número |
| vendedores_sairam_12m | número |
| tempo_casa_mais_antigo | texto ou número |
| tempo_casa_mais_novo | texto ou número |
| vendedores_junior | número |
| vendedores_experientes | número |

**Pontuação máxima:** 18 pontos  
**Número de perguntas:** 9

| ID | Pergunta |
|---|---|
| F1 | O time atual domina bem os produtos da loja? |
| F2 | O time sabe abordar clientes de forma consistente? |
| F3 | O time sabe contornar objeções comuns? |
| F4 | O time sabe oferecer produtos complementares? |
| F5 | O desempenho dos vendedores é parecido entre si, sem muita dependência de uma ou duas pessoas? |
| F6 | Quando entra um vendedor novo, existe um processo claro de integração? |
| F7 | O vendedor novo recebe orientação prática nos primeiros dias? |
| F8 | A loja consegue saber rapidamente se um vendedor novo está evoluindo ou ficando para trás? |
| F9 | O turnover da loja é baixo ou controlado? |

### Cohorts do Bloco F

| Pontuação | Cohort |
|---|---|
| 0 a 6 | Time frágil ou muito dependente |
| 7 a 11 | Time em formação |
| 12 a 15 | Time funcional, com pontos de evolução |
| 16 a 18 | Time maduro e pronto para desafios mais sofisticados |

---

## Bloco G — Fit para desafios semanais e IA

**Objetivo:** medir se a loja está pronta para usar IA em desafios semanais, coach diário, onboarding e campanhas comerciais.

**Pontuação máxima:** 16 pontos  
**Número de perguntas:** 8

| ID | Pergunta |
|---|---|
| G1 | A loja já usa metas semanais ou poderia adotar esse ritmo com facilidade? |
| G2 | O time aceitaria desafios simples de venda toda semana? |
| G3 | Existe algum tipo de comissão, prêmio ou incentivo por venda? |
| G4 | O gerente conseguiria comunicar o desafio da semana para o time? |
| G5 | O gerente conseguiria acompanhar se o desafio foi executado? |
| G6 | O time usa WhatsApp no dia a dia da operação? |
| G7 | Seria útil ter uma IA respondendo dúvidas de venda, produto ou objeção no momento do atendimento? |
| G8 | Seria útil ter missões especiais antes de datas comerciais importantes? |

### Cohorts do Bloco G

| Pontuação | Cohort |
|---|---|
| 0 a 5 | Baixo fit imediato |
| 6 a 10 | Fit moderado, precisa de simplicidade |
| 11 a 13 | Bom fit para piloto |
| 14 a 16 | Alto fit para rotina semanal com IA |

---

# 5. Perguntas abertas finais

Essas perguntas não entram no score.

| ID | Pergunta |
|---|---|
| O1 | Qual é o maior desafio comercial da loja hoje? |
| O2 | O que você mais gostaria que seus vendedores fizessem melhor? |
| O3 | O que já tentou fazer para treinar ou melhorar o time? |
| O4 | Da última vez que contratou um vendedor, o que você fez para ele aprender a vender? |
| O5 | Já contratou treinamento antes? O que funcionou e o que não funcionou? |
| O6 | O que normalmente impede o time de vender mais? |
| O7 | Qual comportamento você gostaria de ver acontecendo toda semana na loja? |
| O8 | Que tipo de desafio semanal você acha que seu time toparia fazer? |
| O9 | Que tipo de desafio você acha que seu time rejeitaria? |
| O10 | Se a loja melhorasse uma coisa nos próximos 30 dias, o que deveria ser? |

---

# 6. Score geral

## 6.1. Pontuação máxima por bloco

| Bloco | Pontuação máxima |
|---|---:|
| Bloco A — Clareza sobre mix e produto | 16 |
| Bloco B — Cliente e jornada | 14 |
| Bloco C — Operação e potencial comercial | 16 |
| Bloco D — Maturidade gerencial | 20 |
| Bloco E — Maturidade da liderança | 20 |
| Bloco F — Maturidade do time | 18 |
| Bloco G — Fit para IA e desafios | 16 |
| **Total** | **120** |

## 6.2. Cohorts gerais

| Pontuação total | Cohort geral |
|---|---|
| 0 a 41 | Loja Inicial |
| 42 a 77 | Loja Emergente |
| 78 a 101 | Loja Preparada |
| 102 a 120 | Loja Avançada |

---

# 7. Diagnóstico geral por cohort

## 7.1. Loja Inicial

A loja tem pouca estrutura de gestão, baixa clareza de indicadores ou pouca rotina de liderança.

### Recomendação de produto

- Começar com 1 desafio simples por semana.
- Usar linguagem muito prática.
- Evitar métricas complexas.
- Focar em comportamento visível de venda.
- Priorizar abordagem, oferta complementar, contorno de objeção e fechamento.
- A IA deve sugerir desafios simples e scripts de execução.

## 7.2. Loja Emergente

A loja já tem alguma gestão e percepção comercial, mas ainda opera de forma parcialmente informal.

### Recomendação de produto

- Usar desafios semanais simples.
- Associar cada desafio a uma microaula curta.
- Começar a acompanhar ticket médio, vendas por vendedor e itens por venda.
- Usar reconhecimento, comissão ou prêmio simples quando existir.
- A IA deve ajudar o gerente a transformar objetivos em ações semanais.

## 7.3. Loja Preparada

A loja tem boa estrutura, acompanha indicadores e possui liderança capaz de sustentar cadência semanal.

### Recomendação de produto

- Aplicar desafios por vendedor ou por habilidade.
- Usar metas semanais mais claras.
- Inserir onboarding estruturado para novos vendedores.
- Usar campanhas sazonais antes de datas comerciais.
- Usar coach de IA para dúvidas de produto, abordagem e objeção.

## 7.4. Loja Avançada

A loja tem gestão madura, liderança ativa, dados e time preparado para evolução contínua.

### Recomendação de produto

- Usar régua completa de evolução.
- Criar ranking interno.
- Comparar lojas, se houver rede, shopping ou associação.
- Programar campanhas sazonais.
- Criar critérios de manutenção de selo ou certificação.
- Gerar desafios ligados a indicadores específicos: ticket médio, conversão, PA, recompra, mix e margem.

---

# 8. Regras para pontos fortes e pontos críticos

## 8.1. Pontos fortes

Considerar como ponto forte qualquer bloco em que a loja atinja pelo menos 75% da pontuação máxima.

| Bloco | Pontuação para ponto forte |
|---|---:|
| Bloco A | 12 pontos ou mais |
| Bloco B | 11 pontos ou mais |
| Bloco C | 12 pontos ou mais |
| Bloco D | 15 pontos ou mais |
| Bloco E | 15 pontos ou mais |
| Bloco F | 14 pontos ou mais |
| Bloco G | 12 pontos ou mais |

## 8.2. Pontos críticos

Considerar como ponto crítico qualquer bloco em que a loja fique abaixo de 40% da pontuação máxima.

| Bloco | Pontuação para ponto crítico |
|---|---:|
| Bloco A | 0 a 6 |
| Bloco B | 0 a 5 |
| Bloco C | 0 a 6 |
| Bloco D | 0 a 8 |
| Bloco E | 0 a 8 |
| Bloco F | 0 a 7 |
| Bloco G | 0 a 6 |

---

# 9. Regras de recomendação para a IA

## 9.1. Se Bloco A for baixo

A IA deve evitar desafios muito específicos de produto no início.

### Priorizar

- Mapear produtos mais vendidos.
- Criar desafio de oferta complementar.
- Criar desafio de top 3 produtos da semana.
- Criar desafio de argumentação de produto.

## 9.2. Se Bloco B for baixo

A IA deve priorizar entendimento do cliente.

### Priorizar

- Desafio de registrar dúvidas dos clientes.
- Desafio de mapear objeções.
- Desafio de adaptar abordagem por perfil.
- Scripts simples de abertura de atendimento.

## 9.3. Se Bloco C for baixo

A IA deve evitar desafios baseados em métricas sofisticadas.

### Priorizar

- Quantidade de abordagens.
- Quantidade de ofertas complementares.
- Número de clientes atendidos.
- Registro simples de vendas por vendedor.

## 9.4. Se Bloco D for baixo

A IA deve simplificar a gestão.

### Priorizar

- Rotina semanal básica.
- Meta única da semana.
- Fechamento simples na sexta ou sábado.
- Evitar dashboards complexos.

## 9.5. Se Bloco E for baixo

A IA deve apoiar o gerente com roteiro pronto.

### Priorizar

- Script de reunião semanal.
- Frases de feedback.
- Como reconhecer boas práticas.
- Como corrigir comportamento sem criar conflito.

## 9.6. Se Bloco F for baixo

A IA deve priorizar onboarding e fundamentos de venda.

### Priorizar

- Trilhas para novatos.
- Microdesafios de abordagem.
- Treino de objeções.
- Padronização de atendimento.

## 9.7. Se Bloco G for baixo

A IA deve começar com baixa fricção.

### Priorizar

- Desafios curtos.
- Pouca cobrança.
- Sem ranking no início.
- Sem muitos indicadores.
- Uma rotina simples por semana.

---

# 10. Saída esperada da ferramenta

A ferramenta deve retornar, no mínimo:

1. Score total.
2. Cohort geral.
3. Score por bloco.
4. Cohort por bloco.
5. Pontos fortes.
6. Pontos críticos.
7. Diagnóstico resumido.
8. Recomendação de cadência.
9. Tipos de desafio semanal recomendados.
10. Recomendações para calibrar a IA.

## 10.1. Exemplo de saída em JSON

```json
{
  "score_total": 84,
  "cohort_geral": "Loja Preparada",
  "scores_por_bloco": {
    "clareza_mix_produto": {
      "score": 12,
      "max": 16,
      "cohort": "Boa clareza comercial"
    },
    "cliente_jornada": {
      "score": 9,
      "max": 14,
      "cohort": "Boa leitura de cliente e objeções"
    },
    "operacao_potencial": {
      "score": 11,
      "max": 16,
      "cohort": "Boa visibilidade comercial"
    },
    "maturidade_gerencial": {
      "score": 14,
      "max": 20,
      "cohort": "Gestão estruturada"
    },
    "maturidade_lideranca": {
      "score": 13,
      "max": 20,
      "cohort": "Liderança ativa e com rotina"
    },
    "maturidade_time": {
      "score": 12,
      "max": 18,
      "cohort": "Time funcional, com pontos de evolução"
    },
    "fit_ia_desafios": {
      "score": 13,
      "max": 16,
      "cohort": "Bom fit para piloto"
    }
  },
  "pontos_fortes": [
    "Boa clareza sobre mix e produtos",
    "Bom fit para desafios semanais com IA"
  ],
  "pontos_criticos": [],
  "diagnostico_resumido": "A loja tem boa base para iniciar um fluxo de desafios semanais. Já possui alguma visibilidade comercial, liderança ativa e contexto suficiente para a IA sugerir desafios conectados ao mix, cliente e rotina de vendas.",
  "recomendacao_cadencia": "Iniciar com 1 desafio semanal, acompanhado de microtreino e fechamento simples no fim da semana.",
  "tipos_de_desafio_recomendados": [
    "Oferta complementar",
    "Contorno de objeções",
    "Aumento de ticket médio",
    "Campanha sazonal",
    "Desafio por vendedor"
  ],
  "calibragem_ia": {
    "nivel_complexidade": "intermediario",
    "usar_metricas": true,
    "usar_ranking": false,
    "usar_onboarding": true,
    "usar_campanhas_sazonais": true,
    "usar_coach_whatsapp": true
  }
}
```

---

# 11. Schema conceitual para implementação

## 11.1. Estrutura de pergunta pontuada

```json
{
  "id": "A1",
  "block": "clareza_mix_produto",
  "label": "Você sabe dizer claramente quais produtos ou categorias mais puxam o faturamento da loja?",
  "type": "score",
  "scale": {
    "0": "Não / não sabe / não faz",
    "1": "Minimamente / faz às vezes / faz informalmente",
    "2": "Muito / faz com consistência / mede / acompanha / usa para decidir"
  },
  "required": true
}
```

## 11.2. Estrutura de bloco

```json
{
  "id": "clareza_mix_produto",
  "name": "Clareza sobre tipo de loja, mix e produto",
  "max_score": 16,
  "questions": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  "cohorts": [
    {
      "min": 0,
      "max": 5,
      "label": "Baixa clareza de mix"
    },
    {
      "min": 6,
      "max": 10,
      "label": "Clareza parcial"
    },
    {
      "min": 11,
      "max": 13,
      "label": "Boa clareza comercial"
    },
    {
      "min": 14,
      "max": 16,
      "label": "Mix bem gerido e pronto para desafios específicos"
    }
  ]
}
```

## 11.3. Estrutura de diagnóstico final

```json
{
  "store_profile": {},
  "answers": {},
  "block_scores": {},
  "total_score": 0,
  "general_cohort": "",
  "strengths": [],
  "critical_points": [],
  "recommendations": {
    "cadence": "",
    "challenge_types": [],
    "ai_calibration": {}
  }
}
```

---

# 12. Lógica de cálculo

## 12.1. Score por bloco

Para cada bloco:

```txt
score_bloco = soma das respostas pontuadas do bloco
```

Cada pergunta deve aceitar apenas:

```txt
0, 1 ou 2
```

## 12.2. Score total

```txt
score_total = score_A + score_B + score_C + score_D + score_E + score_F + score_G
```

## 12.3. Cohort por bloco

A ferramenta deve comparar o score do bloco com a tabela de cohorts daquele bloco.

## 12.4. Cohort geral

A ferramenta deve comparar o score total com a tabela:

```txt
0 a 41 = Loja Inicial
42 a 77 = Loja Emergente
78 a 101 = Loja Preparada
102 a 120 = Loja Avançada
```

---

# 13. Tradução do diagnóstico em decisões de produto

A ferramenta deve transformar as respostas em decisões práticas para a IA:

| Pergunta de produto | Como decidir |
|---|---|
| Qual desafio criar? | Usar blocos mais baixos e objetivos abertos |
| Qual métrica usar? | Depende do Bloco C e D |
| Qual linguagem usar? | Depende do cohort geral |
| Qual nível de cobrança aplicar? | Depende do Bloco E e G |
| O gerente precisa de roteiro pronto? | Se Bloco E for baixo |
| O time precisa de onboarding? | Se Bloco F for baixo ou turnover alto |
| A loja já pode usar ranking? | Se Bloco D, E e G forem altos |
| A loja pode receber campanha sazonal? | Se Bloco A e G forem médios ou altos |
| A IA deve responder dúvidas de produto e objeção? | Se Bloco A, B ou G indicarem oportunidade |

---

# 14. Recomendações automáticas por combinação de blocos

## 14.1. Bloco C baixo + Bloco D baixo

Diagnóstico: a loja mede pouco e tem pouca rotina de gestão.

Recomendação:

- Não começar por dashboards.
- Começar por desafios comportamentais.
- Criar rotina semanal simples.
- Registrar poucos dados manualmente.

## 14.2. Bloco B baixo + Bloco F baixo

Diagnóstico: o time ainda não entende bem o cliente nem domina abordagem.

Recomendação:

- Priorizar fundamentos de atendimento.
- Criar scripts simples.
- Treinar perguntas de abertura.
- Registrar objeções reais.

## 14.3. Bloco A alto + Bloco C baixo

Diagnóstico: a loja conhece o produto, mas mede pouco.

Recomendação:

- Criar desafios de produto sem depender de indicador avançado.
- Usar foco semanal em categorias.
- Medir apenas volume de ofertas e vendas geradas.

## 14.4. Bloco D alto + Bloco E alto + Bloco G alto

Diagnóstico: loja pronta para uma rotina mais robusta.

Recomendação:

- Usar metas por vendedor.
- Criar ranking.
- Usar coach de IA.
- Aplicar campanhas sazonais.
- Evoluir para selo ou certificação.

## 14.5. Bloco F baixo + turnover alto

Diagnóstico: loja precisa de onboarding e padronização.

Recomendação:

- Criar trilha de novato.
- Fazer desafios de primeiros dias.
- Usar checklists de atendimento.
- Medir evolução dos novos vendedores.

---

# 15. Parâmetros sugeridos de calibragem da IA

A saída final pode alimentar os seguintes parâmetros:

| Parâmetro | Valores possíveis |
|---|---|
| nivel_complexidade | basico, intermediario, avancado |
| usar_metricas | true, false |
| usar_ranking | true, false |
| usar_onboarding | true, false |
| usar_campanhas_sazonais | true, false |
| usar_coach_whatsapp | true, false |
| usar_scripts_feedback | true, false |
| usar_desafios_por_vendedor | true, false |
| usar_desafios_comportamentais | true, false |
| usar_desafios_por_produto | true, false |
| usar_desafios_por_cliente | true, false |

## 15.1. Regras sugeridas

```txt
Se score_total <= 41:
  nivel_complexidade = basico
  usar_metricas = false
  usar_ranking = false
  usar_onboarding = true
  usar_campanhas_sazonais = false
  usar_coach_whatsapp = true
  usar_scripts_feedback = true
  usar_desafios_por_vendedor = false
  usar_desafios_comportamentais = true

Se score_total entre 42 e 77:
  nivel_complexidade = basico/intermediario
  usar_metricas = true se Bloco C >= 8
  usar_ranking = false
  usar_onboarding = true
  usar_campanhas_sazonais = true se Bloco A >= 8
  usar_coach_whatsapp = true
  usar_scripts_feedback = true
  usar_desafios_por_vendedor = false ou gradual
  usar_desafios_comportamentais = true

Se score_total entre 78 e 101:
  nivel_complexidade = intermediario
  usar_metricas = true
  usar_ranking = true se Bloco E >= 13 e Bloco G >= 11
  usar_onboarding = true
  usar_campanhas_sazonais = true
  usar_coach_whatsapp = true
  usar_scripts_feedback = true se Bloco E < 17
  usar_desafios_por_vendedor = true
  usar_desafios_comportamentais = true

Se score_total >= 102:
  nivel_complexidade = avancado
  usar_metricas = true
  usar_ranking = true
  usar_onboarding = true
  usar_campanhas_sazonais = true
  usar_coach_whatsapp = true
  usar_scripts_feedback = false ou opcional
  usar_desafios_por_vendedor = true
  usar_desafios_comportamentais = true
```

---

# 16. Observação de produto

A ferramenta deve evitar gerar diagnósticos genéricos.

O diagnóstico precisa sempre responder:

1. Onde a loja está hoje?
2. O que ela já tem de bom?
3. O que está travando evolução?
4. Que tipo de desafio semanal faz mais sentido?
5. Qual é o nível de complexidade que a IA deve usar?
6. Qual cadência a loja consegue sustentar?
7. O gerente precisa de ajuda para liderar a rotina?
8. O time precisa de onboarding?
9. A loja pode usar campanhas sazonais?
10. A loja está pronta para ranking, selo ou comparação social?

---

# 17. Princípio de uso do diagnóstico

O diagnóstico deve alimentar um sistema de continuidade. A IA não deve despejar conteúdo de uma vez. Ela deve entregar a ação certa no momento certo:

- Desafio semanal como espinha da rotina.
- Onboarding quando entra vendedor novo.
- Coach diário quando surgem dúvidas ou objeções.
- Campanhas sazonais antes de datas comerciais.
- Progresso rumo a selo ou certificação.
- Comparação social apenas quando a loja tiver maturidade para isso.

