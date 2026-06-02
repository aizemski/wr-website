export const SITE_TITLE = 'White Raven';
export const SITE_URL = 'https://whiteraven.app';
export const CONTACT_EMAIL = 'contact@whiteraven.app';
export const SITE_DESCRIPTION =
	'White Raven builds web apps, AI systems, and AWS infrastructure for teams that need to ship faster and grow revenue.';

export const CORE_STACK_GROUPS = [
	{
		label: 'Web & front-end',
		items: ['React', 'Next.js', 'TypeScript'],
	},
	{
		label: 'Node.js backend',
		items: ['Node.js', 'Express', 'NestJS', 'Fastify'],
	},
	{
		label: 'Python backend',
		items: ['Python', 'FastAPI', 'Django', 'Flask'],
	},
	{
		label: 'Cloud & platform',
		items: ['AWS', 'Kubernetes'],
	},
	{
		label: 'AI, ML & data science',
		items: ['LLMs', 'LangChain', 'PyTorch', 'TensorFlow', 'scikit-learn', 'pandas', 'Hugging Face'],
	},
] as const;

export const CORE_STACK = CORE_STACK_GROUPS.flatMap((group) => [...group.items]);
