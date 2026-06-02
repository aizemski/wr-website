import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
	INSIGHT_INDUSTRIES,
	INSIGHT_PERSONAS,
	INSIGHT_SERVICES,
	INSIGHT_TECHNOLOGIES,
} from './constants/insights-taxonomy';

export {
	INSIGHT_INDUSTRIES,
	INSIGHT_PERSONAS,
	INSIGHT_SERVICES,
	INSIGHT_TECHNOLOGIES,
} from './constants/insights-taxonomy';

const insights = defineCollection({
	loader: glob({ base: './src/content/insights', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		personas: z.array(z.enum(INSIGHT_PERSONAS)).min(1),
		services: z.array(z.enum(INSIGHT_SERVICES)).optional(),
		technologies: z.array(z.enum(INSIGHT_TECHNOLOGIES)).optional(),
		industries: z.array(z.enum(INSIGHT_INDUSTRIES)).optional(),
	}),
});

export const collections = { insights };
