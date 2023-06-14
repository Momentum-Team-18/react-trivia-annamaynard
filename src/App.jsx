import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Categories from './Categories' ;
import './App.css';
import Quiz from './Quiz';


const App = () => {

const [selectedCategory, setSelectedCategory] = useState('')
    // if(selectedCategory){return <Quiz />}



  return (
    <div>
       {selectedCategory ? < Quiz id={category} /> : < Categories /> } 
    </div>
  );
  }

export default App;