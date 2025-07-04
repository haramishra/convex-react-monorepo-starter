import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    category: z.array(z.string()),
    published: z.boolean(),
    pubDate: z.date(),
  }),
});

// const docs = defineCollection({
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//   }),
// });

const guides = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    cover: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const changelog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    versionNumber: z.string(),
    image: z.string(),
    // Transform string to Date object
    date: z.date(),
  }),
});

const legal = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

export const collections = { posts, guides, changelog, legal };
