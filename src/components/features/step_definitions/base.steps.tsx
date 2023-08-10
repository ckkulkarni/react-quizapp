import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "text-encoding";
import Home from "./../../homeandsubmit/Home";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Question1 from "../../questions/Question1";
const feature = loadFeature("src/components/features/base.feature");
defineFeature(feature, (test) => {
  test("User submits form with valid inputs", ({ given, when, and, then }) => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    given("I am on the Home Screen", () => {
      const screen = render(
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question1" element={<Question1 />} />
          </Routes>
        </Router>
      );
      expect(screen).toBeTruthy();
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).toBeDisabled();
    });
    when('I enter a valid email "test@test.com"', () => {
      const emailInput = screen
        .getByTestId("form-mailid")
        .querySelector("input")!;
      expect(emailInput).toBeInTheDocument();
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    });
    and('I enter a valid name "John"', () => {
      const nameInput = screen.getByTestId("form-name").querySelector("input")!;
      expect(nameInput).toBeInTheDocument();
      fireEvent.change(nameInput, { target: { value: "John" } });
    });
    and('I enter a valid phone number "1234567890"', () => {
      const phoneInput = screen
        .getByTestId("form-phone")
        .querySelector("input")!;
      expect(phoneInput).toBeInTheDocument();
      fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    });
    and('I enter a valid age "25"', () => {
      const ageInput = screen.getByTestId("form-age").querySelector("input")!;
      expect(ageInput).toBeInTheDocument();
      fireEvent.change(ageInput, { target: { value: "25" } });
    });
    and('I select the language "ReactJS"', () => {
      const languageSelect = screen.getByRole("radio", {
        name: "ReactJS",
      });
      expect(languageSelect).not.toBeChecked();
      fireEvent.click(languageSelect);
      expect(languageSelect).toBeChecked();
    });
    and("I choose to track my score", () => {
      const scoreSelect = screen.getByRole("radio", {
        name: "Yes",
      });
      expect(scoreSelect).not.toBeChecked();
      fireEvent.click(scoreSelect);
      expect(scoreSelect).toBeChecked();
    });
    then("I submit the form", async () => {
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith(
          "Details Submitted. Starting Quiz..."
        );
      });
      await waitFor(() => {
        expect(window.location.pathname).toEqual("/question1");
      });
    });
  });
});
