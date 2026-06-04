export const SEGMENTOS = [
  "Moda feminina","Moda masculina","Moda infantil","Calçados","Ótica",
  "Cosméticos","Acessórios","Casa e decoração","Eletrônicos","Alimentação",
  "Perfumaria","Presentes","Outro",
];

export const LOCALIZACOES = [
  "Shopping","Centro comercial","Rua","Galeria","Quiosque",
  "Loja dentro de outro estabelecimento","Outro",
];

export const DATAS_COMERCIAIS = [
  "Natal","Dia das Mães","Dia dos Pais","Dia dos Namorados",
  "Black Friday","Páscoa","Dia das Crianças","Carnaval","Volta às aulas",
  "Dia do Cliente","Aniversário da loja","Outra",
];

export const QUANTIDADE_LOJAS_OPTIONS = [
  "Apenas 1",
  "Entre 2 e 5 lojas",
  "Entre 6 e 15 lojas",
  "Entre 16 e 30 lojas",
  "Entre 31 e 50 lojas",
  "Mais de 50 lojas",
] as const;

export function isMultiLoja(q: string) {
  return q !== "" && q !== "Apenas 1";
}

export interface StoreProfile {
  // contato
  nome_responsavel: string;
  email: string;
  whatsapp: string;
  // identidade
  nome_loja: string;
  quantidade_lojas: string;
  escopo_diagnostico: string; // "rede" | "loja_especifica" — só quando quantidade_lojas > 1
  descricao_loja: string;
  segmento: string;
  localizacao_tipo: string;
  cidade: string;
  bairro: string;
  tamanho_m2: string;
  // produtos top 5
  produto_1_nome: string; produto_1_preco: string;
  produto_2_nome: string; produto_2_preco: string;
  produto_3_nome: string; produto_3_preco: string;
  produto_4_nome: string; produto_4_preco: string;
  produto_5_nome: string; produto_5_preco: string;
  // operação
  faturamento_mensal: string;
  faturamento_semanal: string;
  vendas_dia_normal: string;
  vendas_dia_movimentado: string;
  ticket_medio: string;
  quantidade_funcionarios: string;
  quantidade_vendedores: string;
  // time
  vendedores_entraram_12m: string;
  vendedores_sairam_12m: string;
  tempo_casa_mais_antigo: string;
  tempo_casa_mais_novo: string;
  vendedores_junior: string;
  vendedores_experientes: string;
  // datas
  datas_comerciais: string[];
}

export const STORE_PROFILE_EMPTY: StoreProfile = {
  nome_responsavel: "", email: "", whatsapp: "",
  nome_loja: "", quantidade_lojas: "", escopo_diagnostico: "", descricao_loja: "", segmento: "",
  localizacao_tipo: "", cidade: "", bairro: "", tamanho_m2: "",
  produto_1_nome: "", produto_1_preco: "",
  produto_2_nome: "", produto_2_preco: "",
  produto_3_nome: "", produto_3_preco: "",
  produto_4_nome: "", produto_4_preco: "",
  produto_5_nome: "", produto_5_preco: "",
  faturamento_mensal: "", faturamento_semanal: "",
  vendas_dia_normal: "", vendas_dia_movimentado: "",
  ticket_medio: "", quantidade_funcionarios: "", quantidade_vendedores: "",
  vendedores_entraram_12m: "", vendedores_sairam_12m: "",
  tempo_casa_mais_antigo: "", tempo_casa_mais_novo: "",
  vendedores_junior: "", vendedores_experientes: "",
  datas_comerciais: [],
};

