import { defineConfig, ConsoleType } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginPug } from "@rsbuild/plugin-pug";
import { pluginSass } from '@rsbuild/plugin-sass';


const devMode = process.env.NODE_ENV === 'development';

export default defineConfig({
	output: {
		injectStyles: devMode,
		sourceMap: {
			js: devMode ?
				// Use a more performant source map format for development
				'eval-cheap-module-source-map':
				// Use a high quality source map format for production
				false,
			css: true,
		},
	},
	performance: {
		removeConsole: ['log', 'time', 'timeEnd'] as ConsoleType[],
	},
	plugins: [
		pluginVue(),
		pluginPug(),
		pluginSass({
			sassLoaderOptions: {
				implementation: require.resolve('sass'),
				sourceMap: true,
				sassOptions: {
					// quietDeps: true,
					silenceDeprecations: [
						// 'mixed-decls',
						'import',
					],
				},
				additionalData: `
					@use 'sass:color';
					@import '@/app/styles/utils/vars.scss';
					@import '@/app/styles/utils/mixins.scss';
				`,
			},
		}),
	],
});
