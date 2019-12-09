import Globals from './globals';

const logger = require('logger').createLogger();

const globals = new Globals();
const { expect } = globals;

let i;

export let usernameRandom;
export let userEmail;

export default class Utils {
  constructor() {
    this.checkTextContent = async function(el, textContent) {
      for (i = 0; i < el.length && i < textContent.length; i++) {
        const val = await el[i].getAttribute('textContent');
        logger.info(val.toString());
        expect(val.toString()).contains(textContent[i]);
      }
    };

    this.checkText = async function(el, text) {
      for (i = 0; i < el.length && i < text.length; i++) {
        const title = await el[i].getText();
        logger.info(`TITLE ${title}`);
        expect(title).contains(text[i]);
      }
    };

    this.checkInputValue = async function(el, value) {
      for (i = 0; i < el.length && i < value.length; i++) {
        const val = await el[i].getAttribute('value');
        logger.info(val.toString());
        expect(val.toString()).to.equal(value[i]);
      }
    };

    // name is the element, attribute is the attribute we would like to check, value is value of attribute
    this.checkAttribute = async function(name, attribute, value) {
      for (i = 0; i < name.length && i < value.length; i++) {
        const val = await name[i].getAttribute(attribute);
        logger.info(val.toString());
        expect(val.toString()).contains(value[i]);
      }
    };
  }
}
