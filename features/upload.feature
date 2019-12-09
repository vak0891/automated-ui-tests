Feature: Upload: Career Builder

    @RegressionTest @SmokeTest
    Scenario: Upload resume
      Given I open CareerBuilder
      Then I click on SignIn
      Then I am directed to the Career Builder sign in page
      Then I enter "vaish0891@gmail.com" and "toptaltest123#" as credentials
      Then I click on the Sign In button
      Then I am taken to Career Builder home page
      Then I click on Upload or Build resume button
      Then I am redirected to the resume page
      Then I enter a resume Title
      Then I click on Upload Resume option
      Then I click on Save to complete upload
      Then I verify if resume has been uploaded
      Then I delete the resume
      Then I verify that the resume has been deleted
