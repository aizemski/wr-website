import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

const assetImages = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/**/*.{jpg,jpeg,png,webp,gif}',
	{ eager: true },
);

export function resolveHeroImage(path: string | undefined): ImageMetadata | undefined {
	if (!path) return undefined;
	const filename = path.replace(/^.*\//, '');
	const entry = Object.entries(assetImages).find(([key]) => key.endsWith(`/${filename}`));
	return entry?.[1].default;
}

export function getReadingTime(body: string): number {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export function getUniqueTags(posts: CollectionEntry<'blog'>[]): string[] {
	return [...new Set(posts.flatMap((post) => post.data.tags))].sort();
}
