import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/homeandsubmit/Home";
import Question5 from "./components/questions/Question5";
import SubmitScreen from "./components/homeandsubmit/SubmitScreen";
import Question4 from "./components/questions/Question4";
import Question3 from "./components/questions/Question3";
import Question2 from "./components/questions/Question2";
import Question1 from "./components/questions/Question1";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type quizContext = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  age: number;
  setAge: React.Dispatch<React.SetStateAction<number>>;
  email: string;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  trackScore: boolean;
  setTracker: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLanguage: string;
  setSelector: React.Dispatch<React.SetStateAction<string>>;
};

export const QuizContext = createContext<quizContext>({
  score: 0,
  setScore: () => {},
  name: "",
  setName: () => {},
  age: 0,
  setAge: () => {},
  email: "",
  setMail: () => {},
  phoneNumber: "",
  setPhone: () => {},
  trackScore: false,
  setTracker: () => {},
  selectedLanguage: "",
  setSelector: () => {},
});

function App() {
  const [score, setScore] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setMail] = useState<string>("");
  const [phoneNumber, setPhone] = useState<string>("");
  const [selectedLanguage, setSelector] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [trackScore, setTracker] = useState<boolean>(false);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <QuizContext.Provider
          value={{
            score,
            setScore,
            name,
            setName,
            age,
            setAge,
            email,
            setMail,
            phoneNumber,
            setPhone,
            selectedLanguage,
            setSelector,
            trackScore,
            setTracker,
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/question1" element={<Question1 />} />
              <Route path="/question2" element={<Question2 />} />
              <Route path="/question3" element={<Question3 />} />
              <Route path="/question4" element={<Question4 />} />
              <Route path="/question5" element={<Question5 />} />
              <Route path="/submission" element={<SubmitScreen />} />
            </Routes>
          </Router>
        </QuizContext.Provider>
      </DndProvider>
    </div>
  );
}

export default App;
