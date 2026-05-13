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
        a: 'doc.veri ist die Plattform von Dr. Verena für wissenschaftlich fundierte Frauen-Gesundheit. Hier findest du digitale Produkte, Coaching und Wissen rund um Hormone, Training, Ernährung und Zyklus — evidenzbasiert und praxisnah.',
      },
      {
        q: 'Wer steckt hinter doc.veri?',
        a: 'Hinter doc.veri steht Dr. Verena Mann, approbierte Ärztin, Notärztin und Ausdauer-Athletin. Sie verbindet medizinisches Fachwissen mit praktischer Erfahrung im Ausdauersport und eigener Hormon-Geschichte.',
      },
      {
        q: 'Für wen sind die Angebote geeignet?',
        a: 'Die Angebote richten sich an Frauen, die ihre Gesundheit evidenzbasiert in die eigene Hand nehmen möchten. Ob Sportlerin, Berufstätige oder Frau in der Perimenopause — die Inhalte passen zu jedem Fitness-Level und jeder Lebensphase.',
      },
      {
        q: 'Wie unterscheidet sich doc.veri von anderen Gesundheitsplattformen?',
        a: 'Alle Inhalte bei doc.veri basieren auf aktueller Studienlage und werden von einer approbierten Ärztin erstellt. Es gibt keine Trends, keine Bro-Science und keine Schwurbel — nur evidenzbasiertes Wissen.',
      },
    ],
  },
  {
    title: 'Produkte',
    slug: 'produkte',
    items: [
      {
        q: 'Welche Produkte bietet doc.veri an?',
        a: 'doc.veri bietet digitale Guides, E-Books und Kurse zu Themen wie Hormonbalance, Histamin, zyklusbewusstes Training und Ernährung. Alle Produkte basieren auf aktueller Studienlage und sind sofort nach dem Kauf verfügbar.',
      },
      {
        q: 'Bekomme ich die Produkte sofort?',
        a: 'Ja, nach dem Kauf erhältst du sofortigen Zugang zum Download. Die Bezahlung läuft sicher über Plug & Pay.',
      },
      {
        q: 'Kann ich Produkte zurückgeben?',
        a: 'Bei digitalen Produkten erlischt das Widerrufsrecht mit dem Download. Details findest du in unseren <a href="/agb">AGB</a>.',
      },
      {
        q: 'Ersetzen die Produkte eine ärztliche Beratung?',
        a: 'Nein, die Produkte ersetzen keine individuelle medizinische Beratung. Sie liefern fundiertes Wissen zur Selbsthilfe. Bei konkreten Beschwerden konsultiere bitte deine Ärztin.',
      },
    ],
  },
  {
    title: 'Coaching',
    slug: 'coaching',
    items: [
      {
        q: 'Wie läuft das Erstgespräch ab?',
        a: 'Das Erstgespräch ist ein kostenloser 20-Minuten-Call per Video. Wir lernen uns kennen und klären, ob das Coaching zu dir passt — völlig unverbindlich.',
      },
      {
        q: 'Brauche ich Vorerfahrung für das Coaching?',
        a: 'Nein, du brauchst keinerlei Vorerfahrung. Das Coaching wird komplett auf dein Level und deine Ziele angepasst, egal ob Anfängerin oder erfahrene Sportlerin.',
      },
      {
        q: 'Findet das Coaching online oder vor Ort statt?',
        a: 'Alle Coaching-Sessions finden online per Video-Call statt. Du brauchst nur eine stabile Internetverbindung und kannst bequem von zu Hause teilnehmen.',
      },
      {
        q: 'Kann ich Coaching und Produkte kombinieren?',
        a: 'Ja, Coaching und digitale Produkte ergänzen sich ideal. Viele Kundinnen nutzen die Guides als Begleitmaterial zum Coaching.',
      },
      {
        q: 'Was passiert, wenn ich einen Termin absagen muss?',
        a: 'Termine können bis 24 Stunden vorher kostenfrei verschoben werden. Details findest du in unseren <a href="/agb">AGB</a>.',
      },
    ],
  },
  {
    title: 'Vertrauen & Sicherheit',
    slug: 'vertrauen-sicherheit',
    items: [
      {
        q: 'Welche Qualifikationen hat Dr. Verena?',
        a: 'Dr. Verena Mann ist approbierte Ärztin mit Zusatzqualifikation in Notfallmedizin. Sie verbindet klinische Erfahrung mit persönlicher Expertise als Ironman-Athletin und fundiertem Wissen in Frauen-Gesundheit.',
      },
      {
        q: 'Sind die Inhalte wissenschaftlich fundiert?',
        a: 'Ja, alle Inhalte bei doc.veri basieren auf aktueller Studienlage und medizinischem Fachwissen. Dr. Verena erstellt jedes Produkt und jeden Coaching-Inhalt persönlich auf Basis evidenzbasierter Quellen.',
      },
      {
        q: 'Wie werden meine Daten geschützt?',
        a: 'Datenschutz hat bei doc.veri höchste Priorität. Die Website wird DSGVO-konform betrieben, und persönliche Daten werden niemals an Dritte weitergegeben. Details findest du in der <a href="/datenschutz">Datenschutzerklärung</a>.',
      },
      {
        q: 'Ist die Bezahlung sicher?',
        a: 'Ja, die Bezahlung läuft über Plug & Pay, einen etablierten und sicheren Zahlungsanbieter. Deine Zahlungsdaten werden verschlüsselt übertragen und nicht bei doc.veri gespeichert.',
      },
    ],
  },
  {
    title: 'Hormone & Zyklus',
    slug: 'hormone-zyklus',
    items: [
      {
        q: 'Was bedeutet „zyklusbewusstes Training"?',
        a: 'Zyklusbewusstes Training passt Intensität und Art des Trainings an die Phasen deines Menstruationszyklus an. Hormonschwankungen beeinflussen Leistungsfähigkeit, Regeneration und Verletzungsrisiko — dieses Wissen nutzt du gezielt.',
      },
      {
        q: 'Ab wann spricht man von Perimenopause?',
        a: 'Die Perimenopause beginnt oft schon ab Mitte 30 und bezeichnet die Übergangsphase vor der Menopause. Typische Anzeichen sind unregelmäßige Zyklen, Schlafstörungen und Stimmungsschwankungen, die durch veränderte Hormonproduktion entstehen.',
      },
      {
        q: 'Was ist RED-S?',
        a: 'RED-S (Relatives Energiedefizit im Sport) ist ein Syndrom, bei dem die Energiezufuhr nicht ausreicht, um den Energieverbrauch durch Sport und Alltag zu decken. Es betrifft besonders Ausdauersportlerinnen und kann Hormone, Knochen und Leistung beeinträchtigen.',
      },
      {
        q: 'Wie hängen Histamin und der Zyklus zusammen?',
        a: 'Östrogen fördert die Histamin-Ausschüttung, weshalb Histamin-Beschwerden oft zyklusabhängig auftreten. Viele Frauen bemerken verstärkte Symptome wie Migräne, Hautreaktionen oder Verdauungsprobleme in der Zyklusmitte oder vor der Periode.',
      },
    ],
  },
  {
    title: 'Ernährung & Training',
    slug: 'ernaehrung-training',
    items: [
      {
        q: 'Muss ich eine bestimmte Diät einhalten?',
        a: 'Nein, bei doc.veri gibt es keine starren Diätpläne. Der Fokus liegt auf einer ausgewogenen, nährstoffreichen Ernährung, die zu dir und deinem Zyklus passt.',
      },
      {
        q: 'Welche Sportarten werden empfohlen?',
        a: 'Eine Kombination aus Kraft- und Ausdauertraining ist grundsätzlich empfehlenswert. Die optimale Mischung hängt von deinen Zielen, deiner Lebensphase und deiner Zyklusphase ab.',
      },
    ],
  },
];

export function getAllFAQs(): Array<{ q: string; a: string }> {
  return faqCategories.flatMap((cat) => cat.items);
}
