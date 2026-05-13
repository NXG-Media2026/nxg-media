export interface FAQCategory {
  title: string;
  slug: string;
  items: Array<{ q: string; a: string }>;
}

export const faqCategories: FAQCategory[] = [
  {
    title: 'Allgemein',
    slug: 'allgemein',
    items: [
      {
        q: 'Was ist doc.veri?',
        a: 'doc.veri ist die Plattform von Dr. Verena für wissenschaftlich fundierte Frauen-Gesundheit. Hier findest du Wissen, Produkte und Coaching rund um Hormone, Training, Ernährung und Zyklus — evidenzbasiert und praxisnah.',
      },
      {
        q: 'Wer steckt hinter doc.veri?',
        a: 'Dr. Verena — approbierte Ärztin und leidenschaftliche Ausdauer-Athletin. Sie verbindet medizinisches Fachwissen mit praktischer Erfahrung im Ausdauersport.',
      },
      {
        q: 'Für wen sind die Angebote geeignet?',
        a: 'Für Frauen, die vieles richtig machen und sich trotzdem nicht richtig fühlen — ob Sportlerin, Berufstätige oder Frau in der Perimenopause. Die Inhalte passen zu jedem Fitness-Level und jeder Lebensphase.',
      },
      {
        q: 'Wie unterscheidet sich doc.veri von anderen Gesundheitsplattformen?',
        a: 'doc.veri setzt konsequent auf Wissenschaft statt Trends. Alle Inhalte basieren auf aktueller Studienlage und werden von einer Ärztin erstellt — ohne Bro-Science, ohne Schwurbel.',
      },
    ],
  },
  {
    title: 'Produkte',
    slug: 'produkte',
    items: [
      {
        q: 'Welche Produkte bietet doc.veri an?',
        a: 'Digitale Guides, E-Books und Kurse zu Themen wie Hormonbalance, zyklusbewusstes Training und Ernährung. Alle Produkte basieren auf aktueller Studienlage.',
      },
      {
        q: 'Bekomme ich die Produkte sofort?',
        a: 'Ja — nach dem Kauf erhältst du sofortigen Zugang zum Download. Die Abwicklung läuft über Plug & Pay.',
      },
      {
        q: 'Kann ich Produkte zurückgeben?',
        a: 'Bei digitalen Produkten erlischt das Widerrufsrecht mit dem Download. Details findest du in unseren <a href="/agb">AGB</a>.',
      },
      {
        q: 'Ersetzen die Produkte eine ärztliche Beratung?',
        a: 'Nein. Die Produkte liefern fundiertes Wissen zur Selbsthilfe, ersetzen aber keine individuelle medizinische Beratung. Bei konkreten Beschwerden konsultiere bitte deine Ärztin.',
      },
    ],
  },
  {
    title: 'Coaching',
    slug: 'coaching',
    items: [
      {
        q: 'Wie läuft das Erstgespräch ab?',
        a: 'In einem kostenlosen 20-Minuten-Call lernen wir uns kennen und klären, ob das Coaching zu dir passt. Völlig unverbindlich.',
      },
      {
        q: 'Brauche ich Vorerfahrung für das Coaching?',
        a: 'Nein — das Coaching wird komplett auf dein Level und deine Ziele angepasst, egal ob Anfängerin oder erfahrene Sportlerin.',
      },
      {
        q: 'Kann ich Coaching und Produkte kombinieren?',
        a: 'Ja! Viele Kundinnen nutzen die digitalen Guides als Begleitmaterial zum Coaching.',
      },
      {
        q: 'Was passiert, wenn ich einen Termin absagen muss?',
        a: 'Termine können bis 24 Stunden vorher kostenfrei verschoben werden. Details findest du in unseren <a href="/agb">AGB</a>.',
      },
    ],
  },
  {
    title: 'Hormone & Zyklus',
    slug: 'hormone-zyklus',
    items: [
      {
        q: 'Was bedeutet „zyklusbewusstes Training"?',
        a: 'Zyklusbewusstes Training passt Intensität und Art des Trainings an die verschiedenen Phasen deines Menstruationszyklus an. Die Hormonschwankungen im Zyklus beeinflussen Leistungsfähigkeit, Regeneration und Verletzungsrisiko.',
      },
      {
        q: 'Ab wann spricht man von Perimenopause?',
        a: 'Die Perimenopause beginnt oft schon ab Mitte 30 und bezeichnet die Übergangsphase vor der Menopause, in der die Hormonproduktion sich verändert. Typische Anzeichen sind unregelmäßige Zyklen, Schlafstörungen und Stimmungsschwankungen.',
      },
      {
        q: 'Was ist RED-S?',
        a: 'RED-S (Relatives Energiedefizit im Sport) beschreibt ein Syndrom, bei dem die Energiezufuhr nicht ausreicht, um den Energieverbrauch durch Sport und Alltag zu decken. Es betrifft besonders Ausdauersportlerinnen und kann weitreichende Folgen für Hormone, Knochen und Leistung haben.',
      },
    ],
  },
  {
    title: 'Ernährung & Training',
    slug: 'ernaehrung-training',
    items: [
      {
        q: 'Muss ich eine bestimmte Diät einhalten?',
        a: 'Nein — bei doc.veri gibt es keine starren Diätpläne. Der Fokus liegt auf einer ausgewogenen, nährstoffreichen Ernährung, die zu dir und deinem Zyklus passt.',
      },
      {
        q: 'Welche Sportarten werden empfohlen?',
        a: 'Das hängt von deinen Zielen und deiner Lebensphase ab. Grundsätzlich empfehle ich eine Kombination aus Kraft- und Ausdauertraining, angepasst an deine Zyklusphase.',
      },
    ],
  },
];

export function getAllFAQs(): Array<{ q: string; a: string }> {
  return faqCategories.flatMap((cat) => cat.items);
}
