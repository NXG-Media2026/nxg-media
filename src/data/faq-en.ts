import type { FAQCategory } from './faq';

export const faqCategoriesEn: FAQCategory[] = [
  {
    title: 'General',
    slug: 'general',
    items: [
      {
        q: 'What is doc.veri?',
        a: "doc.veri is Dr. Verena's platform for science-based women's health. Here you'll find knowledge, products, and coaching around hormones, training, nutrition, and cycle — evidence-based and practical.",
      },
      {
        q: 'Who is behind doc.veri?',
        a: 'Dr. Verena — a licensed physician and passionate endurance athlete. She combines medical expertise with practical experience in endurance sports.',
      },
      {
        q: 'Who are the offerings for?',
        a: "For all women who want to take their health into their own hands — whether athlete, professional, or woman in perimenopause. The content is suitable for every fitness level and life phase.",
      },
      {
        q: 'How is doc.veri different from other health platforms?',
        a: 'doc.veri is consistently committed to science over trends. All content is based on current research and created by a physician — no bro-science, no pseudoscience.',
      },
    ],
  },
  {
    title: 'Products',
    slug: 'products',
    items: [
      {
        q: 'What products does doc.veri offer?',
        a: 'Digital guides, e-books, and courses on topics like hormone balance, cycle-aware training, and nutrition. All products are based on current research.',
      },
      {
        q: 'Do I get the products immediately?',
        a: 'Yes — after purchase you get instant access to download. Processing runs through Plug & Pay.',
      },
      {
        q: 'Can I return products?',
        a: 'For digital products, the right of withdrawal expires upon download. Details can be found in our <a href="/en/terms">Terms & Conditions</a>.',
      },
      {
        q: 'Do the products replace medical advice?',
        a: "No. The products provide evidence-based knowledge for self-help but don't replace individual medical consultation. For specific concerns, please consult your doctor.",
      },
    ],
  },
  {
    title: 'Coaching',
    slug: 'coaching',
    items: [
      {
        q: 'How does the initial call work?',
        a: "In a free 20-minute call, we get to know each other and clarify whether coaching is right for you. Completely non-binding.",
      },
      {
        q: 'Do I need prior experience for coaching?',
        a: "No — coaching is fully adapted to your level and goals, whether you're a beginner or experienced athlete.",
      },
      {
        q: 'Can I combine coaching and products?',
        a: 'Yes! Many clients use the digital guides as companion material for coaching.',
      },
      {
        q: 'What if I need to cancel an appointment?',
        a: 'Appointments can be rescheduled free of charge up to 24 hours in advance. Details can be found in our <a href="/en/terms">Terms & Conditions</a>.',
      },
    ],
  },
  {
    title: 'Hormones & Cycle',
    slug: 'hormones-cycle',
    items: [
      {
        q: 'What does "cycle-aware training" mean?',
        a: "Cycle-aware training adapts the intensity and type of exercise to the different phases of your menstrual cycle. The hormonal fluctuations during your cycle affect performance, recovery, and injury risk.",
      },
      {
        q: 'When does perimenopause start?',
        a: "Perimenopause often begins as early as the mid-30s and describes the transition phase before menopause, when hormone production changes. Typical signs include irregular cycles, sleep problems, and mood swings.",
      },
      {
        q: 'What is RED-S?',
        a: 'RED-S (Relative Energy Deficiency in Sport) describes a syndrome where energy intake is insufficient to cover the energy demands of exercise and daily life. It particularly affects female endurance athletes and can have far-reaching consequences for hormones, bones, and performance.',
      },
    ],
  },
  {
    title: 'Nutrition & Training',
    slug: 'nutrition-training',
    items: [
      {
        q: 'Do I need to follow a specific diet?',
        a: "No — at doc.veri there are no rigid diet plans. The focus is on a balanced, nutrient-rich diet that fits you and your cycle.",
      },
      {
        q: 'Which sports are recommended?',
        a: "That depends on your goals and life phase. Generally, I recommend a combination of strength and endurance training, adapted to your cycle phase.",
      },
    ],
  },
];

export function getAllFAQsEn(): Array<{ q: string; a: string }> {
  return faqCategoriesEn.flatMap((cat) => cat.items);
}
