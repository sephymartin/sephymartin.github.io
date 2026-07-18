export function normalizePostImage(value: unknown): unknown {
	if (value == null) {
		return "";
	}

	if (typeof value === "object") {
		return "";
	}

	return value;
}
