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
};
