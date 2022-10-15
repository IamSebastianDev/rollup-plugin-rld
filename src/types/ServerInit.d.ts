/** @format */

import { Emitter } from './Emitter';

export type ServerInit = {
    /**
     * @description
     * Emitter to connect the server to. Used to remotely trigger a response outside the server.
     * @type { Emitter }
     */
    emitter: Emitter;
    /**
     * @description
     * The url to listen to.
     * @type { string }
     */
    url: string;
};
