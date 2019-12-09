import { After, Status } from 'cucumber';
import { createLogger } from 'logger';
import { browser } from 'protractor';

const logger = createLogger();
export let userId;

After(async function(scenario) {
  if (scenario.result.status === Status.FAILED) {
    const { attach } = this;
    const png = await browser.takeScreenshot();
    const decodedImage = Buffer.from(png, 'base64');
    logger.info('STEP FAILED: SCREENSHOT TAKEN');
    logger.info('Specs:', scenario.sourceLocation.uri);
    await browser.driver.manage().deleteAllCookies();
    return attach(decodedImage, 'image/png');
  }
  await browser.driver.manage().deleteAllCookies();
  return logger.info('ALL STEPS PASSED');
});
