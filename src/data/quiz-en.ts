import type { QuizQuestion, ArchetypeSlug } from './quiz';

export const archetypeLabelsEn: Record<ArchetypeSlug, string> = {
  'die-stressgeplagte': 'The Stress-Driven',
  'die-power-athletin': 'The Power Athlete',
  'die-zyklusbewusste': 'The Cycle-Aware',
  'die-perimenopausale': 'The Perimenopausal',
};

export const archetypeSlugsEn: Record<ArchetypeSlug, string> = {
  'die-stressgeplagte': 'the-stress-driven',
  'die-power-athletin': 'the-power-athlete',
  'die-zyklusbewusste': 'the-cycle-aware',
  'die-perimenopausale': 'the-perimenopausal',
};

export const quizQuestionsEn: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'How would you describe your current energy level?',
    answers: [
      {
        text: 'Constantly tired, no matter how much I sleep',
        scores: { 'die-stressgeplagte': 3, 'die-perimenopausale': 1 },
      },
      {
        text: 'Good during training, but completely drained after',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Fluctuates throughout the month, but overall okay',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: 'Unpredictable — sometimes great, sometimes terrible, no clear pattern',
        scores: { 'die-perimenopausale': 3, 'die-stressgeplagte': 1 },
      },
    ],
  },
  {
    id: 'q2',
    question: 'How regular is your menstrual cycle?',
    answers: [
      {
        text: 'Irregular or absent',
        scores: { 'die-power-athletin': 2, 'die-perimenopausale': 2 },
      },
      {
        text: 'Fairly regular, but with significant PMS',
        scores: { 'die-stressgeplagte': 2, 'die-zyklusbewusste': 1 },
      },
      {
        text: 'Regular with slight variations',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: 'Becoming increasingly irregular or the intervals are changing',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'What does your training routine look like?',
    answers: [
      {
        text: "I barely train — I don't have the energy",
        scores: { 'die-stressgeplagte': 3 },
      },
      {
        text: 'I train 5+ times per week, often intense',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Regularly 3–4 times per week, mix of strength and cardio',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: "I used to be active, but it's getting harder and harder",
        scores: { 'die-perimenopausale': 2, 'die-stressgeplagte': 1 },
      },
    ],
  },
  {
    id: 'q4',
    question: 'What best describes your stress level?',
    answers: [
      {
        text: 'Constantly high — work, family, everything at once',
        scores: { 'die-stressgeplagte': 3 },
      },
      {
        text: 'Training stress is my main stressor',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Normal — sometimes more, sometimes less',
        scores: { 'die-zyklusbewusste': 2 },
      },
      {
        text: "I'm more sensitive to stress than I used to be",
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q5',
    question: 'Which topic concerns you most right now?',
    answers: [
      {
        text: 'Sleep problems and exhaustion',
        scores: { 'die-stressgeplagte': 2, 'die-perimenopausale': 2 },
      },
      {
        text: 'Improving performance without harming my body',
        scores: { 'die-power-athletin': 3 },
      },
      {
        text: 'Understanding and working with my cycle better',
        scores: { 'die-zyklusbewusste': 3 },
      },
      {
        text: "Physical changes I can't make sense of",
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
  {
    id: 'q6',
    question: 'How old are you?',
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
    question: 'How is your sleep?',
    answers: [
      {
        text: "I can't fall asleep, racing thoughts",
        scores: { 'die-stressgeplagte': 3 },
      },
      {
        text: "Good, but I don't get enough because of my training schedule",
        scores: { 'die-power-athletin': 2 },
      },
      {
        text: 'Mostly good, sometimes worse before my period',
        scores: { 'die-zyklusbewusste': 2 },
      },
      {
        text: 'Night sweats or sleep disruptions that are new',
        scores: { 'die-perimenopausale': 3 },
      },
    ],
  },
];
