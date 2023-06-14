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

    const handleCategoryLevel = (level) => {
        setDifficulty(level);
        console.log('Difficulty:', level);
      };
  
    useEffect(() => {
      axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          setCategories(response.data.trivia_categories);
        })
    }, []);
  
    useEffect(()=>{
        axios.get('https://opentdb.com/api.php?amount=10&category&difficulty')
        .then(response => {
            setDifficulty(response.data.triva_categories.difficulty)
        })
    
    })
    return (
        <div>
          <h1>Categories</h1>
          <div className="categoryCard">
            {categories.map(category => (
              <div key={category.id}>
                  <ul>
                    <button className="catButton"onClick={() => handleCategoryId(category.id)}>{category.name}</button>
                  </ul>
              </div>
            ))}
            </div>
        </div>
      );
    };
    
  
  
  
  
    
    // <button className="diffButton" onClick={() => handleCategoryLevel({category.difficulty})}>EASY</button>
    // <button className="diffButton" onClick={() => handleCategoryLevel('medium')}>MEDIUM</button>
    // <button className="diffButton" onClick={() => handleCategoryLevel('difficult')}>DIFFICULT</button>

    export default Categories;

