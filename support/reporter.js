const fs = require('fs');
const mkdirp = require('mkdirp');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const report = require('cucumber-html-report');
const logger = require('logger').createLogger();
const reporter = require('cucumber-html-reporter');
const request = require('../support/apiCallsHelper');

const htmlReports = `${process.cwd()}/reports/html`;
const targetJson = `${process.cwd()}/reports/json/cucumber_report.json`;

const cucumberReportOptions = {
  source: targetJson,
  dest: htmlReports,
  name: 'cucumber_report.html',
  title: 'Cucumber Report',
};
const cucumberReporteroptions = {
  theme: 'bootstrap',
  jsonFile: targetJson,
  output: `${htmlReports}/cucumber_reporter.html`,
  reportSuiteAsScenarios: true,
};

const jiraUrl = 'https://xray.cloud.xpand-it.com';

class Reporter {
  static createDirectory(dirName) {
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
  }

  static async createReport() {
    try {
      reporter.generate(cucumberReporteroptions);
      report
        .create(cucumberReportOptions)
        .then(() => {
          logger.info('cucumber_report.html created successfully!');
        })
        .catch(err => {
          if (err) {
            logger.error(err);
          }
        });
    } catch (err) {
      if (err) {
        logger.error('Failed to save cucumber test results to json file.');
        logger.error(err);
      }
    }
  }

  static async createAndUploadCucumberReport() {
    try {
      reporter.generate(cucumberReporteroptions);
      report
        .create(cucumberReportOptions)
        .then(() => {
          logger.info('cucumber_report.html created successfully!');
        })
        .catch(err => {
          if (err) {
            logger.error(err);
          }
        });
    } catch (err) {
      if (err) {
        logger.error('Failed to save cucumber test results to json file.');
        logger.error(err);
      }
    }

    async function getToken() {
      const jiraEndpoint = '/api/v1/authenticate';
      const requestBody = {
        client_id: 'FBF60B196E454B5DA31C55E7E311909A',
        client_secret: '6a01439640888b6b682566b578bbe31236f8d18fec92fa56c083168d50e0d4a4',
      };
      const res = await request.sendPOSTRequestAuth(
        jiraUrl,
        jiraEndpoint,
        requestBody,
        'application/json',
      );
      return res.body.toString();
    }

    async function uploadResults() {
      const requestBody = await readFile('./reports/json/cucumber_report.json', 'utf8');
      const jiraEndpoint = '/api/v1/import/execution/cucumber';
      const authentication = await getToken();
      const res = await request.sendPOSTRequestAuth(
        jiraUrl,
        jiraEndpoint,
        requestBody,
        authentication,
      );
      logger.info(res.text.toString());
      return res.text.toString();
    }
    // await uploadResults();
  }
}
module.exports = Reporter;
