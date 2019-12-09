import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiJsonPattern from 'chai-json-pattern';

export default class Globals {
  constructor() {
    this.expect = chai.expect;
    chai.use(chaiAsPromised);
    chai.use(chaiJsonPattern);
  }
}
