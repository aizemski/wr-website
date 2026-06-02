import fs from 'node:fs';
import path from 'node:path';

/**
 * Expose the sitemap at /sitemap.xml for Google Search Console.
 * @astrojs/sitemap writes sitemap-index.xml + sitemap-0.xml; this promotes one public file.
 * @param {string} outputDir
 */
export function publishSitemapAtRoot(outputDir) {
	const indexPath = path.join(outputDir, 'sitemap-index.xml');
	const firstChunkPath = path.join(outputDir, 'sitemap-0.xml');
	const targetPath = path.join(outputDir, 'sitemap.xml');

	if (!fs.existsSync(firstChunkPath)) {
		return;
	}

	const hasSecondChunk = fs.existsSync(path.join(outputDir, 'sitemap-1.xml'));

	if (hasSecondChunk && fs.existsSync(indexPath)) {
		fs.copyFileSync(indexPath, targetPath);
	} else {
		fs.copyFileSync(firstChunkPath, targetPath);
	}

	if (fs.existsSync(indexPath)) {
		fs.unlinkSync(indexPath);
	}

	for (const file of fs.readdirSync(outputDir)) {
		if (/^sitemap-\d+\.xml$/.test(file)) {
			fs.unlinkSync(path.join(outputDir, file));
		}
	}
}