export const QUESTION_ANSWERS: Record<string, [string, string, string]> = {
  A1: ["Não consigo dizer com clareza quais produtos puxam mais o faturamento","Tenho uma ideia geral, mas não acompanho isso de forma precisa","Sei exatamente quais produtos lideram o faturamento e uso isso nas decisões"],
  A2: ["Não temos clareza sobre quais produtos têm maior margem","Sabemos de alguns, mas não de forma organizada ou completa","Conhecemos bem a margem dos principais produtos e priorizamos os mais rentáveis"],
  A3: ["O time não sabe o que priorizar — cada vendedor decide por conta própria","Alguns vendedores sabem, mas não é algo alinhado com todo o time","O time sabe quais produtos priorizar e isso é reforçado regularmente"],
  A4: ["Não — os produtos são simples e não exigem argumentação do vendedor","Alguns produtos exigem explicação, mas o time não está totalmente preparado","Sim, temos produtos que exigem demonstração e o time está bem treinado para isso"],
  A5: ["Não identificamos produtos complementares para oferecer junto com a compra","Sabemos que existem combinações, mas o time não oferece isso com consistência","Temos complementares mapeados e o time os oferece ativamente nas vendas"],
  A6: ["O time não conhece combinações que aumentam o ticket","Alguns vendedores conhecem algumas combinações, mas não é algo compartilhado com todos","O time conhece as principais combinações e as usa para aumentar o ticket médio"],
  A7: ["Não mudamos o foco de venda — vendemos o que sempre vendemos","Às vezes ajustamos o foco, mas de forma informal e sem garantia de que o time seguiu","Ajustamos ativamente o foco conforme campanhas, coleções, estoque e sazonalidade"],
  A8: ["Não sabemos quais produtos geram mais dúvidas ou objeções","Percebemos algumas objeções recorrentes, mas não registramos nem trabalhamos com o time","Sabemos quais produtos geram mais dúvidas e preparamos o time para lidar com isso"],

  B1: ["Não consigo descrever com clareza quem é o principal cliente da loja","Tenho uma noção geral, mas não é algo detalhado ou documentado","Consigo descrever claramente o perfil do cliente — hábitos, preferências e necessidades"],
  B2: ["O cliente geralmente já sabe o que quer — o vendedor quase não influencia","Em alguns casos o vendedor influencia, mas depende muito de cada um","O vendedor influencia bastante — a abordagem do time faz diferença real no que o cliente leva"],
  B3: ["O cliente raramente pede ajuda — costuma decidir sozinho","Parte dos clientes pede ajuda, mas o time nem sempre está preparado para orientar bem","Muitos clientes pedem ajuda para escolher e o time está preparado para guiar essa decisão"],
  B4: ["O time não diferencia perfis — aborda todo mundo da mesma forma","Alguns vendedores percebem diferenças e se adaptam, mas não é uma prática de todos","O time identifica diferentes perfis de cliente e adapta a abordagem de acordo com cada um"],
  B5: ["Não conhecemos as principais objeções dos clientes antes da compra","Percebemos algumas objeções frequentes, mas não trabalhamos isso de forma estruturada","Conhecemos bem as principais objeções e o time está preparado para lidar com elas"],
  B6: ["Não sabemos ao certo por que os clientes desistem da compra","Temos uma percepção de alguns motivos, mas sem acompanhamento sistemático","Sabemos os principais motivos de desistência e usamos isso para melhorar a abordagem"],
  B7: ["Não existe nenhuma rotina para registrar dúvidas ou objeções frequentes","Às vezes comentamos sobre dúvidas recorrentes, mas sem registro ou processo formal","Temos rotina de registrar perguntas e objeções frequentes e usamos para treinar o time"],

  C1: ["Não acompanho o faturamento semanal — olho só no fechamento do mês","Acompanho às vezes, mas sem regularidade ou processo definido","Acompanho o faturamento toda semana e uso esse número para tomar decisões"],
  C2: ["Não acompanho o faturamento por vendedor — olho o resultado geral da loja","Às vezes vejo o resultado por vendedor, mas não é um hábito regular","Acompanho o faturamento por vendedor regularmente e uso isso para feedback e gestão"],
  C3: ["Não sei o ticket médio da loja ou não acompanho esse número","Sei aproximadamente qual é, mas não acompanho com regularidade","Conheço o ticket médio e acompanho esse indicador com frequência para guiar ações"],
  C4: ["Não acompanho peças por atendimento nem itens por venda","Às vezes observo esses números, mas sem regularidade ou processo","Acompanho peças ou itens por venda regularmente e uso para identificar oportunidades"],
  C5: ["Não sei quantas vendas cada vendedor faz por semana","Tenho uma noção aproximada, mas não acompanho de forma sistemática","Sei quantas vendas cada vendedor faz por semana e uso isso na gestão do time"],
  C6: ["Não sei quais vendedores convertem melhor os atendimentos em venda","Percebo diferenças entre os vendedores, mas sem dados precisos","Sei exatamente quais vendedores têm melhor conversão e uso isso para orientar o time"],
  C7: ["Não comparo dias fortes e fracos — trato os resultados de forma geral","Às vezes percebo diferenças, mas não analiso sistematicamente o que causou","Comparo dias fortes e fracos regularmente para entender o que influencia os resultados"],
  C8: ["Não uso os números de venda para definir metas — as metas são fixas ou informais","Às vezes uso os dados para ajustar metas, mas sem consistência","Uso os indicadores de venda ativamente para definir metas e desafios para o time"],

  D1: ["Não usamos nenhum sistema, ERP, PDV ou planilha para acompanhar resultados","Usamos alguma ferramenta, mas de forma incompleta ou sem processo definido","Usamos um sistema ou planilha estruturada e acompanhamos os resultados de forma regular"],
  D2: ["Os dados de venda não são confiáveis ou estão frequentemente desatualizados","Os dados são razoáveis, mas às vezes há atrasos ou inconsistências","Os dados de venda são confiáveis e atualizados com frequência suficiente para decidir"],
  D3: ["A loja não tem metas claras por semana ou por mês","Temos metas, mas são informais ou nem sempre comunicadas claramente para o time","Temos metas claras definidas por semana ou mês e o time as conhece"],
  D4: ["As metas não são desdobradas — trabalhamos com meta geral da loja","Às vezes definimos metas individuais, mas não é uma prática consistente","Desdobramos as metas por vendedor e cada um sabe o que precisa alcançar"],
  D5: ["Olhamos o resultado só no fechamento — durante o período não acompanhamos","Às vezes olhamos o resultado durante o período, mas sem rotina definida","Acompanhamos o resultado durante o período e agimos quando vemos desvios"],
  D6: ["Não existe rotina de fechamento ou leitura de resultado semanal","Fazemos fechamentos às vezes, mas sem regularidade ou formato definido","Temos uma rotina semanal de fechamento e leitura de resultado com o time"],
  D7: ["Quando as vendas caem, não sabemos ao certo o que ajustar","Temos uma ideia do que pode estar errado, mas sem clareza sobre qual indicador focar","Quando as vendas caem sabemos exatamente quais indicadores analisar e onde agir"],
  D8: ["Não temos campanhas internas, prêmios ou incentivos para o time","Às vezes fazemos algum incentivo, mas sem regularidade ou estrutura","Temos campanhas e incentivos recorrentes que motivam e movimentam o time"],
  D9: ["Não registramos aprendizados de campanhas — cada uma começa do zero","Às vezes comentamos o que funcionou, mas sem registro formal","Registramos os aprendizados de campanhas anteriores e usamos para planejar as próximas"],
  D10: ["Temos dificuldade em transformar números em ações práticas para os vendedores","Às vezes conseguimos traduzir os dados em ações, mas sem consistência","Conseguimos transformar os números em orientações práticas e claras para o time"],

  E1: ["O gerente não conversa com o time sobre metas toda semana","Às vezes há uma conversa sobre metas, mas sem frequência semanal definida","Sim, o gerente conversa com o time sobre metas toda semana de forma consistente"],
  E2: ["O gerente não acompanha indicadores de venda de forma recorrente","O gerente acompanha alguns indicadores, mas sem regularidade ou profundidade","Sim, o gerente acompanha os indicadores de venda com frequência e usa na gestão"],
  E3: ["O gerente não sabe quais indicadores cada vendedor precisa melhorar individualmente","O gerente tem uma noção geral, mas sem clareza específica sobre cada vendedor","Sim, o gerente sabe exatamente o que cada vendedor precisa desenvolver"],
  E4: ["O gerente não dá feedback individual para os vendedores","O gerente dá feedback às vezes, mas sem regularidade ou processo definido","Sim, o gerente dá feedback individual para os vendedores com regularidade"],
  E5: ["O feedback é informal — sem exemplos concretos ou próximos passos definidos","Às vezes tem exemplos ou direções, mas sem um formato consistente","O feedback sempre vem com exemplos concretos, pontos de melhoria e ação combinada"],
  E6: ["O gerente raramente reconhece boas práticas ou celebra quando alguém vende bem","Às vezes há reconhecimento, mas de forma pontual e sem consistência","O gerente reconhece e celebra boas práticas de venda de forma regular com o time"],
  E7: ["Comportamentos ruins raramente são corrigidos — acabam virando padrão","Às vezes o gerente corrige, mas nem sempre de forma rápida ou consistente","O gerente identifica e corrige comportamentos ruins antes que se tornem hábito"],
  E8: ["O gerente dificilmente explica o motivo por trás de uma meta ou desafio","Às vezes explica o contexto, mas sem consistência ou clareza suficiente","O gerente sempre explica o motivo das metas e desafios, gerando entendimento no time"],
  E9: ["O gerente não acompanha se o vendedor aplicou o que foi combinado após o feedback","Às vezes verifica, mas sem um processo sistemático de acompanhamento","O gerente sempre acompanha se o combinado foi aplicado e retoma quando necessário"],
  E10: ["O gerente não tem tempo ou disciplina para manter uma rotina semanal com o time","O gerente tenta manter uma rotina, mas perde continuidade com frequência","O gerente tem tempo e disciplina para rodar uma rotina semanal consistente com o time"],

  F1: ["O time tem lacunas importantes no conhecimento dos produtos da loja","Parte do time conhece os produtos bem, mas há gaps em alguns vendedores","O time domina bem os produtos e consegue explicar, comparar e recomendar com segurança"],
  F2: ["Cada vendedor age de forma muito diferente — não há padrão de abordagem","Alguns têm boa abordagem, mas não é algo consistente em todo o time","O time tem uma abordagem consistente e alinhada que funciona para a loja"],
  F3: ["O time trava nas objeções com frequência — muitas vendas se perdem por isso","Alguns vendedores contornam objeções bem, mas o time tem fragilidade nisso","O time lida bem com as objeções mais comuns e isso raramente trava uma venda"],
  F4: ["O time não tem o hábito de oferecer produtos complementares","Alguns vendedores oferecem às vezes, mas não é uma prática do time","O time oferece produtos complementares de forma consistente nas vendas"],
  F5: ["Dependemos muito de um ou dois vendedores para bater as metas","Há diferença de desempenho, mas não dependemos exclusivamente de uma pessoa","O desempenho é equilibrado — não temos dependência crítica de nenhum vendedor"],
  F6: ["Não existe processo de integração — o novo aprende como pode","Existe alguma orientação inicial, mas sem processo claro ou estruturado","Temos um processo claro de integração que guia o vendedor novo desde o primeiro dia"],
  F7: ["O vendedor novo é jogado no atendimento sem muita orientação prática","Recebe alguma orientação, mas de forma informal e sem acompanhamento próximo","O vendedor novo recebe orientação prática nos primeiros dias com acompanhamento de perto"],
  F8: ["Só percebemos que um vendedor está ficando para trás quando já é tarde","Com o tempo percebemos, mas sem processo ágil nos primeiros dias","Identificamos rapidamente a evolução do vendedor novo e agimos quando necessário"],
  F9: ["O turnover é alto e não está sob controle — perdemos vendedores com frequência","O turnover existe mas está em nível aceitável, embora ainda cause algum impacto","O turnover é baixo e controlado — conseguimos manter e desenvolver o time com estabilidade"],

  G1: ["Não sabemos o que nos diferencia — vendemos o que todo mundo vende","Temos uma ideia do que nos diferencia, mas não comunicamos isso com clareza","Sabemos exatamente o que nos diferencia e o time usa isso nas vendas"],
  G2: ["Não sabemos identificar quem são nossos clientes recorrentes","Percebemos quem costuma voltar, mas sem registro ou acompanhamento formal","Identificamos os clientes recorrentes e temos alguma forma de valorizá-los"],
  G3: ["Tudo passa pelo gerente ou dono — o time não resolve nada sozinho","Em situações simples o time tem autonomia, mas situações difíceis sempre travam","O time resolve a maioria das situações com autonomia e bom senso"],
  G4: ["Não costumamos mudar a forma de vender — fazemos o que sempre fizemos","Já tentamos algumas mudanças, mas sem processo para avaliar e incorporar","Testamos, avaliamos o que funcionou e incorporamos as mudanças que deram certo"],
  G5: ["O dia a dia consome todo o tempo — não sobra espaço para pensar no negócio","Às vezes consigo parar para pensar, mas sem regularidade","Tenho tempo reservado para analisar o negócio e planejar com frequência"],
  G6: ["Quando as vendas caem, geralmente não sabemos ao certo o que causou","Levantamos algumas hipóteses, mas sem muita certeza sobre o motivo real","Conseguimos identificar o motivo da queda e agir rapidamente para corrigir"],
};

