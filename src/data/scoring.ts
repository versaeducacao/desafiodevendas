import { BLOCKS } from "./questions";

export interface BlockScore {
  id: string;
  label: string;
  fullLabel: string;
  score: number;
  max: number;
  cohort: string;
  isStrong: boolean;
  isCritical: boolean;
}

export interface DiagnosticResult {
  totalScore: number;
  maxScore: number;
  generalCohort: string;
  blockScores: BlockScore[];
  strengths: string[];
  criticalPoints: string[];
  summary: string;
  cadence: string;
  challengeTypes: string[];
  aiCalibration: Record<string, boolean | string>;
}

export function computeBlockScore(blockId: string, answers: Record<string, number>): number {
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block) return 0;
  return block.questions.reduce((sum, _, i) => {
    const key = `${blockId}${i + 1}`;
    return sum + (answers[key] ?? 0);
  }, 0);
}

export function getBlockCohort(block: typeof BLOCKS[0], score: number): string {
  for (const c of [...block.cohorts].reverse()) {
    if (score >= c.min) return c.label;
  }
  return block.cohorts[0].label;
}

export function computeDiagnostic(
  answers: Record<string, number>
): DiagnosticResult {
  const blockScores: BlockScore[] = BLOCKS.map((block) => {
    const score = computeBlockScore(block.id, answers);
    return {
      id: block.id,
      label: block.label,
      fullLabel: block.fullLabel,
      score,
      max: block.max,
      cohort: getBlockCohort(block, score),
      isStrong: score >= block.strongThreshold,
      isCritical: score <= block.criticalMax,
    };
  });

  const totalScore = blockScores.reduce((s, b) => s + b.score, 0);
  const maxScore = 120;

  const generalCohort =
    totalScore <= 41 ? "Loja Inicial" :
    totalScore <= 77 ? "Loja Emergente" :
    totalScore <= 101 ? "Loja Preparada" :
    "Loja Avançada";

  const strengths = blockScores.filter((b) => b.isStrong).map((b) => b.label);
  const criticalPoints = blockScores.filter((b) => b.isCritical).map((b) => b.label);

  const scoreMap = Object.fromEntries(blockScores.map((b) => [b.id, b.score]));

  const aiCalibration: Record<string, boolean | string> = {
    nivel_complexidade:
      totalScore <= 41 ? "basico" :
      totalScore <= 77 ? "intermediario" :
      totalScore <= 101 ? "intermediario" : "avancado",
    usar_metricas: totalScore > 41 && scoreMap["C"] >= 8,
    usar_ranking: scoreMap["D"] >= 15 && scoreMap["E"] >= 13 && scoreMap["G"] >= 11,
    usar_onboarding: true,
    usar_campanhas_sazonais: totalScore > 41 && scoreMap["A"] >= 8,
    usar_coach_whatsapp: true,
    usar_scripts_feedback: scoreMap["E"] < 17,
    usar_desafios_por_vendedor: totalScore > 77,
    usar_desafios_comportamentais: true,
  };

  const challengeTypes: string[] = [];
  if (scoreMap["A"] < 8) challengeTypes.push("Mapear produtos prioritários", "Argumentação de produto");
  if (scoreMap["B"] < 6) challengeTypes.push("Registrar dúvidas de clientes", "Scripts de abertura");
  if (scoreMap["F"] < 8) challengeTypes.push("Abordagem básica", "Contorno de objeções");
  if (totalScore > 41) challengeTypes.push("Oferta complementar", "Aumento de ticket médio");
  if (totalScore > 77) challengeTypes.push("Desafio por vendedor", "Campanha sazonal");
  if (totalScore > 101) challengeTypes.push("Ranking interno", "Desafio por indicador específico");

  const cadence =
    totalScore <= 41
      ? "1 desafio simples por semana, linguagem prática, sem métricas complexas."
      : totalScore <= 77
      ? "1 desafio semanal + microaula curta + fechamento simples na sexta."
      : totalScore <= 101
      ? "Desafios por vendedor + metas semanais claras + campanha sazonal."
      : "Régua completa: metas, ranking, coach de IA, campanhas e trilha de evolução.";

  const summaries: Record<string, string> = {
    "Loja Inicial": "A loja tem pouca estrutura de gestão e baixa clareza de indicadores. A IA deve começar com desafios simples, linguagem prática e sem cobranças complexas.",
    "Loja Emergente": "A loja já tem alguma gestão, mas opera de forma parcialmente informal. A IA pode propor desafios semanais associados a microaulas e metas simples.",
    "Loja Preparada": "A loja tem boa estrutura, acompanha indicadores e liderança capaz de sustentar cadência semanal. Pronta para desafios por vendedor e campanhas sazonais.",
    "Loja Avançada": "Gestão madura, liderança ativa, dados e time preparado. A IA pode rodar régua completa com ranking, metas individuais e indicadores avançados.",
  };

  return {
    totalScore, maxScore, generalCohort, blockScores,
    strengths, criticalPoints,
    summary: summaries[generalCohort],
    cadence, challengeTypes, aiCalibration,
  };
}
