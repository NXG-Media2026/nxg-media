export interface Testimonial {
  id: string;
  name: string;
  outcome?: string;
  photo?: string;
  text: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'placeholder-1',
    name: 'Placeholder',
    text: 'Placeholder testimonial — replace with real coaching client testimonials.',
    featured: true,
  },
];

export function getTestimonials(opts: { featuredOnly?: boolean } = {}): Testimonial[] {
  return opts.featuredOnly ? testimonials.filter((t) => t.featured) : testimonials;
}
