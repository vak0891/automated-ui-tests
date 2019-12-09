const jsonReports = `${process.cwd()}/reports/json`;
const rimraf = require('rimraf');
const reporter = require('../support/reporter');

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const KEY = process.env.BROWSERSTACK_KEY;

exports.config = {
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  baseUrl: '',

  capabilities: {
    'browserstack.user': USERNAME,
    'browserstack.key': KEY,
    os: 'Windows',
    os_version: '10',
    browserName: 'Chrome',
    browser_version: '75.0',
    resolution: '1920x1080',
    selenium_version: '3.141.59',
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    '../features/general/*.feature',
    '../features/marketing/**/*.feature',
    '../features/platform/**/*.feature',
  ],
  exclude: '',
  resultJsonOutputFile: './reports/json/protractor_report.json',

  onPrepare() {
    browser.ignoreSynchronization = true;
    browser
      .manage()
      .window()
      .maximize();
    require('babel-register');
    rimraf.sync('./reports/');
    reporter.createDirectory(jsonReports);
  },

  cucumberOpts: {
    strict: true,
    format: 'json:./reports/json/cucumber_report.json',
    require: ['../stepDefinitions/**/*.js', '../support/*.js'],
    tags: '(@RegressionTest or @SmokeTest and (not @LocalTestRun))',
  },

  async onComplete() {
    browser.close();
    // await reporter.createReport();
    await reporter.createAndUploadCucumberReport();
  },
};
