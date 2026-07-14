import { readFile } from "node:fs/promises";

const stylesheet = await readFile(
	new URL("../src/styles/markdown-extend.styl", import.meta.url),
	"utf8",
);

const mermaidBlock = stylesheet.match(
	/\.mermaid-svg-light,\n\.mermaid-svg-dark\n([\s\S]*?)\n\/\/ 深色\/浅色 SVG 主题切换/,
);

if (!mermaidBlock) {
	throw new Error("Mermaid SVG style block was not found");
}

if (!/^ {2}width: 100%$/m.test(mermaidBlock[1])) {
	throw new Error(
		"Mermaid SVG wrappers must fill the diagram content width to avoid the 300px SVG fallback width",
	);
}

if (!/^ {4}width: 100%$/m.test(mermaidBlock[1])) {
	throw new Error("Mermaid SVG elements must fill their wrapper width");
}

console.log("Mermaid layout regression check passed");
