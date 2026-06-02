export const INSIGHT_PERSONAS = [
	'Startup Founders',
	'Enterprise Engineering',
	'Operations Leaders',
	'Small Business',
] as const;

export const INSIGHT_SERVICES = [
	'Product Engineering',
	'Applied AI',
	'Workflow Automation',
	'Cloud & DevOps',
] as const;

export const INSIGHT_TECHNOLOGIES = [
	'React & Next.js',
	'JavaScript & TypeScript',
	'Python',
	'AWS & Serverless',
	'AI & LLMs',
	'CI/CD & DevOps',
	'Data & ETL',
] as const;

export const INSIGHT_INDUSTRIES = [
	'Startups & SaaS',
	'Enterprise Software',
	'Field & Offline Operations',
	'SMB & Professional Services',
	'Regulated & Compliance',
] as const;

export type InsightPersona = (typeof INSIGHT_PERSONAS)[number];
export type InsightService = (typeof INSIGHT_SERVICES)[number];
export type InsightTechnology = (typeof INSIGHT_TECHNOLOGIES)[number];
export type InsightIndustry = (typeof INSIGHT_INDUSTRIES)[number];

export const PERSONA_SLUGS = [
	'startup-founders',
	'enterprise-engineering',
	'operations-leaders',
	'small-business',
] as const;

export const SERVICE_SLUGS = [
	'product-engineering',
	'applied-ai',
	'workflow-automation',
	'cloud-architecture',
] as const;

export const TECHNOLOGY_SLUGS = [
	'react-nextjs',
	'javascript-typescript',
	'python',
	'aws-serverless',
	'ai-llms',
	'cicd-devops',
	'data-etl',
] as const;

export const INDUSTRY_SLUGS = [
	'startups-saas',
	'enterprise-software',
	'field-operations',
	'smb-professional-services',
	'regulated-compliance',
] as const;

export type PersonaSlug = (typeof PERSONA_SLUGS)[number];
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type TechnologySlug = (typeof TECHNOLOGY_SLUGS)[number];
export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

export const PERSONA_META: Record<
	PersonaSlug,
	{ label: InsightPersona; title: string; description: string; forHref: string }
> = {
	'startup-founders': {
		label: 'Startup Founders',
		title: 'Blog for startup founders',
		description:
			'MVP scope, investor-ready products, runway-friendly engineering, and AI that supports traction—not demo fluff.',
		forHref: '/for/startup-founders',
	},
	'enterprise-engineering': {
		label: 'Enterprise Engineering',
		title: 'Blog for enterprise engineering leaders',
		description:
			'Incremental modernization, CI/CD, IAM, and cloud patterns that keep the roadmap moving while debt shrinks.',
		forHref: '/for/enterprise-engineering',
	},
	'operations-leaders': {
		label: 'Operations Leaders',
		title: 'Blog for operations leaders',
		description:
			'Field tools, workflow automation, data pipelines, and dashboards your team adopts from day one.',
		forHref: '/for/operations-leaders',
	},
	'small-business': {
		label: 'Small Business',
		title: 'Blog for small business owners',
		description:
			'Custom portals, phased digitization, and practical automation when SaaS templates do not fit how you work.',
		forHref: '/for/small-business',
	},
};

export const SERVICE_META: Record<
	ServiceSlug,
	{ label: InsightService; title: string; description: string; serviceHref: string }
> = {
	'product-engineering': {
		label: 'Product Engineering',
		title: 'Product engineering blog',
		description:
			'MVPs, React modernization, APIs, and quality practices for teams that need to ship and maintain.',
		serviceHref: '/services/product-engineering',
	},
	'applied-ai': {
		label: 'Applied AI',
		title: 'Applied AI blog',
		description:
			'LLM PoCs, RAG, production ML, and data-quality automation with engineering discipline.',
		serviceHref: '/services/applied-ai',
	},
	'workflow-automation': {
		label: 'Workflow Automation',
		title: 'Workflow automation blog',
		description:
			'PWAs, ETL, operational dashboards, and reporting automation built for adoption.',
		serviceHref: '/services/workflow-automation',
	},
	'cloud-architecture': {
		label: 'Cloud & DevOps',
		title: 'Cloud & DevOps blog',
		description:
			'AWS serverless, CI/CD, IAM baselines, and observability for predictable releases.',
		serviceHref: '/services/cloud-architecture',
	},
};

export const TECHNOLOGY_META: Record<
	TechnologySlug,
	{ label: InsightTechnology; title: string; description: string }
> = {
	'react-nextjs': {
		label: 'React & Next.js',
		title: 'React & Next.js blog',
		description:
			'App Router, server components, composition patterns, and front-end architecture for production web apps.',
	},
	'javascript-typescript': {
		label: 'JavaScript & TypeScript',
		title: 'JavaScript & TypeScript blog',
		description:
			'Type safety, module boundaries, and JavaScript patterns that keep large codebases maintainable.',
	},
	python: {
		label: 'Python',
		title: 'Python blog',
		description:
			'ML pipelines, FastAPI services, scripting, and data jobs that integrate with your product stack.',
	},
	'aws-serverless': {
		label: 'AWS & Serverless',
		title: 'AWS & serverless blog',
		description:
			'Lambda, event-driven design, IAM, and managed AWS patterns for scalable backends.',
	},
	'ai-llms': {
		label: 'AI & LLMs',
		title: 'AI & LLM blog',
		description:
			'Generative AI, RAG, evals, and shipping language-model features with production guardrails.',
	},
	'cicd-devops': {
		label: 'CI/CD & DevOps',
		title: 'CI/CD & DevOps blog',
		description:
			'Pipelines, containers, release engineering, and observability teams can own.',
	},
	'data-etl': {
		label: 'Data & ETL',
		title: 'Data & ETL blog',
		description:
			'Pipelines, scraping, validation, and operational data stores your dashboards trust.',
	},
};

