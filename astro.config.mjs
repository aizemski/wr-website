// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

const personaRedirects = Object.fromEntries(
	[
		'startup-founders',
		'enterprise-engineering',
		'operations-leaders',
		'small-business',
	].map((slug) => [`/insights/${slug}`, `/blog/${slug}`]),
);

const serviceRedirects = Object.fromEntries(
	[
		'product-engineering',
		'applied-ai',
		'workflow-automation',
		'cloud-architecture',
	].map((slug) => [`/insights/services/${slug}`, `/blog/${slug}`]),
);

const technologyRedirects = Object.fromEntries(
	[
		'react-nextjs',
		'javascript-typescript',
		'python',
		'aws-serverless',
		'ai-llms',
		'cicd-devops',
		'data-etl',
	].map((slug) => [`/insights/technologies/${slug}`, `/blog/${slug}`]),
);

const industryRedirects = Object.fromEntries(
	[
		'startups-saas',
		'enterprise-software',
		'field-operations',
		'smb-professional-services',
		'regulated-compliance',
	].map((slug) => [`/insights/industries/${slug}`, `/blog/${slug}`]),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://whiteraven.app',
  redirects: {
    '/insights': '/blog',
    ...personaRedirects,
    ...serviceRedirects,
    ...technologyRedirects,
    ...industryRedirects,
    '/blog/startup-founders-investor-demo-vs-production-mvp': '/blog/startup-founders/investor-demo-vs-production-mvp',
    '/blog/enterprise-engineering-strangler-migration-without-freeze': '/blog/enterprise-engineering/strangler-migration-without-freeze',
    '/blog/operations-leaders-stop-rekeying-field-data': '/blog/operations-leaders/stop-rekeying-field-data',
    '/blog/small-business-custom-portal-vs-saas': '/blog/small-business/custom-portal-vs-saas',
    '/blog/custom-product-engineering-mvp-and-modernization': '/blog/services/product-engineering/mvp-and-modernization',
    '/blog/applied-ai-llm-poc-to-production': '/blog/services/applied-ai/llm-poc-to-production',
    '/blog/workflow-automation-offline-pwa-operations': '/blog/services/workflow-automation/offline-pwa-operations',
    '/blog/cloud-architecture-serverless-cicd-basics': '/blog/services/cloud-architecture/serverless-cicd-basics',
    '/blog/modern-javascript-patterns': '/blog/enterprise-engineering/modern-javascript-patterns',
    '/blog/python-ai-ml-production': '/blog/services/applied-ai/python-ai-ml-production',
    '/blog/web-development-trends-2026': '/blog/enterprise-engineering/web-development-trends-2026',
  },
  integrations: [mdx(), react(), sitemap()],

  adapter: cloudflare({
      platformProxy: {
          enabled: true
      },

      imageService: "cloudflare"
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
