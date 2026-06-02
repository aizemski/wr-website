export const SITE_TITLE = 'White Raven';
export const SITE_URL = 'https://whiteraven.app';
export const CONTACT_EMAIL = 'contact@whiteraven.app';
export const LEGAL_ENTITY_NAME = 'White Raven';
export const LEGAL_LAST_UPDATED = '2 June 2026';

export const GOOGLE_ANALYTICS_ID = 'G-GYWDW0JC8G';
export const COOKIE_SCRIPT_ID = '824b5af3c4c24b4ba3816ef1318f1c55';
export const CLARITY_PROJECT_ID = 'pto3upsbl6';
export const MS_VALIDATE_CONTENT = '7F4846F5B776625D2012F63293844634';
export const GOOGLE_SITE_VERIFICATION = 'e4dSa6PYT0ypIIZ-9MzaWam0BtxhSJ4x8iyMw9TH6hg';
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
