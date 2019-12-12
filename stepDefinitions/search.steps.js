import { browser } from 'protractor';
import { Then, setDefaultTimeout } from 'cucumber';
import Globals from '../support/globals';
import Constants from '../support/constants';
import Search from '../pages/search';
import Utils from '../support/util';

const globals = new Globals();
const constants = new Constants();
const utils = new Utils();
const search = new Search();
const EC = browser.ExpectedConditions;

const { expect } = globals;

setDefaultTimeout(600 * 1000);

Then(/^I enter "(.*?)" in the search field$/, async job_title => {
  const el = [search.searchKeyword];
  const value = [job_title];
  await search.searchKeyword.sendKeys(job_title);
  await utils.checkInputValue(el, value);
});

Then(/^I click the Search Jobs button$/, async () => {
  await search.searchButton.click();
});

Then(/^I am redirected to page with jobs listed$/, async () => {
  await expect(browser.getTitle()).to.eventually.equal(constants.cbQAEngineerPageTitle);
});

Then(/^I see that the "(.*?)" jobs are listed in the left panel$/, async job_title => {
  await browser.wait(EC.presenceOf(search.searchData));
  await utils.checkText(search.searchData, job_title);
});

Then(/^I see that the salary details are listed in the right panel$/, async () => {
  await search.searchDataOption.click();
  await browser.wait(EC.visibilityOf(search.companySalaryText), 10000);
  await utils.checkTextContent(search.companySalaryText, 'Avg. Yearly Salary');
  await expect(search.companySalaryValue.getAttribute('value').toString()).to.not.be.null;
});

Then(/^I also see that the job details are given in the right panel$/, async () => {
  await utils.checkTextContent(search.companyOverview, 'Company Overview');
});

Then(/^I check that the Apply Now button is present$/, async () => {
  await utils.checkTextContent(search.searchButton, 'Apply Now');
});
