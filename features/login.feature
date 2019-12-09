@TEST_TEST-1476
Feature: Authentication: Career Builder

    @RegressionTest @SmokeTest
    Scenario: LoginLogout
      Given I open CareerBuilder
      Then I click on SignIn
      Then I am directed to the Career Builder sign in page
      Then I enter "vaish0891@gmail.com" and "toptaltest123#" as credentials
      Then I click on the Sign In button
      Then I am taken to Career Builder home page
      Then I click on Sign Out button
      Then I am taken to Career Builder home page

    @RegressionTest @SmokeTest
    Scenario: Invalid entry checks for Login
      Given I open CareerBuilder
      And I click on SignIn
      Then I am directed to the Career Builder sign in page
      Then I enter "abcdef123" and "@#$%^&" as credentials
      Then I click on the Sign In button
      Then I should see an error not allowing SignIn
      Then I clear the email and password fields
      Then I enter "abcdef123@nomail" and "     " as credentials
      Then I click on the Sign In button
      Then I should see an error not allowing SignIn
      Then I clear the email and password fields
      Then I enter "https://" and "(()))" as credentials
      Then I click on the Sign In button
      Then I should see an error not allowing SignIn
      Then I clear the email and password fields
      Then I enter "input@email.in" and "abcdeesdssss" as credentials
      Then I click on the Sign In button
      Then I should see an error not allowing SignIn
      Then I clear the email and password fields
      Then I enter "input@email.in.com" and "1122334455" as credentials
      Then I click on the Sign In button
      Then I should see an error not allowing SignIn
      Then I clear the email and password fields