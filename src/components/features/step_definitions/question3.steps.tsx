import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "text-encoding";
import Home from "./../../homeandsubmit/Home";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizContext } from "../../../App";
import Question3 from "./../../questions/Question3";
import Question4 from "./../../questions/Question4";
import Question5 from "./../../questions/Question5";
const feature = loadFeature("src/components/features/question3.feature");
defineFeature(feature, (test) => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("User answers first quiz question correctly", ({
    given,
    when,
    then,
  }) => {
    const mockQuizContext = {
      score: 0,
      setScore: jest.fn(),
      name: "chandu",
      setName: jest.fn(),
      age: 0,
      setAge: jest.fn(),
      email: "chandra@chandu.com",
      setMail: jest.fn(),
      phoneNumber: "1234567890",
      setPhone: jest.fn(),
      selectedLanguage: "ReactJS",
      setSelector: jest.fn(),
      trackScore: false,
      setTracker: jest.fn(),
    };
    given("I am on the Question 3 screen", () => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Router>
            <Routes>
              <Route path="/" element={<Question3 />} />
              <Route path="/question4" element={<Question4 />} />
            </Routes>
          </Router>
        </QuizContext.Provider>
      );
      expect(screen).toBeTruthy();
      const questionText = screen.getByText("What is ReactJS?");
      expect(questionText).toBeTruthy();
    });
    when(
      'I select the correct answer and press "Answer", then the score should update, and disable the answer button',
      async () => {
        const correctAnswer = screen.getByRole("radio", {
          name: "A library of JavaScript",
        });
        expect(correctAnswer).toBeTruthy();
        expect(correctAnswer).not.toBeChecked();
        fireEvent.click(correctAnswer);
        expect(correctAnswer).toBeChecked();
        const answerButton = screen.getByRole("button", { name: "Submit" });
        expect(answerButton).toBeTruthy();
        fireEvent.click(answerButton);
        await waitFor(() => {
          expect(mockQuizContext.setScore).toBeCalled();
          expect(answerButton).toBeDisabled();
        });
      }
    );
    then(
      'I navigate to the next question when I click on the "Next Question" button',
      () => {
        const nextQuestionButton = screen.getByRole("button", {
          name: "next-question",
        });
        expect(nextQuestionButton).toBeTruthy();
        fireEvent.click(nextQuestionButton);
        expect(window.location.pathname).toEqual("/question4");
      }
    );
  });
  test("User answers first quiz question incorrectly", ({
    given,
    when,
    then,
  }) => {
    const mockQuizContext = {
      score: 0,
      setScore: jest.fn(),
      name: "chandu",
      setName: jest.fn(),
      age: 0,
      setAge: jest.fn(),
      email: "chandra@chandu.com",
      setMail: jest.fn(),
      phoneNumber: "1234567890",
      setPhone: jest.fn(),
      selectedLanguage: "ReactJS",
      setSelector: jest.fn(),
      trackScore: false,
      setTracker: jest.fn(),
    };
    given("I am on the Question 3 screen", () => {
      const screen = render(
        <QuizContext.Provider value={mockQuizContext}>
          <Router>
            <Routes>
              <Route path="/" element={<Question3 />} />
              <Route path="/question4" element={<Question4 />} />
              <Route path="/question5" element={<Question5 />} />
            </Routes>
          </Router>
        </QuizContext.Provider>
      );
      expect(screen).toBeTruthy();
      const questionText = screen.getByText(
        "In React, which lifecycle method is called when a component is removed from the DOM?"
      );
      expect(questionText).toBeTruthy();
    });
    when(
      'I select an incorrect answer and press "Answer", then the score should remain the same',
      () => {
        const wrongAnswer = screen.getByRole("radio", {
          name: "componentWillUpdate",
        });
        expect(wrongAnswer).toBeTruthy();
        fireEvent.click(wrongAnswer);
        expect(mockQuizContext.score).toBe(0);
      }
    );
    when("I select any of the numbers above the questions", () => {
      const questionNumberButtons = screen
        .getAllByRole("button")
        .filter(
          (button) => button.textContent && /^\d+$/.test(button.textContent)
        );
      expect(questionNumberButtons[0]).toBeTruthy();
      expect(questionNumberButtons[1]).toBeTruthy();
      expect(questionNumberButtons[2]).toBeTruthy();
      expect(questionNumberButtons[3]).toBeTruthy();
      expect(questionNumberButtons[4]).toBeTruthy();
      fireEvent.click(questionNumberButtons[2]);
    });
    then("it should navigate to that respective question screen", () => {
      expect(window.location.pathname).toEqual("/question3");
    });
  });
});
