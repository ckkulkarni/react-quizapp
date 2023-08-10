import { useContext, useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  Radio,
  Button,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { QuizContext } from "./../../App";
const Question2 = () => {
  const navigation = useNavigate();
  const { score, setScore, trackScore, setTracker, selectedLanguage } =
    useContext(QuizContext);
  let questionText: string = "";
  let answersObject: string[] = [];
  if (selectedLanguage === "ReactJS") {
    questionText =
      "Which of these packages that are used to install React and create React Apps?";
    answersObject = ["JVM", "npm -- Node Package Manager"];
  } else if (selectedLanguage === "React Native") {
    questionText =
      "Is it true that React Native can only be used to create Android Apps?";
    answersObject = ["Yes", "No"];
  } else if (selectedLanguage === "Java") {
    questionText =
      "Arrays should always contain the same type of elements. True or false?";
    answersObject = ["True", "False"];
  }
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    onSubmit: (values) => {
      if (selectedLanguage === "ReactJS") {
        if (values.answer === answersObject[1] && score < 2) {
          setScore((previous) => previous + 1);
        }
      } else if (selectedLanguage === "React Native") {
        if (values.answer === answersObject[1] && score < 2) {
          setScore((previous) => previous + 1);
        }
      } else if (selectedLanguage === "Java") {
        if (values.answer === answersObject[0] && score < 2) {
          setScore((previous) => previous + 1);
        }
      }
      setIsSubmitted(true);
    },
  });
  const handleNavigation = () => {
    navigation("/question3");
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

export default Question2;
