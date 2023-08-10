import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "text-encoding";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizContext } from "../../../App";
import Home from "./../../homeandsubmit/Home";
import Question5 from "./../../questions/Question5";
import SubmitScreen from "../../homeandsubmit/SubmitScreen";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "jest-canvas-mock";
const feature = loadFeature("src/components/features/submitscreen.feature");
global.ResizeObserver = require("resize-observer-polyfill");
defineFeature(feature, (test) => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("User submits their quiz and sees their results", ({
    given,
    when,
    then,
    and,
  }) => {
    const mockQuizContext = {
      score: 5,
      setScore: jest.fn(),
      name: "chandu",
      setName: jest.fn(),
      age: 25,
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
    given("the user has completed the quiz is on the Submit Screen", () => {
      const screen = render(
        <DndProvider backend={HTML5Backend}>
          <QuizContext.Provider value={mockQuizContext}>
            <Router>
              <Routes>
                <Route path="/" element={<SubmitScreen />} />
                <Route element={<Home />} />
              </Routes>
            </Router>
          </QuizContext.Provider>
        </DndProvider>
      );
      expect(screen).toBeTruthy();
      const container = screen.getByTestId("submission-container");
      expect(container).toBeTruthy();
    });
    when(
      "the user should see the details they entered in the home screen",
      () => {
        expect(screen.getByText("chandu")).toBeTruthy();
        expect(screen.getByText("chandra@chandu.com")).toBeTruthy();
        expect(screen.getByText("1234567890")).toBeTruthy();
        expect(screen.getByText("ReactJS")).toBeTruthy();
        expect(screen.getByText("5/8")).toBeTruthy();
        expect(screen.getByText("25")).toBeTruthy();
      }
    );
    and("the user should see their score in a pie chart", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("submitscreen-piechart")).toBeInTheDocument();
      });
    });
    and("the user should see a button to re-enter their details", () => {
      const tryAgainButton = screen.getByRole("button", { name: "Try again?" });
      expect(tryAgainButton).toBeTruthy();
      fireEvent.click(tryAgainButton);
      expect(window.location.pathname).toEqual("/");
    });
  });
});
