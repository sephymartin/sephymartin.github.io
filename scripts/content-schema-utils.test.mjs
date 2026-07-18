import assert from "node:assert/strict";
import test from "node:test";

import { normalizePostImage } from "../src/utils/content-schema-utils.ts";

test("normalizePostImage keeps explicit cover strings", () => {
	assert.equal(
		normalizePostImage("assets/images/cover.avif"),
		"assets/images/cover.avif",
	);
	assert.equal(
		normalizePostImage("https://assets.example.com/cover.webp"),
		"https://assets.example.com/cover.webp",
	);
});

test("normalizePostImage treats empty image values as no cover image", () => {
	assert.equal(normalizePostImage(undefined), "");
	assert.equal(normalizePostImage(null), "");
	assert.equal(normalizePostImage(""), "");
});

test("normalizePostImage treats object image values as no cover image", () => {
	assert.equal(normalizePostImage({}), "");
	assert.equal(
		normalizePostImage({ src: "https://assets.example.com/cover.webp" }),
		"",
	);
});
