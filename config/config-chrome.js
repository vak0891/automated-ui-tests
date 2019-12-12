const jsonReports = `${process.cwd()}/reports/json`;
const rimraf = require('rimraf');
const reporter = require('../support/reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: '',

  capabilities: {
    browserName: 'chrome',
    /*chromeOptions: { args: ['--headless', '--disable-gpu', '--window-size=1600,980'] },
    maxInstances: 10,
    restartBrowserBetweenTests: true,*/
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: ['../features/*.feature'],
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
    require: ['../stepDefinitions/*.js', '../support/*.js'],
    tags: '(@RegressionTest or @SmokeTest and (not @LocalTestRun))',
  },

  async onComplete() {
    await browser.close();
    // await reporter.createReport();
    await reporter.createAndUploadCucumberReport();
  },
};
