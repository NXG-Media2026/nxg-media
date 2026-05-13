import type { FAQCategory } from './faq';

export const faqCategoriesEn: FAQCategory[] = [
  {
    title: 'General',
    slug: 'general',
    items: [
      {
        q: 'What is doc.veri?',
        a: "doc.veri is Dr. Verena's platform for science-based women's health. Here you'll find digital products, coaching, and knowledge around hormones, training, nutrition, and cycle — evidence-based and practical.",
      },
      {
        q: 'Who is behind doc.veri?',
        a: 'Behind doc.veri is Dr. Verena Mann, a licensed physician, emergency medicine specialist, and endurance athlete. She combines medical expertise with practical experience in endurance sports and her own hormone journey.',
      },
      {
        q: 'Who are the offerings for?',
        a: "The offerings are designed for women who want to take their health into their own hands with an evidence-based approach. Whether athlete, professional, or woman in perimenopause — the content is suitable for every fitness level and life phase.",
      },
      {
        q: 'How is doc.veri different from other health platforms?',
        a: 'All content at doc.veri is based on current research and created by a licensed physician. There are no trends, no bro-science, and no pseudoscience — only evidence-based knowledge.',
      },
    ],
  },
  {
    title: 'Products',
    slug: 'products',
    items: [
      {
        q: 'What products does doc.veri offer?',
        a: 'doc.veri offers digital guides, e-books, and courses on topics like hormone balance, histamine, cycle-aware training, and nutrition. All products are based on current research and available immediately after purchase.',
      },
      {
        q: 'Do I get the products immediately?',
        a: 'Yes, after purchase you get instant access to download. Payment is processed securely through Plug & Pay.',
      },
      {
        q: 'Can I return products?',
        a: 'For digital products, the right of withdrawal expires upon download. Details can be found in our <a href="/en/terms">Terms & Conditions</a>.',
      },
      {
        q: 'Do the products replace medical advice?',
        a: "No, the products do not replace individual medical consultation. They provide evidence-based knowledge for self-help. For specific concerns, please consult your doctor.",
      },
    ],
  },
  {
    title: 'Coaching',
    slug: 'coaching',
    items: [
      {
        q: 'How does the initial call work?',
        a: "The initial call is a free 20-minute video call. We get to know each other and clarify whether coaching is right for you — completely non-binding.",
      },
      {
        q: 'Do I need prior experience for coaching?',
        a: "No, you don't need any prior experience. Coaching is fully adapted to your level and goals, whether you're a beginner or experienced athlete.",
      },
      {
        q: 'Is the coaching online or in person?',
        a: 'All coaching sessions take place online via video call. You just need a stable internet connection and can participate comfortably from home.',
      },
      {
        q: 'Can I combine coaching and products?',
        a: 'Yes, coaching and digital products complement each other perfectly. Many clients use the guides as companion material for coaching.',
      },
      {
        q: 'What if I need to cancel an appointment?',
        a: 'Appointments can be rescheduled free of charge up to 24 hours in advance. Details can be found in our <a href="/en/terms">Terms & Conditions</a>.',
      },
    ],
  },
  {
    title: 'Trust & Safety',
    slug: 'trust-safety',
    items: [
      {
        q: 'What are Dr. Verena\'s qualifications?',
        a: 'Dr. Verena Mann is a licensed physician with an additional qualification in emergency medicine. She combines clinical experience with personal expertise as an Ironman athlete and in-depth knowledge of women\'s health.',
      },
      {
        q: 'Is the content evidence-based?',
        a: 'Yes, all content at doc.veri is based on current research and medical expertise. Dr. Verena personally creates every product and coaching resource using evidence-based sources.',
      },
      {
        q: 'How is my data protected?',
        a: 'Data protection is a top priority at doc.veri. The website is operated in compliance with GDPR, and personal data is never shared with third parties. Details can be found in the <a href="/en/privacy">Privacy Policy</a>.',
      },
      {
        q: 'Is the payment secure?',
        a: 'Yes, payment is processed through Plug & Pay, an established and secure payment provider. Your payment data is encrypted and never stored by doc.veri.',
      },
    ],
  },
  {
    title: 'Hormones & Cycle',
    slug: 'hormones-cycle',
    items: [
      {
        q: 'What does "cycle-aware training" mean?',
        a: "Cycle-aware training adapts the intensity and type of exercise to the phases of your menstrual cycle. Hormonal fluctuations affect performance, recovery, and injury risk — you use this knowledge strategically.",
      },
      {
        q: 'When does perimenopause start?',
        a: "Perimenopause often begins as early as the mid-30s and describes the transition phase before menopause. Typical signs include irregular cycles, sleep problems, and mood swings caused by changing hormone production.",
      },
      {
        q: 'What is RED-S?',
        a: 'RED-S (Relative Energy Deficiency in Sport) is a syndrome where energy intake is insufficient to cover the energy demands of exercise and daily life. It particularly affects female endurance athletes and can impair hormones, bones, and performance.',
      },
      {
        q: 'How are histamine and the cycle connected?',
        a: 'Estrogen promotes histamine release, which is why histamine symptoms often occur in a cycle-dependent pattern. Many women notice increased symptoms like migraines, skin reactions, or digestive issues around mid-cycle or before their period.',
      },
    ],
  },
  {
    title: 'Nutrition & Training',
    slug: 'nutrition-training',
    items: [
      {
        q: 'Do I need to follow a specific diet?',
        a: "No, at doc.veri there are no rigid diet plans. The focus is on a balanced, nutrient-rich diet that fits you and your cycle.",
      },
      {
        q: 'Which sports are recommended?',
        a: "A combination of strength and endurance training is generally recommended. The optimal mix depends on your goals, life phase, and cycle phase.",
      },
    ],
  },
];

export function getAllFAQsEn(): Array<{ q: string; a: string }> {
  return faqCategoriesEn.flatMap((cat) => cat.items);
}