export const MACRO_BLOCKS = [
  {
    id: "loja", label: "A Loja", subtitle: "Produto, clientes e operação",
    blocks: ["A", "B", "C"],
    color: "var(--ev-gold-bright)",
  },
  {
    id: "gestao", label: "A Gestão", subtitle: "Processos, rotinas e liderança",
    blocks: ["D", "E"],
    color: "#7fb0ff",
  },
  {
    id: "time", label: "O Time", subtitle: "Maturidade do time e fit com IA",
    blocks: ["F", "G"],
    color: "#5ad1b0",
  },
] as const;

export const BLOCKS = [
  {
    id: "A", label: "Mix e Produto", fullLabel: "Clareza sobre mix e produto", max: 16,
    questions: [
      "Você sabe dizer claramente quais produtos ou categorias mais puxam o faturamento da loja?",
      "Você sabe quais produtos têm maior margem ou são mais interessantes para vender?",
      "O time sabe quais produtos devem ser priorizados em uma venda?",
      "A loja tem produtos que exigem explicação, demonstração ou argumentação do vendedor?",
      "A loja tem produtos complementares que poderiam ser oferecidos junto com a compra principal?",
      "O time sabe quais combinações de produtos aumentam o ticket médio?",
      "A loja muda o foco de venda conforme campanha, coleção, estoque ou sazonalidade?",
      "A loja tem clareza sobre quais produtos costumam gerar mais dúvidas ou objeções dos clientes?",
    ],
    cohorts: [
      { min: 0, max: 5, label: "Baixa clareza de mix" },
      { min: 6, max: 10, label: "Clareza parcial" },
      { min: 11, max: 13, label: "Boa clareza comercial" },
      { min: 14, max: 16, label: "Mix bem gerido e pronto para desafios específicos" },
    ],
    strongThreshold: 12, criticalMax: 6,
  },
  {
    id: "B", label: "Clientes e Jornada", fullLabel: "Tipo de cliente e jornada de compra", max: 14,
    questions: [
      "Você consegue descrever quem é o principal cliente da loja?",
      "Quando um cliente entra, o vendedor influencia muito o que ele leva, ou a pessoa já chega sabendo?",
      "O cliente costuma pedir ajuda para escolher, comparar ou decidir?",
      "O time sabe identificar diferentes perfis de cliente e adaptar a abordagem?",
      "A loja conhece as principais objeções dos clientes antes da compra?",
      "A loja sabe quais motivos fazem o cliente desistir da compra?",
      "Existe alguma rotina para registrar perguntas, objeções ou dúvidas frequentes dos clientes?",
    ],
    cohorts: [
      { min: 0, max: 4, label: "Cliente pouco mapeado" },
      { min: 5, max: 8, label: "Entendimento intuitivo do cliente" },
      { min: 9, max: 11, label: "Boa leitura de cliente e objeções" },
      { min: 12, max: 14, label: "Venda bem calibrada por perfil de cliente" },
    ],
    strongThreshold: 11, criticalMax: 5,
  },
  {
    id: "C", label: "Operação Comercial", fullLabel: "Tamanho da operação e potencial comercial", max: 16,
    questions: [
      "Você acompanha o faturamento semanal da loja?",
      "Você acompanha o faturamento por vendedor?",
      "Você sabe o ticket médio da loja e olha esse número com frequência?",
      "Você acompanha peças por atendimento, itens por venda ou produtos por venda?",
      "Você sabe quantas vendas cada vendedor faz por semana?",
      "Você sabe quais vendedores convertem melhor atendimento em venda?",
      "Você compara dias fortes e dias fracos para entender o que mudou?",
      "Você usa esses números para definir metas ou desafios para o time?",
    ],
    cohorts: [
      { min: 0, max: 5, label: "Operação pouco medida" },
      { min: 6, max: 10, label: "Operação parcialmente acompanhada" },
      { min: 11, max: 13, label: "Boa visibilidade comercial" },
      { min: 14, max: 16, label: "Operação bem medida e pronta para metas semanais" },
    ],
    strongThreshold: 12, criticalMax: 6,
  },
  {
    id: "D", label: "Processos e Rotinas", fullLabel: "Maturidade gerencial da loja", max: 20,
    questions: [
      "A loja usa algum sistema de vendas, ERP, PDV ou planilha para acompanhar resultados?",
      "Os dados de venda são confiáveis e atualizados com frequência?",
      "A loja tem metas claras por semana ou por mês?",
      "As metas são desdobradas por vendedor?",
      "A loja acompanha resultado durante o período, e não só no fechamento do mês?",
      "Existe rotina de fechamento ou leitura de resultado semanal?",
      "A loja sabe quais indicadores precisa melhorar quando as vendas caem?",
      "Existem campanhas internas, prêmios ou incentivos para movimentar o time?",
      "A loja registra aprendizados de campanhas anteriores?",
      "A gestão consegue transformar números em ações práticas para os vendedores?",
    ],
    cohorts: [
      { min: 0, max: 6, label: "Gestão informal" },
      { min: 7, max: 12, label: "Gestão básica" },
      { min: 13, max: 16, label: "Gestão estruturada" },
      { min: 17, max: 20, label: "Gestão orientada por dados e ação" },
    ],
    strongThreshold: 15, criticalMax: 8,
  },
  {
    id: "E", label: "Liderança e Feedback", fullLabel: "Maturidade da liderança da loja", max: 20,
    questions: [
      "O gerente ou dono conversa com o time sobre metas toda semana?",
      "O gerente acompanha indicadores de venda de forma recorrente?",
      "O gerente sabe quais indicadores cada vendedor precisa melhorar?",
      "O gerente dá feedback individual para os vendedores?",
      "Esse feedback é estruturado, com exemplos e próximos passos?",
      "O gerente reconhece boas práticas quando alguém vende bem?",
      "O gerente corrige comportamentos de venda ruins antes que virem padrão?",
      "O gerente consegue explicar para o time o motivo de uma meta ou desafio?",
      "O gerente acompanha se o vendedor aplicou o combinado depois do feedback?",
      "O gerente tem tempo e disciplina para rodar uma rotina semanal simples com o time?",
    ],
    cohorts: [
      { min: 0, max: 6, label: "Liderança reativa" },
      { min: 7, max: 12, label: "Liderança presente, mas informal" },
      { min: 13, max: 16, label: "Liderança ativa e com rotina" },
      { min: 17, max: 20, label: "Liderança forte para sustentar evolução semanal" },
    ],
    strongThreshold: 15, criticalMax: 8,
  },
  {
    id: "F", label: "Maturidade do Time", fullLabel: "Maturidade do time de vendas", max: 18,
    questions: [
      "O time atual domina bem os produtos da loja?",
      "O time sabe abordar clientes de forma consistente?",
      "O time sabe contornar objeções comuns?",
      "O time sabe oferecer produtos complementares?",
      "O desempenho dos vendedores é parecido entre si, sem muita dependência de uma ou duas pessoas?",
      "Quando entra um vendedor novo, existe um processo claro de integração?",
      "O vendedor novo recebe orientação prática nos primeiros dias?",
      "A loja consegue saber rapidamente se um vendedor novo está evoluindo ou ficando para trás?",
      "O turnover da loja é baixo ou controlado?",
    ],
    cohorts: [
      { min: 0, max: 6, label: "Time frágil ou muito dependente" },
      { min: 7, max: 11, label: "Time em formação" },
      { min: 12, max: 15, label: "Time funcional, com pontos de evolução" },
      { min: 16, max: 18, label: "Time maduro e pronto para desafios mais sofisticados" },
    ],
    strongThreshold: 14, criticalMax: 7,
  },
  {
    id: "G", label: "Aprofundamento", fullLabel: "Visão estratégica e maturidade do negócio", max: 12,
    questions: [
      "A loja sabe o que a diferencia das concorrentes próximas?",
      "A loja tem clientes recorrentes e consegue identificá-los?",
      "O time tem autonomia para resolver situações no atendimento sem depender do gerente?",
      "A loja já testou mudanças na forma de vender e incorporou o que funcionou?",
      "O dono ou gerente reserva tempo para pensar no negócio, além de operá-lo?",
      "Quando as vendas caem, o time consegue identificar o motivo e agir?",
    ],
    cohorts: [
      { min: 0, max: 4, label: "Baixa maturidade estratégica" },
      { min: 5, max: 8, label: "Visão em desenvolvimento" },
      { min: 9, max: 10, label: "Boa visão do negócio" },
      { min: 11, max: 12, label: "Alta maturidade e visão estratégica" },
    ],
    strongThreshold: 9, criticalMax: 4,
  },
];

export const OPEN_QUESTIONS = [
  "Qual é o maior desafio comercial da loja hoje?",
  "O que você mais gostaria que seus vendedores fizessem melhor?",
  "O que já tentou fazer para treinar ou melhorar o time?",
  "Da última vez que contratou um vendedor, o que você fez para ele aprender a vender?",
  "Já contratou treinamento antes? O que funcionou e o que não funcionou?",
  "O que normalmente impede o time de vender mais?",
  "Qual comportamento você gostaria de ver acontecendo toda semana na loja?",
  "Que tipo de desafio semanal você acha que seu time toparia fazer?",
  "Que tipo de desafio você acha que seu time rejeitaria?",
  "Se a loja melhorasse uma coisa nos próximos 30 dias, o que deveria ser?",
];

export const SCALE_LABELS: Record<number, string> = {
  0: "Não / não sabe / não faz",
  1: "Minimamente / às vezes / de forma informal",
  2: "Muito / com consistência / mede e acompanha",
};
