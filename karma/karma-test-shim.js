Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');
require('reflect-metadata');
require('ts-helpers');
require('zone.js/dist/zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/long-stack-trace-zone');
require('rxjs/Rx');

const appContext = require.context('../tests', true, /\.spec\.ts/);
const coreTesting = require('@angular/core/testing');
const browserTesting = require('@angular/platform-browser-dynamic/testing');

appContext.keys().forEach(appContext);
coreTesting.TestBed.initTestEnvironment(
    browserTesting.BrowserDynamicTestingModule,
    browserTesting.platformBrowserDynamicTesting()
);
