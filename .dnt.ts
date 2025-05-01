import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: [
		...configJSR.getExports(),
		{
			executable: true,
			name: "djb2a",
			path: "./cli.ts"
		}
	],
	fixInjectedImports: true,
	generateDeclarationMap: true,
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
		description: "A CLI and module to get the non-cryptographic hash of the data with algorithm DJB2a.",
		keywords: [
			"djb2a",
			"hash"
		],
		homepage: "https://github.com/hugoalh/djb2a-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/djb2a-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/djb2a-es.git"
		},
		scripts: {
		},
		engines: {
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm",
	outputDirectoryPreEmpty: true
});
