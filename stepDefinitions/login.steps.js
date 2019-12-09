import { browser } from 'protractor';
import { Given, Then, setDefaultTimeout } from 'cucumber';
import Globals from '../support/globals';
import Constants from '../support/constants';
import SignInPage from '../pages/login';
import Utils from '../support/util';

const globals = new Globals();
const constants = new Constants();
const utils = new Utils();
const signInPage = new SignInPage();
const EC = browser.ExpectedConditions;

const { expect } = globals;

setDefaultTimeout(600 * 1000);

Given(/^I open CareerBuilder$/, async () => {
  await browser.driver.manage().deleteAllCookies();
  await browser.get(constants.cbHomePage, 5000);
  await expect(browser.getTitle()).to.eventually.equal(constants.cbHomePageTitle);
});

Then(/^I click on SignIn$/, async () => {
  await browser.wait(EC.elementToBeClickable(signInPage.signInLink), 10000);
  await signInPage.signInLink.click();
});

Then(/^I am directed to the Career Builder sign in page$/, async () => {
  await browser.wait(EC.titleContains(constants.cbSignInPageTitle), 10000);
  await expect(browser.getTitle()).to.eventually.equal(constants.cbSignInPageTitle);
});

Then(/^I enter "(.*?)" and "(.*?)" as credentials$/, async (email, password) => {
  const el = [signInPage.emailId, signInPage.password];
  const value = [email, password];
  await signInPage.emailId.sendKeys(email);
  await signInPage.password.sendKeys(password);
  await utils.checkInputValue(el, value);
});

Then(/^I click on the Sign In button$/, async () => {
  await signInPage.signInButton.click();
});

Then(/^I am taken to Career Builder home page$/, async () => {
  await browser.wait(EC.titleContains(constants.cbHomePageTitle), 10000);
  await expect(browser.getTitle()).to.eventually.equal(constants.cbHomePageTitle);
});

Then(/^I click on Sign Out button$/, async () => {
  await browser.wait(EC.visibilityOf(signInPage.menuButton));
  await signInPage.menuButton.click();
  await signInPage.signOutButton.click();
  await browser.wait(EC.titleContains(constants.cbHomePageTitle), 10000);
});

Then(/^I should see an error not allowing SignIn$/, async () => {
  await utils.checkTextContent(
    signInPage.errorMessage,
    "Oops! That didn't work. Please check your email and password and try again.",
  );
});

Then(/^I clear the email and password fields$/, async () => {
  await signInPage.emailId.clear();
  await signInPage.password.clear();
});
