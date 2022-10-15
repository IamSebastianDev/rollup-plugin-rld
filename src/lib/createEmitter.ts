/** @format */
import type { Emitter, EmitterAction, EmitChanges, Subscribe } from '../types';

/**
 * @description
 * Creates a simple emitter to emit changes to subscribers.
 *
 * @returns { Emitter } an emitter that can be used to subscribe and emit changes.
 */

export const createEmitter = (): Emitter => {
    const subscribers: Array<{ action: EmitterAction }> = [];

    // Method used to notify subscribers
    const emit: EmitChanges = () => subscribers.forEach(({ action }) => action());

    // Method used to reset the subscription list
    const reset = () => {
        subscribers.length = 0;
    };

    // Method used to subscribe
    const subscribe: Subscribe = (action: EmitterAction) => {
        subscribers.push({ action });
    };

    return {
        emit,
        reset,
        subscribe,
    };
};
