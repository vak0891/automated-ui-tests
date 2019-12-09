Feature: Search: Career Builder

    @RegressionTest @SmokeTest
    Scenario: Search by Job title
      Given I open CareerBuilder
      Then I enter "QA Engineer" in the search field
      Then I click the Search Jobs button
      Then I am redirected to page with jobs listed
      Then I see that the "QA Engineer" jobs are listed in the left panel
      Then I see that the salary details are listed in the right panel
      Then I also see that the job details are given in the right panel
      Then I check that the Apply Now button is present

    @RegressionTest @SmokeTest
    Scenario: Save search