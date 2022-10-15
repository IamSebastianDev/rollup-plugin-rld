<!-- @format -->

# Rollup-Plugin-Rld

A Rollup plugin to reload your webpage when the bundle is regenerated.

## Overview

The Plugin will inject a bootstrapping script into your bundle when Rollup is running watch mode. The script itself will inject a reloading script that listens to a event sent by the created server when Rollup bundles the code.

## Requirements

The Plugin was tested with Rollup v3.2.0+, but should run with earlier versions as well. The Plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+).

## Installing

Using npm or yarn

```bash
npm install rollup-plugin-rld -D
#or
yarn add rollup-plugin-rld -D
```

## Usage

If you have not already created a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files), do so like shown below. Include the plugin in the `plugins` property.

```js
import { rld } from 'rollup-plugin-rld';

export default {
    input: '/src/index.js',
    output: {
        file: '/dist/bundle.js',
        format: 'iife',
    },
    plugins: [
        // The initialization object is optional.
        rld({
            port: 31415,
            host: 'localhost',
            url: 'rld',
        }),
    ],
};
```

## Options

### `port`

Type: `number`
Default: `31415`

The port the server will use to listen to.

### `host`

Type: `string`
Default: `localhost`

The hostname the server will use to listen to.

### `url`

Type: `string`
Default: `rld`

The url the server will expose. The reload script will use the url to connect to the reload server.

## Contributing

If you would like to contribute, follow the [contribution guide](./contributing.md)

## License

The plugin is licensed under the [MIT License](https://opensource.org/licenses/MIT)
