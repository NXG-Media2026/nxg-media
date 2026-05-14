import type { Locale } from './site';

export interface Testimonial {
  id: string;
  name: string;
  outcome?: string;
  photo?: string;
  text: string;
  rating?: number;
  productSlug?: string;
  featured?: boolean;
  locale?: Locale;
  cluster?: string;
}

export const testimonials: Testimonial[] = [];

export function getTestimonials(opts: {
  featuredOnly?: boolean;
  productSlug?: string;
  locale?: Locale;
  cluster?: string;
} = {}): Testimonial[] {
  const targetLocale = opts.locale ?? 'nl';
  let result = testimonials.filter((t) => (t.locale ?? 'nl') === targetLocale);

  if (opts.productSlug) {
    result = result.filter((t) => t.productSlug === opts.productSlug);
  }

  if (opts.cluster) {
    result = result.filter((t) => t.cluster === opts.cluster);
  }

  if (opts.featuredOnly) {
    result = result.filter((t) => t.featured);
  }

  return result;
}

export function getProductTestimonials(productSlug: string, max = 4, locale: Locale = 'nl'): Testimonial[] {
  const localeTestimonials = testimonials.filter((t) => (t.locale ?? 'nl') === locale);
  const productReviews = localeTestimonials.filter((t) => t.productSlug === productSlug);
  const generalReviews = localeTestimonials.filter(
    (t) => !t.productSlug && !productReviews.some((pr) => pr.id === t.id),
  );
  return [...productReviews, ...generalReviews].slice(0, max);
}
