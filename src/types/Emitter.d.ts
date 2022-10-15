/** @format */

import type { EmitChanges } from './EmitChanges';
import { Subscribe } from './Subscribe';

/**
 * @description
 * Emitter Object containing methods to create a signal, subscribe to it or reset the
 * subscriber list.
 */

export type Emitter = {
    /**
     * @description
     * Emit will notify subscribers to execute their action.
     * @type { EmitChanges }
     */
    emit: EmitChanges;
    /**
     * @description
     * Reset will reset the list of subscribers.
     * @type { () => void }
     */
    reset: () => void;
    /**
     * @description
     * Subscribe will add a `action` callback to the subscription list.
     * @type { Subscribe }
     */
    subscribe: Subscribe;
};
