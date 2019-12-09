const jsonReports = `${process.cwd()}/reports/json`;
const reporter = require('../support/reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: '',

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--disable-gpu', '--window-size=1920,1080'],
      },
      shardTestFiles: true,
      maxInstances: 10,
      restartBrowserBetweenTests: true,
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['--headless', '--disable-gpu', '--window-size=1920,1080'],
      },
      maxInstances: 10,
      restartBrowserBetweenTests: true,
    },
  ],

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
    await reporter.createReport();
  },
};
