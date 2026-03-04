import { defineCollection, z } from 'astro:content';

const avisSchema = z.object({
  auteur: z.string(),
  date: z.string(),
  note: z.number().min(1).max(5),
  texte: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  reponse: z.string(),
});

const agences = defineCollection({
  type: 'data',
  schema: z.object({
    nom: z.string(),
    slug: z.string(),
    ville: z.string(),
    siteWeb: z.string(),
    logo: z.string().optional(),
    specialites: z.array(z.string()),
    description: z.string(),
    noteGlobale: z.number(),
    avis: z.array(avisSchema),
    faq: z.array(faqSchema),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.string().optional(),
    agencesLiees: z.array(z.string()).optional(),
  }),
});

export const collections = { agences, blog };
