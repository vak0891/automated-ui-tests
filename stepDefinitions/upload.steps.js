import { browser } from 'protractor';
import { Then, setDefaultTimeout } from 'cucumber';
import Globals from '../support/globals';
import Constants from '../support/constants';
import Upload from '../pages/upload';
import SignInPage from '../pages/login';
import Utils from '../support/util';
import * as path from 'path';

const globals = new Globals();
const constants = new Constants();
const utils = new Utils();
const upload = new Upload();
const signInPage = new SignInPage();
const EC = browser.ExpectedConditions;

const { expect } = globals;

setDefaultTimeout(600 * 1000);

Then(/^I click on Upload or Build resume button$/, async () => {
  await browser.wait(EC.presenceOf(signInPage.menuButton), 10000);
  await browser.wait(EC.presenceOf(upload.uploadResumeHomeButton), 10000);
  await upload.uploadResumeHomeButton.click();
});

Then(/^I am redirected to the resume page$/, async () => {
  await browser.wait(EC.titleContains(constants.cbAddResumePageTitle), 10000);
  await expect(browser.getTitle()).to.eventually.equal(constants.cbAddResumePageTitle);
});

Then(/^I enter a resume Title$/, async () => {
  await upload.resumeTitle.sendKeys('QA Engineer Senior');
  await utils.checkInputValue(upload.resumeTitle, 'QA Engineer Senior');
});

Then(/^I click on Upload Resume option$/, async () => {
  const file = './../assets/Resume.docx';
  const file_path = path.resolve(__dirname, file);
  await upload.addResume.sendKeys(file_path);
});

Then(/^I click on Save to complete upload$/, async () => {
  await browser
    .actions()
    .mouseMove(upload.saveResume)
    .click()
    .perform();
});

Then(/^I verify if resume has been uploaded$/, async () => {
  const el = [
    upload.resumeUploadedTitle,
    upload.workExperience,
    upload.workExperienceCompany,
    upload.education,
  ];
  const val = ['QA Engineer Senior', 'QA Engineer', 'Cloud Clearwater', 'Hawaii Western'];
  await utils.checkText(el, val);
});

Then(/^I delete the resume$/, async () => {
  await upload.deleteResume.click();
  await browser.wait(EC.alertIsPresent(), 5000);
  await browser
    .switchTo()
    .alert()
    .then(function(alert) {
      alert.accept();
      return browser.get('https://www.careerbuilder.com/resumes');
    });
});

Then(/^I verify that the resume has been deleted$/, async () => {
  await utils.checkText(upload.deleteConfirm, "You haven't added a resume yet");
});
