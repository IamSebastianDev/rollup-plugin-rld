/** @format */

import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from '../package.json' assert { type: 'json' };

const bundle = (config) => ({
    input: './src/index.ts',
    external: (id) => !/^[./]/.test(id),
    ...config,
});

export default [
    bundle({
        plugins: [
            commonjs(), 
            resolve(), 
            esbuild(), 
            cleanup({extensions: ['.ts']})],
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        output: {
            file: pkg.types,
            format: 'es',
        },
        plugins: [
            resolve(), 
            commonjs(),
            cleanup({ extensions: ['.ts'] }), 
            esbuild(),
            /** 
             * Workaround for rollup-plugin-dts not supporting rollup v3^ configurations as
             * described here: https://github.com/Swatinem/rollup-plugin-dts/issues/226
             * Can be removed once dts updates configurations
             */
            {...dts(), outputOptions: (opts) => ({...opts, interop: 'esModule'})}
        ],
    }),
];
