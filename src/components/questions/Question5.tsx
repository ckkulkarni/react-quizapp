import { useContext, useState } from "react";
import { QuizContext } from "./../../App";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router";
const Question5 = () => {
  const navigation = useNavigate();
  const { score, setScore, trackScore, setTracker, selectedLanguage } =
    useContext(QuizContext);
  let questions: string[] = [];
  let answers: string[] = [];
  if (selectedLanguage === "ReactJS") {
    questions = [
      "React is a _",
      "React is used to make _",
      "The library used to navigate between components is _",
      "State Management Library _",
    ];
    answers = ["Redux", "React-Router-Dom", "UIs", "Libary of JS"];
  } else if (selectedLanguage === "React Native") {
    questions = [
      "React Native is a _",
      "React Native is used to make _",
      "The library used to navigate between components is _",
      "State Management Library _",
    ];
    answers = ["Redux", "React Native Navigate", "Mobile Apps", "Libary of JS"];
  } else if (selectedLanguage === "Java") {
    questions = [
      "Java is an _",
      "To enter custom inputs in Java, we use _",
      "JSP stands for _",
      "API used to connect to SQL _",
    ];
    answers = [
      "JDBC",
      "Java server pages",
      "Scanner",
      "Object-oriented Language",
    ];
  }
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [questionsObject, setQuestionsObject] = useState(questions);
  const [answersObject, setAnswersObject] = useState(answers);
  const [droppedAnswers, setDroppedAnswers] = useState<string[]>([]);
  const handleDrop = (index: number, answer: string) => {
    const updatedQuestions = [...questionsObject];
    if (selectedLanguage === "ReactJS") {
      if (index === 0 && answer === answersObject[3] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 1 && answer === answersObject[2] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 2 && answer === answersObject[1] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 3 && answer === answersObject[0] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      }
      setDroppedAnswers((prevDropped) => [...prevDropped, answer]);
    } else if (selectedLanguage === "React Native") {
      if (index === 0 && answer === answersObject[3] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 1 && answer === answersObject[2] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 2 && answer === answersObject[1] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 3 && answer === answersObject[0] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      }
      setDroppedAnswers((prevDropped) => [...prevDropped, answer]);
    } else if (selectedLanguage === "Java") {
      if (index === 0 && answer === answersObject[3] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 1 && answer === answersObject[2] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 2 && answer === answersObject[1] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      } else if (index === 3 && answer === answersObject[0] && score < 8) {
        setScore((previous) => previous + 1);
        updatedQuestions[index] = updatedQuestions[index].replace("_", answer);
      }
      setDroppedAnswers((prevDropped) => [...prevDropped, answer]);
    }
    setQuestionsObject(updatedQuestions);
  };
  const handleNavigation = () => {
    navigation("/submission");
  };
  const DraggableAnswer = ({ answer }: any) => {
    const [{ isDragging }, drag] = useDrag({
      type: "ANSWER",
      item: { answer },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const isDropped = droppedAnswers.includes(answer);

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          display: isDropped ? "none" : "block",
        }}
      >
        <Typography>{answer}</Typography>
      </div>
    );
  };

  const DropZone = ({ index, onDrop }: any) => {
    const [{ isOver }, drop] = useDrop({
      accept: "ANSWER",
      drop: (item: any) => onDrop(index, item.answer),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        style={{
          backgroundColor: isOver ? "lightblue" : "white",
          flex: 1,
          height: "100%",
        }}
      >
        Drop here
      </div>
    );
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
          <Box sx={{ display: "flex" }}>
            <Box>
              {questionsObject.map((question, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: 2,
                    backgroundColor: "lightgray",
                    marginBottom: 2,
                  }}
                >
                  <Typography>{question}</Typography>
                  {question.includes("_") && (
                    <DropZone index={index} onDrop={handleDrop} />
                  )}
                </Box>
              ))}
            </Box>
            <Box>
              {droppedAnswers.length === 4 ? (
                <Box></Box>
              ) : (
                <Box>
                  {answersObject.map((answer, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        padding: 2,
                        backgroundColor: "lightgray",
                        marginBottom: 2,
                      }}
                    >
                      <DraggableAnswer key={index} answer={answer} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              disabled={isSubmitted}
              onClick={() => setIsSubmitted(true)}
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

export default Question5;
