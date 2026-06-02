import type { CollectionEntry } from 'astro:content';
import {
	BLOG_TAG_SLUGS,
	INDUSTRY_META,
	INDUSTRY_SLUGS,
	PERSONA_META,
	PERSONA_SLUGS,
	SERVICE_META,
	SERVICE_SLUGS,
	TECHNOLOGY_META,
	TECHNOLOGY_SLUGS,
	getBlogTagMeta,
	getBlogTagPath,
	getIndustryHubPath,
	getIndustrySlug,
	getPersonaHubPath,
	getPersonaSlugFromLabel,
	getServiceHubPath,
	getServiceSlugFromLabel,
	getTechnologyHubPath,
	getTechnologySlug,
	isBlogTagSlug,
	type BlogTagSlug,
	type IndustrySlug,
	type InsightIndustry,
	type InsightPersona,
	type InsightService,
	type InsightTechnology,
	type PersonaSlug,
	type ServiceSlug,
	type TechnologySlug,
} from '../constants/insights-taxonomy';

export {
	BLOG_TAG_SLUGS,
	INDUSTRY_META,
	INDUSTRY_SLUGS,
	INSIGHT_INDUSTRIES,
	INSIGHT_PERSONAS,
	INSIGHT_SERVICES,
	INSIGHT_TECHNOLOGIES,
	PERSONA_META,
	PERSONA_SLUGS,
	SERVICE_META,
	SERVICE_SLUGS,
	TECHNOLOGY_META,
	TECHNOLOGY_SLUGS,
	getBlogTagMeta,
	getBlogTagPath,
	getIndustryHubPath,
	getIndustrySlug,
	getPersonaHubPath,
	getPersonaSlugFromLabel,
	getServiceHubPath,
	getServiceSlugFromLabel,
	getTechnologyHubPath,
	getTechnologySlug,
	isBlogTagSlug,
	type BlogTagSlug,
	type IndustrySlug,
	type InsightIndustry,
	type InsightPersona,
	type InsightService,
	type InsightTechnology,
	type PersonaSlug,
	type ServiceSlug,
	type TechnologySlug,
} from '../constants/insights-taxonomy';

export type InsightEntry = CollectionEntry<'insights'>;

export function isServiceInsight(post: InsightEntry): boolean {
	return post.id.startsWith('services/');
}

export function getPersonaSlug(post: InsightEntry): PersonaSlug | undefined {
	if (isServiceInsight(post)) return undefined;
	const slug = post.id.split('/')[0];
	return PERSONA_SLUGS.includes(slug as PersonaSlug) ? (slug as PersonaSlug) : undefined;
}

export function getServiceSlug(post: InsightEntry): ServiceSlug | undefined {
	if (!isServiceInsight(post)) return undefined;
	const slug = post.id.split('/')[1];
	return SERVICE_SLUGS.includes(slug as ServiceSlug) ? (slug as ServiceSlug) : undefined;
}

export function getInsightUrl(post: InsightEntry): string {
	if (isServiceInsight(post)) {
		const [, service, ...rest] = post.id.split('/');
		return `/blog/services/${service}/${rest.join('/')}/`;
	}
	const [persona, ...rest] = post.id.split('/');
	return `/blog/${persona}/${rest.join('/')}/`;
}

export function getInsightHubUrl(post: InsightEntry): string {
	const serviceSlug = getServiceSlug(post);
	if (serviceSlug) return getBlogTagPath(serviceSlug);
	const personaSlug = getPersonaSlug(post);
	if (personaSlug) return getBlogTagPath(personaSlug);
	return '/blog/';
}

export function filterPostsByTagSlug(posts: InsightEntry[], slug: BlogTagSlug): InsightEntry[] {
	if (PERSONA_SLUGS.includes(slug as PersonaSlug)) {
		return filterByPersonaSlug(posts, slug as PersonaSlug);
	}
	if (SERVICE_SLUGS.includes(slug as ServiceSlug)) {
		return filterByServiceSlug(posts, slug as ServiceSlug);
	}
	if (TECHNOLOGY_SLUGS.includes(slug as TechnologySlug)) {
		return filterByTechnologySlug(posts, slug as TechnologySlug);
	}
	return filterByIndustrySlug(posts, slug as IndustrySlug);
}

export function getReadingTime(body: string): number {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export function sortInsightsByDate(posts: InsightEntry[]): InsightEntry[] {
	return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function filterByPersona(posts: InsightEntry[], persona: InsightPersona): InsightEntry[] {
	return posts.filter((p) => p.data.personas.includes(persona));
}

export function filterByPersonaSlug(posts: InsightEntry[], slug: PersonaSlug): InsightEntry[] {
	return filterByPersona(posts, PERSONA_META[slug].label);
}

export function filterByServiceSlug(posts: InsightEntry[], slug: ServiceSlug): InsightEntry[] {
	const label = SERVICE_META[slug].label;
	return posts.filter((p) => p.data.services?.includes(label));
}

export function filterByTechnologySlug(
	posts: InsightEntry[],
	slug: TechnologySlug,
): InsightEntry[] {
	const label = TECHNOLOGY_META[slug].label;
	return posts.filter((p) => p.data.technologies?.includes(label));
}

export function filterByIndustrySlug(posts: InsightEntry[], slug: IndustrySlug): InsightEntry[] {
	const label = INDUSTRY_META[slug].label;
	return posts.filter((p) => p.data.industries?.includes(label));
}
