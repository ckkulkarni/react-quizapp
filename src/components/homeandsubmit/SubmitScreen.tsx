import { useContext } from "react";
import { QuizContext } from "./../../App";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
const SubmitScreen = () => {
  jest.mock("react-chartjs-2", () => ({
    Pie: () => <div data-testid="submitscreen-piechart" />,
  }));

  const navigation = useNavigate();
  const { score, setScore, selectedLanguage, email, name, phoneNumber, age } =
    useContext(QuizContext);
  const pieData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        data: [score, 8 - score],
        backgroundColor: ["green", "red"],
      },
    ],
  };
  const handleNavigate = () => {
    setScore(0);
    navigation("/");
  };
  return (
    <div className="quiz-container" data-testid="submission-container">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Typography>Name: </Typography>
            <Typography>{name}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Typography>Age: </Typography>
            <Typography>{age}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Typography>Phone Number: </Typography>
            <Typography>{phoneNumber}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Typography>Mail ID: </Typography>
            <Typography>{email}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center" }}>
          <Typography>Your selected language was. . .</Typography>
          <Typography sx={{ color: "red" }}>{selectedLanguage}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 10 }}>
          <Typography>Maximum Score: 8</Typography>
          <Typography>QnA: 4</Typography>
          <Typography>Drag and Drop Question: 4</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography>You have scored</Typography>
          <Typography
            sx={{ color: "red", border: 2, borderRadius: 10, p: 0.2 }}
          >
            {score}/8
          </Typography>
          {score === 8 ? (
            <Typography>
              Congratulations! You have received the full score!
            </Typography>
          ) : (
            <Typography>Try again for full score!</Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50%", margin: "0 auto" }}>
            <Pie
              data={pieData}
              data-testid="submitscreen-piechart"
              id="chart"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleNavigate}>Try again?</Button>
        </Box>
      </Box>
    </div>
  );
};

export default SubmitScreen;
