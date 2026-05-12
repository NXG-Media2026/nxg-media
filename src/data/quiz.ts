export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  text: string;
  scores: Record<string, number>;
}

export type ArchetypeSlug =
  | 'die-stressgeplagte'
  | 'die-power-athletin'
  | 'die-zyklusbewusste'
  | 'die-perimenopausale';

export const archetypeLabels: Record<ArchetypeSlug, string> = {
  'die-stressgeplagte': 'Die Stressgeplagte',
  'die-power-athletin': 'Die Power-Athletin',
  'die-zyklusbewusste': 'Die Zyklusbewusste',
  'die-perimenopausale': 'Die Perimenopausale',
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Wie würdest du dein aktuelles Energielevel beschreiben?',
    answers: [
      {
        text: 'Ständig müde, egal wie viel ich schlafe',
        scores: { 'die-stressgeplagte': 3, 'die-perimenopausale': 1 },
      },
      {
        text: 'Gut im Training, aber danach komplett erschöpft',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Schwankt im Laufe des Monats, aber insgesamt okay',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: 'Unberechenbar — mal top, mal flop, ohne erkennbares Muster',
        scores: { 'die-perimenopausale': 3, 'die-stressgeplagte': 1 },
      },
    ],
  },
  {
    id: 'q2',
    question: 'Wie regelmäßig ist dein Menstruationszyklus?',
    answers: [
      {
        text: 'Unregelmäßig oder ausgeblieben',
        scores: { 'die-power-athletin': 2, 'die-perimenopausale': 2 },
      },
      {
        text: 'Ziemlich regelmäßig, aber mit starkem PMS',
        scores: { 'die-stressgeplagte': 2, 'die-zyklusbewusste': 1 },
      },
      {
        text: 'Regelmäßig mit leichten Schwankungen',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: 'Wird immer unregelmäßiger oder die Abstände ändern sich',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'Wie sieht dein Trainingsalltag aus?',
    answers: [
      {
        text: 'Ich trainiere kaum — mir fehlt die Energie',
        scores: { 'die-stressgeplagte': 3 },
      },
      {
        text: 'Ich trainiere 5+ Mal pro Woche, oft intensiv',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Regelmäßig 3–4 Mal pro Woche, Mix aus Kraft und Ausdauer',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: 'Ich war aktiv, aber es fällt mir immer schwerer',
        scores: { 'die-perimenopausale': 2, 'die-stressgeplagte': 1 },
      },
    ],
  },
  {
    id: 'q4',
    question: 'Was beschreibt dein Stresslevel am besten?',
    answers: [
      {
        text: 'Dauerhaft hoch — Job, Familie, alles auf einmal',
        scores: { 'die-stressgeplagte': 3 },
      },
      {
        text: 'Der Trainingsstress ist mein Hauptstressfaktor',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Normal — mal mehr, mal weniger',
        scores: { 'die-zyklusbewusste': 2 },
      },
      {
        text: 'Ich reagiere empfindlicher auf Stress als früher',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q5',
    question: 'Welches Thema beschäftigt dich aktuell am meisten?',
    answers: [
      {
        text: 'Schlafprobleme und Erschöpfung',
        scores: { 'die-stressgeplagte': 2, 'die-perimenopausale': 2 },
      },
      {
        text: 'Leistung steigern ohne meinem Körper zu schaden',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Meinen Zyklus besser verstehen und nutzen',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: 'Körperliche Veränderungen, die ich nicht einordnen kann',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q6',
    question: 'Wie alt bist du?',
    answers: [
      {
        text: '20–29',
        scores: { 'die-power-athletin': 1, 'die-zyklusbewusste': 1 },
      },
      {
        text: '30–39',
        scores: { 'die-stressgeplagte': 1, 'die-zyklusbewusste': 1 },
      },
      {
        text: '40–49',
        scores: { 'die-perimenopausale': 2 },
      },
      {
        text: '50+',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q7',
    question: 'Wie ist dein Schlaf?',
    answers: [
      {
        text: 'Ich kann schlecht einschlafen, Gedankenkarussell',
        scores: { 'die-stressgeplagte': 3 },
      },
      {
        text: 'Gut, aber ich schlafe zu wenig wegen meines Trainingsplans',
        scores: { 'die-power-athletin': 2 },
      },
      {
        text: 'Meistens gut, manchmal schlechter vor der Periode',
        scores: { 'die-zyklusbewusste': 2 },
      },
      {
        text: 'Nachtschweiß oder Durchschlafprobleme, die neu sind',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
];

export function calculateResult(answers: Record<string, number>): ArchetypeSlug {
  const scores: Record<string, number> = {
    'die-stressgeplagte': 0,
    'die-power-athletin': 0,
    'die-zyklusbewusste': 0,
    'die-perimenopausale': 0,
  };

  for (const questionIdx of Object.keys(answers)) {
    const question = quizQuestions[Number(questionIdx)];
    if (!question) continue;
    const answerIdx = answers[questionIdx];
    const answer = question.answers[answerIdx];
    if (!answer) continue;
    for (const [archetype, score] of Object.entries(answer.scores)) {
      scores[archetype] = (scores[archetype] || 0) + score;
    }
  }

  let maxScore = 0;
  let result: ArchetypeSlug = 'die-zyklusbewusste';
  for (const [slug, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      result = slug as ArchetypeSlug;
    }
  }

  return result;
}
