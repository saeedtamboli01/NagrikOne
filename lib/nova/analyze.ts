import { classifyCitizenIssue } from '@/lib/nova/classifier';
import { getDynamicQuestions } from '@/lib/nova/question-engine';
import { evaluateCaseSla } from '@/lib/workflow/sla';
import { generateNovaSolution } from '@/lib/nova/solutionEngine';

export interface AnalyzeInput {
  text?: string;
  location?: string;
  history?: Array<{ sender: 'citizen' | 'nova'; text: string }>;
}

/** Turn markdown into plain sentences that sound natural when spoken. */
export function toSpokenText(md: string, maxChars = 900): string {
  const plain = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[*_`>|]/g, '')
    .replace(/---+/g, ' ')
    .replace(/\s*\n\s*/g, '. ')
    .replace(/\.\s*\./g, '.')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= maxChars) return plain;
  const cut = plain.slice(0, maxChars);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '));
  return (lastStop > 200 ? cut.slice(0, lastStop + 1) : cut) + ' The full plan is on your screen.';
}

/**
 * Pure, server-free triage. Same logic the /api/route endpoint uses,
 * so it works on static hosts such as GitHub Pages.
 */
export function analyzeIssue(input: AnalyzeInput) {
  const text = String(input.text || '').trim();
  if (!text) throw new Error('Please describe the problem to get a resolution route.');

  const customLocation = input.location ? String(input.location).trim() : '';
  const history = Array.isArray(input.history) ? input.history : [];

  const classification = classifyCitizenIssue(text, customLocation);
  const problem = classification.problem;
  const resolvedLocation =
    customLocation || classification.extractedLocation || 'your city';

  const solution = generateNovaSolution(problem, text, resolvedLocation, history);
  const dynamicQuestions = getDynamicQuestions(classification.problemId, text);
  const slaAssessment = evaluateCaseSla(
    new Date(),
    classification.suggestedUrgency,
    problem.category,
    'DRAFT'
  );

  const route = {
    targetDepartment: problem.route,
    statutoryFramework: problem.legalAct,
    estimatedSlaDays: problem.estimatedResolutionDays,
    actionPlan: problem.guidelines || 'Review the required information and prepare the case.',
    nextImmediateStep:
      dynamicQuestions.length > 0
        ? 'Answer the required questions so NOVA can prepare your case.'
        : 'Review the guidance and continue with case preparation.',
    legalNoticeRecommended: Boolean(
      problem.legalAct && /act|law|legal|statutory|consumer|administrative|rbi|bnss|scheme/i.test(problem.legalAct)
    )
  };

  const spokenSummary = toSpokenText(
    `${solution.headline}. ${solution.legalAssessment}. Here is what to do. ` +
      solution.immediateActionSteps.map((s, i) => `Step ${i + 1}. ${s}`).join(' ')
  );

  return {
    success: true,
    problem,
    classification: {
      confidence: classification.confidence,
      matchedKeywords: classification.matchedKeywords,
      suggestedUrgency: classification.suggestedUrgency,
      isUnknown: classification.isUnknown,
      inferredDomain: classification.inferredDomain || problem.category,
      domain: classification.inferredDomain || problem.category,
      reasoning: classification.reasoning,
      summary: classification.isUnknown
        ? 'I need a few more details to understand and route this citizen issue.'
        : `I identified this as ${problem.name}.`
    },
    questions: dynamicQuestions,
    dynamicQuestions,
    solution,
    chatResponse: solution.chatResponseText,
    spokenSummary,
    route,
    sla: slaAssessment,
    location: resolvedLocation,
    guidelines: problem.guidelines,
    verified: false,
    readyForRouting: true
  };
}
