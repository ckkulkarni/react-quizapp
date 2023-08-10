Feature: Quiz Start Button Navigation
    Scenario: User submits form with valid inputs
        Given I am on the Home screen
        When I enter a valid email "test@test.com"
        And I enter a valid name "John"
        And I enter a valid phone number "1234567890"
        And I enter a valid age "25"
        And I select the language "ReactJS"
        And I choose to track my score
        Then I submit the form
