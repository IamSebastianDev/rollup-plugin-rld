/** @format */

import type { Plugin, RollupOptions } from 'rollup';
import type { Server } from 'node:http';
import { createEmitter } from './lib/createEmitter';
import { createServer } from './lib/createServer';
import { injectable } from './lib/injectable';
import type { RldInit } from './types';

/**
 * @description
 * Factory function to create the Plugin object from the passed init / defaults.
 * `Rollup-Plugin-Rld` will inject a function into your bundle when Rollup is used in watch mode.
 * The function itself will inject a script tag if executed in a HTML instance, that will listen to
 * the server created by the plugin. If changes to the bundle are detected, a reload will be triggered.
 *
 * @param { Partial<RldInit> } init - The optional init Object for the Plugin.
 * @returns { Plugin } the Plugin object.
 */

export const rld = (init: Partial<RldInit> = {}): Plugin => {
    // Parse the user provided initialization object into the defaults.
    const config = { port: 31415, host: 'localhost', url: '/rld', ...init };
    // normalize config.url parameter to ensure correct url param
    config.url = config.url[0] === '/' ? config.url : '/' + config.url;

    const emitter = createEmitter();
    let watch = false;
    let server: Server | null = null;

    return {
        name: 'Rollup-Plugin-Rld',

        /**
         * Use the `options` hook to determine if rollup is in
         * watch mode or not.
         */
        async options(options: RollupOptions) {
            watch = !!options.watch;
        },

        /**
         * The `buildStart` hook is used to create the server if it
         * does not already exist and the bundler is not in watch mode.
         */
        async buildStart() {
            if (server || !watch) return;

            server = createServer({ emitter, url: config.url });
            server.listen(config.port, config.host);
            server.on('error', (err) => {
                console.log({ err });
            });
        },

        /**
         * The `buildEnd` hook is used to emit the reload event.
         */
        async buildEnd() {
            if (!watch) return;
            emitter.emit();
        },

        /**
         * The `closeWatcher` hoo is used to close the server so as to not leave any
         * unterminated servers.
         */
        async closeWatcher() {
            if (server) server.close();
        },

        /**
         * Use the `transform` hook to inject the bundle in watch mode into the entry
         * module.
         */
        async transform(code, module) {
            if (!watch || !this.getModuleInfo(module)?.isEntry) return code;
            return (
                `(${injectable.toString()})(${config.port}, '${config.host}', '${config.url}', '${JSON.stringify(
                    config.attributes || {}
                )}');\n` + code
            );
        },
    };
};
