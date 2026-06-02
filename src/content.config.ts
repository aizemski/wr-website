import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const BLOG_TAGS = [
	'AI & LLMs',
	'AWS / Serverless',
	'CI/CD & DevOps',
	'Data Engineering',
	'Digital Transformation',
	'JavaScript / TypeScript',
	'Next.js / React',
	'Python',
	'Startups & MVPs',
] as const;

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.enum(BLOG_TAGS)),
	}),
});

export const collections = { blog };
