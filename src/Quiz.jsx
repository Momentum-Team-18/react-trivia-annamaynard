// ON THIS PAGE :
// - slide show of the individual questions 
// - user interaction buttons 
        // select answer 
        // next question / back / submit / restart? / back to categories 
// - tally of score displayed 
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Category from './Categories';

const Quiz = ({ categoryID, categories }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const catUrl = `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=easy`;

  useEffect(() => {
    axios.get(catUrl).then((response) => setQuestions(response.data.results));
  }, [categoryID]);

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer('');
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
    setSelectedAnswer('');
    setShowAnswer(false);
    setScore(0);
  };

  const handleGoBack = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setQuestions([]);
  };

  return (
    <>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <section className='slide'>
          <div className='content'>
            <h1 className='title'>{questions[currentQuestion].question}</h1>
            <button
              className={`button ${selectedAnswer === questions[currentQuestion].correct_answer ? 'correct' : ''}`}
              onClick={() => handleAnswer(questions[currentQuestion].correct_answer)}
              disabled={showAnswer}
            >
              {questions[currentQuestion].correct_answer}
            </button>
            {questions[currentQuestion].incorrect_answers.map((answer, index) => (
              <button
                key={index}
                className={`button ${selectedAnswer === answer ? 'incorrect' : ''}`}
                onClick={() => handleAnswer(answer)}
                disabled={showAnswer}
              >
                {answer}
              </button>
            ))}
          </div>
          <div className='content'>
            {showAnswer && (
              <p className={`answer ${selectedAnswer === questions[currentQuestion].correct_answer ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === questions[currentQuestion].correct_answer ? 'Correct!' : 'Incorrect!'} The correct answer is: {questions[currentQuestion].correct_answer}
              </p>
            )}
            <button className='actionButton' onClick={handleNextQuestion} disabled={!showAnswer}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
            <button className='actionButton' onClick={handleGoBack}>Go Back</button>
          </div>
        </section>
      ) : (
        <div>
          <h1>Quiz Result</h1>
          <p>Score: {score} / {questions.length}</p>
          <button className='actionButton' onClick={handleRestartQuiz}>Restart Quiz</button>
          <button className='actionButton' onClick={handleGoBack}>Go Back to Categories</button>
        </div>
      )}
    </>
  );
};

export default Quiz;
