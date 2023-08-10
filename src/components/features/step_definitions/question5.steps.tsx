import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "text-encoding";
import Home from "./../../homeandsubmit/Home";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizContext } from "../../../App";
import Question5 from "./../../questions/Question5";
import SubmitScreen from "../../homeandsubmit/SubmitScreen";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const feature = loadFeature("src/components/features/question5.feature");
defineFeature(feature, (test) => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("User answers Question 5 correctly", ({ given, when, then }) => {
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
    given("I am on the Question 5 screen", () => {
      const screen = render(
        <DndProvider backend={HTML5Backend}>
          <QuizContext.Provider value={mockQuizContext}>
            <Router>
              <Routes>
                <Route path="/" element={<Question5 />} />
                <Route path="/submission" element={<SubmitScreen />} />
              </Routes>
            </Router>
          </QuizContext.Provider>
        </DndProvider>
      );
      expect(screen).toBeTruthy();
      const questionText = screen.getByText("React is used to make _");
      expect(questionText).toBeTruthy();
    });
    when(
      "I drag the correct answer to the blank space, and the answer is accepted",
      async () => {
        const draggableAnswer = screen.getByText("UIs");
        const dropZone = screen.getAllByText("Drop here");
        fireEvent.dragStart(draggableAnswer);
        fireEvent.dragEnter(dropZone[1]);
        fireEvent.drop(dropZone[1]);
        expect(mockQuizContext.setScore).toBeCalled();
      }
    );

    test("User answers Question 5 incorrectly", ({ given, when, then }) => {
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
      given("I am on the Question 5 screen", () => {
        const screen = render(
          <DndProvider backend={HTML5Backend}>
            <QuizContext.Provider value={mockQuizContext}>
              <Router>
                <Routes>
                  <Route path="/" element={<Question5 />} />
                  <Route path="/submission" element={<SubmitScreen />} />
                </Routes>
              </Router>
            </QuizContext.Provider>
          </DndProvider>
        );
        expect(screen).toBeTruthy();
        const questionText = screen.getByText("React is a _");
        expect(questionText).toBeTruthy();
      });
      when(
        "I drag an incorrect answer to the blank space, and the answer is rejected",
        () => {
          const draggableAnswer = screen.getByText("Redux");
          const dropZone = screen.getAllByText("Drop here");
          fireEvent.dragStart(draggableAnswer);
          fireEvent.dragEnter(dropZone[0]);
          fireEvent.drop(dropZone[0]);
          expect(mockQuizContext.score).toBe(0);
        }
      );
      then('I press the "Submit" button, and it greys out', async () => {
        const submitButton = screen.getByRole("button", { name: "Submit" });
        expect(submitButton).toBeTruthy();
        fireEvent.click(submitButton);
        await waitFor(() => {
          expect(submitButton).toBeDisabled();
        });
      });
    });
  });
});
