/** @format */

/**
 * @description
 * Utility function to style a console message and prepend a identifier.
 *
 * @param { string } text - the text to log.
 * @returns { string } the created string.
 */

export const logSuccess = (text: string): string => `\x1b[32m🚀 @Rollup-Plugin-Rld: ${text}\x1b[0m`;
