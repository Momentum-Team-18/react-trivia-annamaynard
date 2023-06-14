import React, { useEffect, useState } from 'react';
import axios from 'axios';

//ON THIS PAGE 
// -list of categories -- that link to 10 question quizes in that category 
// - difficulty levels -- easy / medium / difficult -- appear when the category is selected --> quiz
    // components for Level and Quiz
// - option for randomized categories 


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [difficulty, setDifficulty] = useState('');
  
    const handleCategoryId = (id) => {
        setCategoryId(id)
        console.log('Hi ,', id)
    }
  
    useEffect(() => {
      const URL = 'https://opentdb.com/api_category.php'
      axios.get(URL)
        .then(response => {
          setCategories(response.data.trivia_categories);
        })
    }, []);
  
    useEffect(()=>{
        const catUrl = 'https://opentdb.com/api.php?amount=10&category=${categoryID}'
        useEffect(() => {
            axios.get(catUrl).then((response) => setQuestions(response.data.results))}, [categoryID])
        })
    
    })
    return (
        <div>
          <h1>Trivia</h1>
          <div className="categoryCard">
            {categories.map(category => (
              <div key={category.id}></div>
            ))}
            </div>
        </div>
      );
    };
    
  
  
  

    export default Categories;

