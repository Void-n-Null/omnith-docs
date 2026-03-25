// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Omnith',
			description: 'Documentation for the Omnith moddable game engine',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Void-n-Null/omnith' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Your First Mod', slug: 'getting-started/your-first-mod' },
						{ label: 'Mod Structure', slug: 'getting-started/mod-structure' },
					],
				},
				{
					label: 'Data-Driven Modding',
					items: [
						{ label: 'Specs', slug: 'data/specs' },
						{ label: 'Components', slug: 'data/components' },
						{ label: 'Inheritance', slug: 'data/inheritance' },
					],
				},
				{
					label: 'C# Modding',
					items: [
						{ label: 'Mod Lifecycle', slug: 'csharp/lifecycle' },
						{ label: 'Systems', slug: 'csharp/systems' },
						{ label: 'Component Factories', slug: 'csharp/component-factories' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
