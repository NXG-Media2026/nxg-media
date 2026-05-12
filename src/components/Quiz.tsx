import { useState } from 'react';
import { quizQuestions, calculateResult, archetypeLabels, type ArchetypeSlug } from '../data/quiz';
import { buildQuizPayload, submitEmailCapture } from '../lib/emailCapture';

type Phase = 'quiz' | 'email' | 'result';

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [phase, setPhase] = useState<Phase>('quiz');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<ArchetypeSlug | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const question = quizQuestions[currentQ];
  const totalQuestions = quizQuestions.length;
  const progress = Math.round(((currentQ + (phase === 'quiz' ? 0 : 1)) / totalQuestions) * 100);

  function handleAnswer(answerIdx: number) {
    const newAnswers = { ...answers, [currentQ]: answerIdx };
    setAnswers(newAnswers);

    // Fire quiz_started only once — on the very first answered question
    if (Object.keys(answers).length === 0) {
      if (typeof window !== 'undefined' && typeof (window as any).trackEvent === 'function') {
        (window as any).trackEvent('quiz_started', {
          page_type: 'quiz',
          page_slug: '/quiz',
          locale: 'de',
        });
      }
    }

    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const archetype = calculateResult(newAnswers);
      setResult(archetype);
      setPhase('email');
    }
  }

  function handleBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit to email capture layer with archetype context
      const payload = buildQuizPayload(email, {
        archetype: result ?? undefined,
      });
      const captureResult = await submitEmailCapture(payload);

      if (!captureResult.ok) {
        setSubmitError(captureResult.error || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.');
        setIsSubmitting(false);
        return;
      }

      if (typeof window !== 'undefined' && typeof (window as any).trackEvent === 'function') {
        (window as any).trackEvent('quiz_email_captured', {
          page_type: 'quiz',
          page_slug: '/quiz',
          locale: 'de',
          provider: captureResult.placeholder ? 'placeholder' : 'esp',
        });
      }

      setPhase('result');
    } catch {
      setSubmitError('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      setIsSubmitting(false);
    }
  }

  function handleSkipEmail() {
    setPhase('result');
  }

  if (phase === 'result' && result) {
    if (typeof window !== 'undefined' && typeof (window as any).trackEvent === 'function') {
      (window as any).trackEvent('quiz_completed', {
        page_type: 'quiz',
        page_slug: '/quiz',
        locale: 'de',
      });
    }

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
          Dein Ergebnis
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-text mb-4">
          {archetypeLabels[result]}
        </h2>
        <p className="text-text-muted leading-relaxed mb-8 max-w-lg mx-auto">
          Erfahre jetzt, was dein Hormon-Typ bedeutet und welche konkreten Schritte dir helfen.
        </p>
        <a
          href={`/archetypen/${result}`}
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors rounded-button"
        >
          Mein Ergebnis ansehen
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    );
  }

  if (phase === 'email') {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-full bg-border rounded-full h-2 mb-8">
          <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: '100%' }} />
        </div>
        <h2 className="font-heading text-2xl text-text mb-3">
          Fast geschafft!
        </h2>
        <p className="text-text-muted mb-6">
          Trage deine E-Mail-Adresse ein, um dein personalisiertes Ergebnis mit konkreten Tipps zu erhalten.
        </p>
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine E-Mail-Adresse"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-button text-sm text-text bg-white border border-border focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-button transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Einen Moment…' : 'Ergebnis anzeigen'}
          </button>
        </form>
        {submitError && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {submitError}
          </p>
        )}
        <button
          type="button"
          onClick={handleSkipEmail}
          disabled={isSubmitting}
          className="mt-4 text-sm text-text-muted hover:text-text underline underline-offset-2 transition-colors disabled:opacity-50"
        >
          Ohne E-Mail fortfahren
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full bg-border rounded-full h-2 mb-2">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-text-muted text-right mb-8">
        {currentQ + 1} / {totalQuestions}
      </p>

      <h2 className="font-heading text-xl md:text-2xl text-text mb-8">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.answers.map((answer, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAnswer(idx)}
            className={`w-full text-left px-5 py-4 rounded-card border transition-all duration-200 ${
              answers[currentQ] === idx
                ? 'border-accent bg-accent/5 text-text'
                : 'border-border bg-white text-text-muted hover:border-accent/30 hover:text-text'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {currentQ > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="mt-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Zurück
        </button>
      )}
    </div>
  );
}
