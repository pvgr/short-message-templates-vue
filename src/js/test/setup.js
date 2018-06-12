require('jsdom-global')();

global.expect = require('expect');
global.Vue = require('vue');
global.bus = new Vue();
