const assets = new Pebble.AssetLoader();

const pointer = null;

let actions = null;

assets.load([
    "js/setup.js",
    "js/pub_setup.js",
    "js/pub_loop.js",
    "js/pri_setup.js",
    "js/pri_loop.js"
]).then(() => assets["js/setup.js"].execute());