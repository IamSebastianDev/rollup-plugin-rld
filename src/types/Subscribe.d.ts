/** @format */

import type { EmitterAction } from './EmitterAction';

/**
 * @description
 * Function to subscribe to an `Emitter`.
 *
 * @param { EmitterAction } action - callback to execute when notified.
 */
export type Subscribe = (action: EmitterAction) => void;
