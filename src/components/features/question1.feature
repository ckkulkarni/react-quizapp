Feature: Quiz Question 1

    Scenario: User answers first quiz question correctly
        Given I am on the Question 1 screen
        When I select the correct answer and press "Answer", then the score should update, and disable the answer button
        Then I navigate to the next question when I click on the "Next Question" button



    Scenario: User answers first quiz question incorrectly
        Given I am on the Question 1 screen
        When I select an incorrect answer and press "Answer", then the score should remain the same

        When I select any of the numbers above the questions
        Then it should navigate to that respective question screen