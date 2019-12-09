Feature: Career: Career Builder

    @RegressionTest @SmokeTest
    Scenario: Find Career advice
      Given I open CareerBuilder
      Then I click on Career Development and Learning
      When I select Career advice
      Then I find the title of Advice & Resources: CareerBuilder's Career Tips
      Then I find the articles "8 tips for the perfect retail sales resume" and "Tips for making your resume stand out"
      When I click on article "10 high-paying health care jobs (besides doctors)"
      Then I am taken to the article page with details about it