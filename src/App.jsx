import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Categories from './Categories' ;
import './App.css';
import Quiz from './Quiz';
import he from 'he';

const App = () => {

const [selectedCategory, setSelectedCategory] = useState('')
    // if(selectedCategory){return <Quiz />}

    // const [currentScore, setCurrentScore] = useState(0);

  return (
    <div>
       {selectedCategory ? < Quiz id={category} /> : < Categories /> } 
    </div>
  );
  }

export default App;