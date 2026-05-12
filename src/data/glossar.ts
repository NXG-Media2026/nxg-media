export interface GlossarTerm {
  term: string;
  slug: string;
  definition: string;
  relatedTermSlugs?: string[];
}

export const glossarTerms: GlossarTerm[] = [
  {
    term: 'Amenorrhoe',
    slug: 'amenorrhoe',
    definition: 'Das Ausbleiben der Menstruation über mehr als drei Monate bei einer Frau im gebärfähigen Alter. Kann durch Stress, Untergewicht, intensives Training (RED-S) oder hormonelle Störungen verursacht werden.',
    relatedTermSlugs: ['red-s', 'menstruationszyklus'],
  },
  {
    term: 'Cortisol',
    slug: 'cortisol',
    definition: 'Das wichtigste Stresshormon des Körpers, produziert in der Nebennierenrinde. Cortisol reguliert den Blutzuckerspiegel, den Stoffwechsel und die Immunantwort. Chronisch erhöhte Cortisolwerte können den Menstruationszyklus, den Schlaf und die Regeneration negativ beeinflussen.',
    relatedTermSlugs: ['hpa-achse'],
  },
  {
    term: 'Follikelphase',
    slug: 'follikelphase',
    definition: 'Die erste Phase des Menstruationszyklus, vom ersten Tag der Periode bis zum Eisprung. In dieser Phase steigt der Östrogenspiegel an, was sich positiv auf Leistungsfähigkeit, Stimmung und Regeneration auswirken kann.',
    relatedTermSlugs: ['menstruationszyklus', 'oestrogen', 'lutealphase'],
  },
  {
    term: 'HPA-Achse',
    slug: 'hpa-achse',
    definition: 'Die Hypothalamus-Hypophysen-Nebennierenrinden-Achse — das zentrale Stressregulationssystem des Körpers. Eine chronische Aktivierung der HPA-Achse kann zu hormonellen Dysbalancen, Zyklusstörungen und Erschöpfung führen.',
    relatedTermSlugs: ['cortisol'],
  },
  {
    term: 'Lutealphase',
    slug: 'lutealphase',
    definition: 'Die zweite Phase des Menstruationszyklus, vom Eisprung bis zum Einsetzen der Periode. In dieser Phase dominiert Progesteron. Viele Frauen erleben hier PMS-Symptome und eine veränderte Trainingstoleranz.',
    relatedTermSlugs: ['menstruationszyklus', 'progesteron', 'follikelphase', 'pms'],
  },
  {
    term: 'Menstruationszyklus',
    slug: 'menstruationszyklus',
    definition: 'Der monatliche hormonelle Zyklus der Frau, der durchschnittlich 28 Tage dauert (normal: 21–35 Tage). Er umfasst die Menstruation, Follikelphase, Eisprung und Lutealphase. Der Zyklus beeinflusst Leistungsfähigkeit, Stimmung, Schlaf und Stoffwechsel.',
    relatedTermSlugs: ['follikelphase', 'lutealphase', 'oestrogen', 'progesteron'],
  },
  {
    term: 'Östrogen',
    slug: 'oestrogen',
    definition: 'Eine Gruppe weiblicher Sexualhormone, die vor allem in den Eierstöcken produziert werden. Östrogen ist wichtig für den Menstruationszyklus, die Knochengesundheit, das Herz-Kreislauf-System und die kognitive Funktion. In der Perimenopause sinkt der Östrogenspiegel.',
    relatedTermSlugs: ['menstruationszyklus', 'perimenopause'],
  },
  {
    term: 'Perimenopause',
    slug: 'perimenopause',
    definition: 'Die Übergangsphase vor der Menopause, in der die Hormonproduktion (v. a. Östrogen und Progesteron) schwankt und abnimmt. Sie kann bereits ab Mitte 30 beginnen und mehrere Jahre dauern. Typische Symptome sind unregelmäßige Zyklen, Hitzewallungen, Schlafstörungen und Stimmungsschwankungen.',
    relatedTermSlugs: ['oestrogen', 'progesteron'],
  },
  {
    term: 'PMS (Prämenstruelles Syndrom)',
    slug: 'pms',
    definition: 'Ein Komplex aus körperlichen und psychischen Symptomen, der in den Tagen vor der Menstruation auftritt. Typische Beschwerden sind Brustspannen, Blähungen, Reizbarkeit und Müdigkeit. Die Ursachen sind hormonell bedingt und können durch Lebensstiländerungen beeinflusst werden.',
    relatedTermSlugs: ['lutealphase', 'progesteron'],
  },
  {
    term: 'Progesteron',
    slug: 'progesteron',
    definition: 'Ein weibliches Sexualhormon, das nach dem Eisprung vom Gelbkörper produziert wird. Progesteron bereitet die Gebärmutterschleimhaut auf eine mögliche Schwangerschaft vor und hat eine beruhigende, schlaffördernde Wirkung. Ein Mangel kann zu PMS, Schlafstörungen und Zyklusunregelmäßigkeiten führen.',
    relatedTermSlugs: ['lutealphase', 'pms', 'perimenopause'],
  },
  {
    term: 'RED-S (Relatives Energiedefizit im Sport)',
    slug: 'red-s',
    definition: 'Ein Syndrom, bei dem die Energiezufuhr nicht ausreicht, um den Energieverbrauch durch Sport und Alltag zu decken. RED-S betrifft alle Körpersysteme: Menstruation, Knochengesundheit, Stoffwechsel, Immunsystem und psychische Gesundheit. Besonders häufig bei Ausdauersportlerinnen.',
    relatedTermSlugs: ['amenorrhoe'],
  },
  {
    term: 'Zyklusbewusstes Training',
    slug: 'zyklusbewusstes-training',
    definition: 'Ein Trainingsansatz, der Intensität, Volumen und Art des Trainings an die verschiedenen Phasen des Menstruationszyklus anpasst. Ziel ist es, die hormonellen Schwankungen zu nutzen statt gegen sie zu arbeiten — für bessere Leistung, schnellere Regeneration und weniger Verletzungen.',
    relatedTermSlugs: ['menstruationszyklus', 'follikelphase', 'lutealphase'],
  },
];
