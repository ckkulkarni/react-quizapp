import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { QuizContext } from "./../../App";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router";
const Question4 = () => {
  const navigation = useNavigate();
  const { score, setScore, trackScore, setTracker, selectedLanguage } =
    useContext(QuizContext);
  let questionText: string = "";
  let answersObject: string[] = [];
  if (selectedLanguage === "ReactJS") {
    questionText =
      "In React, which lifecycle method is called when a component is removed from the DOM?";
    answersObject = [
      "componentWillUnmount",
      "componentDidMount",
      "componentWillUpdate",
      "componentDidUpdate",
    ];
  } else if (selectedLanguage === "React Native") {
    questionText =
      "Flutter uses dart, and React Native uses JS. Which is easier?";
    answersObject = ["Dart", "JavaScript"];
  } else if (selectedLanguage === "Java") {
    questionText = "Java is . . .";
    answersObject = [
      "Object-Oriented",
      "Platform-Independent",
      "Multithread language",
      "All of the above",
    ];
  }
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    onSubmit: (values) => {
      if (selectedLanguage === "ReactJS") {
        if (values.answer === answersObject[0] && score < 4) {
          setScore((previous) => previous + 1);
        }
      } else if (selectedLanguage === "React Native") {
        if (values.answer === answersObject[0] && score < 4) {
          setScore((previous) => previous + 1);
        }
      } else if (selectedLanguage === "Java") {
        if (values.answer === answersObject[3] && score < 4) {
          setScore((previous) => previous + 1);
        }
      }
      setIsSubmitted(true);
    },
  });
  const handleNavigation = () => {
    navigation("/question5");
  };
  const handleQuestionNavigation = (index: number) => {
    navigation(`/question${index}`);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          alignItems: "flex-end",
          p: 1,
          mt: "25vh",
          mr: 2,
        }}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <IconButton
            onClick={() => handleQuestionNavigation(number)}
            sx={{ border: 1, borderColor: "divider" }}
            key={number}
          >
            {number}
          </IconButton>
        ))}
      </Box>
      <div className="quiz-container">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {trackScore && <Typography>Score: {score}</Typography>}
            <Button
              variant="outlined"
              onClick={() => {
                setTracker(!trackScore);
              }}
            >
              {trackScore ? "Disable Score Tracking" : "Enable Score Tracking"}
            </Button>
          </Box>
          <Box>
            <Typography>{questionText}</Typography>
          </Box>
          <RadioGroup
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
          >
            {answersObject.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                disabled={isSubmitted}
              />
            ))}
          </RadioGroup>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                formik.handleSubmit()
              }
              disabled={isSubmitted}
            >
              Submit
            </Button>
            <IconButton onClick={handleNavigation} aria-label="next-question">
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default Question4;
