Feature: Quiz Question 5

    Scenario: User answers Question 5 correctly
        Given I am on the Question 5 screen
        When I drag the correct answer to the blank space, and the answer is accepted
    Scenario: User answers Question 5 incorrectly
        Given I am on the Question 5 screen
        When I drag an incorrect answer to the blank space, and the answer is rejected
        Then I press the "Submit" button, and it greys out