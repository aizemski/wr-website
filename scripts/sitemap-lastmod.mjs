import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const INSIGHTS_DIR = path.join(ROOT, 'src/content/insights');
const SITE = 'https://whiteraven.app';

function startOfUtcDay(date) {
	return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function parseFrontmatterDate(content, key) {
	const match = content.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`));
	return match ? new Date(match[1]) : undefined;
}

function getInsightUrl(relativePath) {
	const withoutExt = relativePath.replace(/\.mdx?$/, '');
	if (withoutExt.startsWith('services/')) {
		const [, service, ...rest] = withoutExt.split('/');
		return `${SITE}/blog/services/${service}/${rest.join('/')}/`;
	}
	const [persona, ...rest] = withoutExt.split('/');
	return `${SITE}/blog/${persona}/${rest.join('/')}/`;
}

function walkDir(dir, files = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walkDir(fullPath, files);
		} else if (/\.mdx?$/.test(entry.name)) {
			files.push(fullPath);
		}
	}
	return files;
}

/** @returns {Map<string, string>} canonical insight URL -> ISO lastmod */
export function buildSitemapLastmodMap(now = new Date()) {
	const map = new Map();

	for (const file of walkDir(INSIGHTS_DIR)) {
		const content = fs.readFileSync(file, 'utf8');
		const pubDate = parseFrontmatterDate(content, 'pubDate');
		if (!pubDate || startOfUtcDay(pubDate) > startOfUtcDay(now)) {
			continue;
		}

		const updatedDate = parseFrontmatterDate(content, 'updatedDate');
		const relativePath = path.relative(INSIGHTS_DIR, file);
		const url = getInsightUrl(relativePath);
		map.set(url, (updatedDate ?? pubDate).toISOString());
	}

	return map;
}
