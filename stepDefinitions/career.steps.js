import { browser } from 'protractor';
import { When, Then, setDefaultTimeout } from 'cucumber';
import Constants from '../support/constants';
import Career from '../pages/career';
import Utils from '../support/util';

const constants = new Constants();
const utils = new Utils();
const career = new Career();
const EC = browser.ExpectedConditions;

setDefaultTimeout(600 * 1000);

Then(/^I click on Career Development and Learning$/, async () => {
  await career.careerMenu.click();
});

When(/^I select Career advice$/, async () => {
  await career.careerAdvice.click();
  await browser.wait(EC.titleContains(constants.cbCareerAdvicePageTitle));
});

Then(/^I find the title of Advice & Resources: CareerBuilder's Career Tips$/, async () => {
  await utils.checkText(
    career.careerAdviceTitle,
    "Advice & Resources: CareerBuilder's Career Tips ",
  );
});

Then(/^I find the articles "(.*?)" and "(.*?)"$/, async (article_title1, article_title2) => {
  await browser
    .actions()
    .mouseMove(career.article1)
    .perform();
  const el = [career.article1, career.article2];
  const val = [article_title1, article_title2];
  await utils.checkText(el, val);
});

When(/^I click on article "(.*?)"$/, async article_title3 => {
  //await utils.checkText(career.article3, article_title3);
  await career.article3.click();
  await browser.wait(EC.urlIs(constants.cbArticleLink), 10000);
  await utils.checkText(career.article3Title, article_title3);
});

Then(/^I am taken to the article page with details about it$/, async () => {
  const el = [career.article3Author, career.article3SubTitle];
  const val = [
    'By Matthew Tarpey | November 1, 2019',
    'CHECK OUT THESE 10 NON-DOCTOR JOBS IN THE HEALTH CARE INDUSTRY',
  ];
  await utils.checkText(el, val);
});
