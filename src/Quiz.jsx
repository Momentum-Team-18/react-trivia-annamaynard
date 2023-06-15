import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import arrayShuffle from "array-shuffle";

const Quiz = ({ categoryID, categories, setSelectedCategory }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const catUrl = `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=easy`;

  useEffect(() => {
    axios.get(catUrl).then((response) => setQuestions(response.data.results));
  }, [categoryID]);

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowAnswer(false);
    setScore(0);
  };

  const handleEndQuiz = () => {
    setCurrentQuestion(questions.length);
    setSelectedAnswer("");
    setShowAnswer(false);
  };

  const handleCategories = () => {
    setSelectedCategory("");
    console.log("hi! ");
  };

  return (
    <>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <section className="slide">
          <div className="content">
            <h1 className="title">
              {he.decode(questions[currentQuestion].question)}
            </h1>
            {!showAnswer && (
              <>
                {arrayShuffle([
                  ...questions[currentQuestion].incorrect_answers,
                  questions[currentQuestion].correct_answer,
                ]).map((answer, index) => (
                  <button
                    key={index}
                    className={`button ${
                      selectedAnswer === answer ? "incorrect" : ""
                    }`}
                    onClick={() => handleAnswer(answer)}
                    disabled={showAnswer}
                  >
                    {he.decode(answer)}
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="content">
            {showAnswer && (
              <p
                className={
                  selectedAnswer === questions[currentQuestion].correct_answer
                    ? "correctAnswer"
                    : "incorrectAnswer"
                }
              >
                {selectedAnswer === questions[currentQuestion].correct_answer
                  ? "Correct!"
                  : "Incorrect!"}{" "}
                The correct answer is:{" "}
                {he.decode(questions[currentQuestion].correct_answer)}
              </p>
            )}
            <button
              className="actionButton"
              onClick={handleNextQuestion}
              disabled={!showAnswer}
            >
              {currentQuestion === questions.length - 1
                ? "Finish"
                : "Next Question"}
            </button>
            <button className="actionButton" onClick={handleEndQuiz}>
              End Quiz
            </button>
          </div>
        </section>
      ) : (
        <div>
          <h1>Quiz Result</h1>
          <p>
            Score: {score} / {questions.length}
          </p>
          <button className="actionButton" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
          <button className="actionButton" onClick={handleCategories}>
            Go Back to Categories
          </button>
        </div>
      )}
    </>
  );
};

export default Quiz;
