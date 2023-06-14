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


  const catUrl = `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=easy`;

  useEffect(() => {
    axios.get(catUrl).then((response) => setQuestions(response.data.results));
  }, [categoryID]);

 

  console.log(questions);

  return (
    <>
     <h1>QUIZ</h1>
    </>
  );
};

export default Quiz;
