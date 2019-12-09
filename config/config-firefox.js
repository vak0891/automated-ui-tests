const jsonReports = `${process.cwd()}/reports/json`;
const rimraf = require('rimraf');
const reporter = require('../support/reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: '',

  capabilities: {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['--headless', '--disable-gpu', '--window-size=1600,980'],
    },
    maxInstances: 10,
    restartBrowserBetweenTests: true,
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ['../features/marketing/**/*.feature', '../features/platform/**/*.feature'],
  exclude: '',
  resultJsonOutputFile: './reports/json/protractor_report.json',

  onPrepare() {
    browser.ignoreSynchronization = true;
    require('babel-register');
    rimraf.sync('./reports/');
    reporter.createDirectory(jsonReports);
  },

  cucumberOpts: {
    strict: true,
    format: 'json:./reports/json/cucumber_report.json',
    require: ['../stepDefinitions/**/*.js', '../support/*.js'],
    tags: '(@RegressionTest or @SmokeTest) and (not @LocalTestRun) and (not @FirefoxTBF)',
  },

  async onComplete() {
    await reporter.createAndUploadCucumberReport();
  },
};