export const INDUSTRY_META: Record<
	IndustrySlug,
	{ label: InsightIndustry; title: string; description: string }
> = {
	'startups-saas': {
		label: 'Startups & SaaS',
		title: 'Startups & SaaS blog',
		description:
			'MVP delivery, traction metrics, and product engineering for venture-backed and bootstrapped software companies.',
	},
	'enterprise-software': {
		label: 'Enterprise Software',
		title: 'Enterprise software blog',
		description:
			'Modernization, platform risk, security review, and delivery at scale inside large engineering orgs.',
	},
	'field-operations': {
		label: 'Field & Offline Operations',
		title: 'Field & offline operations blog',
		description:
			'Mobile capture, PWAs, dispatch workflows, and ops software for teams working away from the desk.',
	},
	'smb-professional-services': {
		label: 'SMB & Professional Services',
		title: 'SMB & professional services blog',
		description:
			'Custom portals, billing workflows, and digitization for owner-led and regional service businesses.',
	},
	'regulated-compliance': {
		label: 'Regulated & Compliance',
		title: 'Regulated & compliance blog',
		description:
			'IAM, audit evidence, controlled rollouts, and architecture when security review is part of every release.',
	},
};

const technologyLabelToSlug = Object.fromEntries(
	(Object.entries(TECHNOLOGY_META) as [TechnologySlug, { label: InsightTechnology }][]).map(
		([slug, meta]) => [meta.label, slug],
	),
) as Record<InsightTechnology, TechnologySlug>;

const industryLabelToSlug = Object.fromEntries(
	(Object.entries(INDUSTRY_META) as [IndustrySlug, { label: InsightIndustry }][]).map(
		([slug, meta]) => [meta.label, slug],
	),
) as Record<InsightIndustry, IndustrySlug>;

const personaLabelToSlug = Object.fromEntries(
	(Object.entries(PERSONA_META) as [PersonaSlug, { label: InsightPersona }][]).map(
		([slug, meta]) => [meta.label, slug],
	),
) as Record<InsightPersona, PersonaSlug>;

const serviceLabelToSlug = Object.fromEntries(
	(Object.entries(SERVICE_META) as [ServiceSlug, { label: InsightService }][]).map(
		([slug, meta]) => [meta.label, slug],
	),
) as Record<InsightService, ServiceSlug>;

export function getPersonaSlugFromLabel(label: InsightPersona): PersonaSlug {
	return personaLabelToSlug[label];
}

export function getServiceSlugFromLabel(label: InsightService): ServiceSlug {
	return serviceLabelToSlug[label];
}

export type BlogTagSlug = PersonaSlug | ServiceSlug | TechnologySlug | IndustrySlug;

export const BLOG_TAG_SLUGS: readonly BlogTagSlug[] = [
	...PERSONA_SLUGS,
	...SERVICE_SLUGS,
	...TECHNOLOGY_SLUGS,
	...INDUSTRY_SLUGS,
];

export type BlogTagDimension = 'persona' | 'service' | 'technology' | 'industry';

export interface BlogTagMeta {
	slug: BlogTagSlug;
	label: string;
	title: string;
	description: string;
	dimension: BlogTagDimension;
	relatedHref?: string;
	relatedLabel?: string;
}

export function isBlogTagSlug(slug: string): slug is BlogTagSlug {
	return (BLOG_TAG_SLUGS as readonly string[]).includes(slug);
}

export function getBlogTagPath(slug: BlogTagSlug): string {
	return `/blog/${slug}/`;
}

export function getBlogTagMeta(slug: BlogTagSlug): BlogTagMeta {
	if (slug in PERSONA_META) {
		const meta = PERSONA_META[slug as PersonaSlug];
		return {
			slug,
			label: meta.label,
			title: meta.title,
			description: meta.description,
			dimension: 'persona',
			relatedHref: meta.forHref,
			relatedLabel: `How we help ${meta.label}`,
		};
	}
	if (slug in SERVICE_META) {
		const meta = SERVICE_META[slug as ServiceSlug];
		return {
			slug,
			label: meta.label,
			title: meta.title,
			description: meta.description,
			dimension: 'service',
			relatedHref: meta.serviceHref,
			relatedLabel: meta.label,
		};
	}
	if (slug in TECHNOLOGY_META) {
		const meta = TECHNOLOGY_META[slug as TechnologySlug];
		return {
			slug,
			label: meta.label,
			title: meta.title,
			description: meta.description,
			dimension: 'technology',
		};
	}
	const meta = INDUSTRY_META[slug as IndustrySlug];
	return {
		slug,
		label: meta.label,
		title: meta.title,
		description: meta.description,
		dimension: 'industry',
	};
}

/** @deprecated Use getBlogTagPath */
export function getPersonaHubPath(slug: PersonaSlug): string {
	return getBlogTagPath(slug);
}

/** @deprecated Use getBlogTagPath */
export function getServiceHubPath(slug: ServiceSlug): string {
	return getBlogTagPath(slug);
}

export function getTechnologySlug(label: InsightTechnology): TechnologySlug {
	return technologyLabelToSlug[label];
}

export function getIndustrySlug(label: InsightIndustry): IndustrySlug {
	return industryLabelToSlug[label];
}

/** @deprecated Use getBlogTagPath */
export function getTechnologyHubPath(slug: TechnologySlug): string {
	return getBlogTagPath(slug);
}

/** @deprecated Use getBlogTagPath */
export function getIndustryHubPath(slug: IndustrySlug): string {
	return getBlogTagPath(slug);
}
