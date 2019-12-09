import { element } from 'protractor';

export default class Career {
  constructor() {
    this.careerMenu = element(by.xpath("//span[contains(.,'Career Development & Learning')]"));
    this.careerAdvice = element(by.xpath("//a[contains(.,'Career Advice')]"));
    this.careerAdviceTitle = element(
      by.xpath("//h1[contains(.,'Advice & Resources: CareerBuilder's Career Tips')]"),
    );
    this.article1 = element(
      by.xpath("//h2[contains(.,'8 tips for the perfect retail sales resume')]"),
    );
    this.article2 = element(by.xpath("//h2[contains(.,'Tips for making your resume stand out')]"));
    this.article3 = element(
      by.xpath("//h2[contains(.,'10 high-paying health care jobs (besides doctors)')]"),
    );
    this.article3Author = element(
      by.xpath("//div[@class='byline'][contains(.,'By Matthew Tarpey | November 1, 2019')]"),
    );
    this.article3Title = element(
      by.xpath("//h1[contains(.,'10 high-paying health care jobs (besides doctors)')]"),
    );
    this.article3SubTitle = element(
      by.xpath(
        "//h2[contains(.,'Check out these 10 non-doctor jobs in the health care industry')]",
      ),
    );
  }
}
