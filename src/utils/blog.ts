import type { ImageMetadata } from 'astro';

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
