export const ui = {
  de: {
    // Navigation
    'nav.home': 'Home',
    'nav.angebot': 'Angebot',
    'nav.produkte': 'Produkte',
    'nav.coaching': 'Coaching',
    'nav.mitgliedschaft': 'Mitgliedschaft',
    'nav.about': 'Über mich',
    'nav.contact': 'Kontakt',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.themen': 'Themen',
    'nav.glossar': 'Glossar',
    'nav.privacy': 'Datenschutz',
    'nav.impressum': 'Impressum',
    'nav.agb': 'AGB',

    // CTAs
    'cta.discover': 'Entdecken',
    'cta.learnMore': 'Mehr erfahren',
    'cta.viewAll': 'Alle ansehen',
    'cta.backToOverview': 'Zurück zur Übersicht',
    'cta.buyNow': 'Jetzt kaufen',
    'cta.bookCall': 'Erstgespräch buchen',
    'cta.joinCommunity': 'Community beitreten',
    'cta.downloadFree': 'Kostenlos herunterladen',
    'cta.subscribe': 'Anmelden',
    'cta.startQuiz': 'Quiz starten',

    // Testimonials
    'testimonial.heading': 'Das sagen meine Kundinnen',

    // FAQ
    'faq.heading': 'Häufig gestellte Fragen',

    // Product pages
    'product.whatIsInside': 'Das steckt drin',
    'product.whoIsThisFor': 'Für wen ist das?',
    'product.price': 'Preis',
    'product.allProducts': 'Alle Produkte',

    // Coaching pages
    'coaching.outcomes': 'Das erreichst du',
    'coaching.methodology': 'So arbeiten wir',
    'coaching.includes': 'Das ist enthalten',
    'coaching.allCoaching': 'Alle Coaching-Angebote',

    // E-E-A-T bylines
    'eeat.writtenBy': 'Geschrieben von',
    'eeat.reviewedBy': 'Geprüft von',
    'eeat.lastReviewed': 'Zuletzt geprüft',
    'eeat.viewProfile': 'Profil ansehen',

    // About / credentials labels
    'about.education': 'Ausbildung',
    'about.credentials': 'Qualifikationen',
    'about.languages': 'Sprachen',
    'about.memberships': 'Mitgliedschaften',
    'about.publications': 'Publikationen & Vorträge',

    // Blog / articles
    'blog.allArticles': 'Alle Artikel',
    'blog.latestArticles': 'Neueste Artikel',
    'blog.viewAll': 'Alle Artikel ansehen',
    'blog.by': 'Von',
    'blog.updated': 'Aktualisiert',
    'blog.relatedArticles': 'Verwandte Artikel',
    'blog.relatedProducts': 'Passende Produkte',
    'blog.readingTime': 'Min. Lesezeit',
    'breadcrumb.blog': 'Blog',

    // Pillar / topics
    'pillar.relatedArticles': 'Artikel zum Thema',
    'pillar.relatedProducts': 'Passende Produkte',
    'breadcrumb.themen': 'Themen',

    // Quiz
    'quiz.heading': 'Finde deinen Typ',
    'quiz.startButton': 'Quiz starten',
    'quiz.emailGate': 'Trage deine E-Mail ein, um deine personalisierten Ergebnisse zu erhalten.',
    'quiz.resultHeading': 'Dein Ergebnis',

    // Newsletter
    'newsletter.heading': 'Newsletter',
    'newsletter.placeholder': 'Deine E-Mail-Adresse',
    'newsletter.button': 'Anmelden',
    'newsletter.success': 'Willkommen! Prüfe dein Postfach.',
    'newsletter.sending': 'Einen Moment…',
    'newsletter.error': 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',

    // General
    'general.readMore': 'Weiterlesen',
    'general.close': 'Schließen',
    'general.menu': 'Menü',
    'general.language': 'Sprache',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.privacy': 'Datenschutz',
    'footer.impressum': 'Impressum',
    'footer.agb': 'AGB',

    // Lead magnet
    'leadMagnet.whatYouGet': 'Das bekommst du',
    'leadMagnet.downloadHeading': 'Jetzt kostenlos sichern',
    'leadMagnet.emailPlaceholder': 'Deine E-Mail-Adresse',
    'leadMagnet.successHeading': 'Geschafft!',
    'leadMagnet.successMessage': 'Prüfe dein Postfach — der Download ist unterwegs.',

    // Breadcrumbs
    'breadcrumb.home': 'Home',
    'breadcrumb.produkte': 'Produkte',
    'breadcrumb.coaching': 'Coaching',
    'breadcrumb.angebot': 'Angebot',
    'breadcrumb.glossar': 'Glossar',
    'breadcrumb.leadMagnet': 'Kostenlose Ressourcen',
    'breadcrumb.masterclass': 'Masterclass',
  },
} as const;

export type UIKey = keyof typeof ui.de;
