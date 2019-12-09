export default class SignInPage {
  constructor() {
    this.signInLink = $('#signin-link'); //$('.gnav-LoggedOutAccountLink-text');
    this.emailId = $('#cbsys_login_email');
    this.password = $('#cbsys_login_password');
    this.signInButton = $('#btnsigninemp');
    this.menuButton = element(by.xpath("//span[contains(.,'Vaishnavi')]"));
    this.signOutButton = $('#logout-link');
    this.errorMessage = element(by.xpath('\/\/*[@id=\"MXMessageBoxError\"]/tbody/tr/td[2]/span')); //$('#label-login-password-input-error');
  }
}
