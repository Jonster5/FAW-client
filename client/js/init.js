/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const assets = new Pebble.AssetLoader()

let pointer = null;

let actions = null;

assets.load([
    'js/setup.js',
    'js/pub_setup.js',
    'js/pub_loop.js',
    'js/pri_setup.js',
    'js/pri_loop.js'
]).then(() => assets['js/setup.js'].execute())