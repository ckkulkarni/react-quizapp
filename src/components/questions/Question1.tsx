import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router";
import { Box, IconButton, Typography } from "@mui/material";
import { QuizContext } from "./../../App";
const Question1 = () => {
  const navigation = useNavigate();
  const { score, setScore, trackScore, setTracker, selectedLanguage } =
    useContext(QuizContext);
  let questionText = "";
  let options: string[] = [];
  if (selectedLanguage === "ReactJS") {
    questionText = "What is the extension used for TypeScript in ReactJS?";
    options = [".tsx", ".jsx", ".js", ".java"];
  } else if (selectedLanguage === "React Native") {
    questionText =
      "What are the simpler of the two CLIs used to create React Native Apps?";
    options = ["Expo CLI", "React Native CLI"];
  } else if (selectedLanguage === "Java") {
    questionText =
      "In Java, the class name should always be different from file name. True or False?";
    options = ["True", "False"];
  }

  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    onSubmit: (values) => {
      if (selectedLanguage === "ReactJS") {
        if (values.answer === options[0] && score < 1) {
          setScore((previous) => previous + 1);
        }
      } else if (selectedLanguage === "React Native") {
        if (values.answer === options[0] && score < 1) {
          setScore((previous) => previous + 1);
        }
      } else if (selectedLanguage === "Java") {
        if (values.answer === options[1] && score < 1) {
          setScore((previous) => previous + 1);
        }
      }
      setIsSubmitted(true);
    },
  });
  const handleNavigation = () => {
    navigation("/question2");
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
            <Box sx={{ display: "flex", gap: 5 }}>
              {trackScore && <Typography>Score: {score}</Typography>}
            </Box>
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
            {options.map((option) => (
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

export default Question1;
