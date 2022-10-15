/** @format */

import http, { Server } from 'node:http';
import type { ServerInit } from '../types';
import { log } from '../utils/log.util';

/**
 * @description
 * Function to create a HTTPServer that listens to a passed url and sends a event inside a
 * subscription of the passed emitter. This way, reloads can be triggered remotely.
 *
 * @param { ServerInit } serverInit - configuration object to pass the url and emitter to the server.
 * @returns { Server } the created HTTPServer
 */

export const createServer = (serverInit: ServerInit): Server => {
    return http.createServer(async (req, res) => {
        const { emitter, url } = serverInit;

        // if the passed url is different from the request url,
        // cancel the request.
        if (req.url !== url) return;

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
        });

        // reset the emitter and add a new subscription
        // when the emitter emits, the server event will be send and the
        // page will reload
        emitter.reset();
        emitter.subscribe(() => {
            log(`Reloading...`);
            res.write('data: { "rld": "true" }\n\n');
        });
    });
};
