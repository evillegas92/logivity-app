import type { ParamMatcher } from '@sveltejs/kit';

/** Matches route params like `[id=integer]` only when they're a positive whole number. */
export const match: ParamMatcher = (param) => /^[1-9]\d*$/.test(param);
