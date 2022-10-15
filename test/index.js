/** @format */
import test from 'ava';
import { rld } from '../dist/index.mjs';

test(`Plugin is a Factory Function`, (t) => {
    t.is(typeof rld, 'function');
});

test(`Plugin instances correctly`, (t) => {
    const plugin = rld();
    t.is(typeof plugin, 'object');
    t.is(typeof plugin.buildStart, 'function');
    t.is(typeof plugin.transform, 'function');
    t.is(typeof plugin.closeWatcher, 'function');
    t.is(typeof plugin.buildEnd, 'function');
    t.is(plugin.name, 'Rollup-Plugin-Rld');
});
