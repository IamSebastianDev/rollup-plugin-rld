/** @format */

/**
 * @description
 * Object to configure the Plugin. All properties are optional
 */

export type RldInit = {
    /**
     * @description
     * The URL the plugin will use to construct and listen to for the reload route. Default to `rld`
     * @type { string }
     */
    url?: string;
    /**
     * @description
     * Port to use with the server. Defaults to `31415`
     * @type { number }
     */
    port?: number;
    /**
     * @description
     * Hostname to use with the server. Defaults to `localhost`
     * @type { string }
     */
    host?: string;
    /**
     * @description
     * Object of attributes used as key value pair to add to the created script tag.
     * This can be useful to add a nonce or similar attributes to the script tag if necessary.
     *
     * eg:
     * ```js
     * {
     *   attributes: {
     *     'class': 'Test'
     *   }
     * }
     *
     * // this will add the class 'test' to the script tag
     * ```
     *
     * @type { Record<string, string> }
     */
    attributes?: Record<string, string>;
    /**
     * @description
     * Boolean flag indicating if information should be logged to the browser console.
     * @type { boolean }
     */
    log?: boolean;
};
