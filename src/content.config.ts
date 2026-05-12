import { defineCollection, z } from 'astro:content';

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const seoFields = z.object({
  title: z.string().max(60),
  description: z.string().max(155),
});

const produkte = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    price: z.string(),
    currency: z.literal('EUR'),
    plugAndPayUrl: z.string().url(),
    heroImage: image().optional(),
    shortDescription: z.string().max(160),
    longDescription: z.string(),
    includes: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })),
    targetAudience: z.array(z.string()),
    // Cluster membership (per CLUSTER_ARCHITECTURE_V1.2)
    cluster: z.string().optional(),
    productType: z.enum(['guide', 'bundle', 'course', 'membership', 'micro-product']).optional(),
    // "Not for you if" — honest positioning (hybrid sales page)
    notForYou: z.array(z.string()).optional(),
    faq: z.array(faqItem).default([]),
    featuredTestimonialIds: z.array(z.string()).optional(),
    relatedProductSlugs: z.array(z.string()).optional(),
    sortOrder: z.number().default(50),
    seo: seoFields,
  }),
});

const coaching = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    format: z.enum(['1-on-1', 'group', 'hybrid']),
    duration: z.string(),
    heroImage: image().optional(),
    shortDescription: z.string().max(160),
    outcomes: z.array(z.string()),
    methodology: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    includes: z.array(z.string()),
    faq: z.array(faqItem).default([]),
    ctaUrl: z.string(),
    seo: seoFields,
  }),
});

const artikel = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    pillarSlug: z.string(),
    // Cluster membership (per CLUSTER_ARCHITECTURE_V1.2 §3.1)
    // Content frontmatter owns cluster membership; cluster YAML owns strategy/routing.
    cluster: z.string().optional(),
    secondaryClusters: z.array(z.string()).optional(),
    publishedDate: z.date(),
    lastReviewedDate: z.date(),
    excerpt: z.string().max(200),
    heroImage: image().optional(),
    authorId: z.string().default('verena'),
    readingTime: z.number(),
    relatedArticleSlugs: z.array(z.string()).optional(),
    relatedProductSlugs: z.array(z.string()).optional(),
    seo: seoFields,
  }),
});

const pillars = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    heroImage: image().optional(),
    citableDefinition: z.string().max(300),
    subtopics: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    faq: z.array(faqItem).default([]),
    seo: seoFields,
  }),
});

const archetypen = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    heroImage: image().optional(),
    shortDescription: z.string().max(200),
    explanation: z.string(),
    commonSymptoms: z.array(z.string()),
    recommendedProductSlugs: z.array(z.string()),
    recommendedCoachingSlugs: z.array(z.string()),
    // Cluster bridging: quiz result → cluster hub (CLUSTER_ARCHITECTURE_V1.2)
    recommendedClusterSlugs: z.array(z.string()).optional(),
    faq: z.array(faqItem).default([]),
    seo: seoFields,
  }),
});

const mitgliedschaft = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    heroImage: image().optional(),
    monthlyPrice: z.string(),
    whatYouGet: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    format: z.string(),
    faq: z.array(faqItem).default([]),
    ctaUrl: z.string().optional(),
    seo: seoFields,
    isLive: z.boolean().default(false),
  }),
});

const glossar = defineCollection({
  type: 'data',
  schema: z.object({
    term: z.string(),
    slug: z.string(),
    cluster: z.string().optional(),
    secondaryClusters: z.array(z.string()).optional(),
    definition: z.string(),
    longDescription: z.string().optional(),
    relatedTerms: z.array(z.string()).optional(),
    linkedArticle: z.string().optional(),
    seo: seoFields.optional(),
  }),
});

const leadMagnets = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    heroImage: image().optional(),
    coverImage: image().optional(),
    shortDescription: z.string().max(160),
    whatYouGet: z.array(z.string()),
    pages: z.number().optional(),
    tag: z.string(),
    deliveryFileUrl: z.string().url().optional(),
    seo: seoFields,
  }),
});

export const collections = {
  produkte,
  coaching,
  artikel,
  pillars,
  archetypen,
  mitgliedschaft,
  leadMagnets,
  glossar,
};
