import { element } from 'protractor';

export default class Upload {
  constructor() {
    this.uploadResumeHomeButton = element(by.xpath("//a[@data-gtm='homepage|add-resume-btn']"));
    this.addResume = $('#resume_file');
    this.saveResume = $('#save_resume');
    this.resumeTitle = $('#resume_title');
    this.resumeUploadedTitle = element(by.xpath("//h2[contains(.,'QA Engineer Senior')]"));
    this.workExperience = element(by.xpath("(//h3[contains(.,'QA Engineer')])[1]"));
    this.workExperienceCompany = element(by.xpath("(//div[contains(.,'Cloud Clearwater')])[14]"));
    this.education = element(by.xpath("//h3[contains(.,'Hawaii Western')]"));
    this.deleteResume = $('.delete-resume');
    this.deleteConfirm = element(by.xpath("//h3[contains(.,'You haven't added a resume yet')]"));
  }
}
