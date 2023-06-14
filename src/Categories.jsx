//ON THIS PAGE 
// -list of categories -- that link to 10 question quizes in that category 
// - difficulty levels -- easy / medium / difficult -- appear when the category is selected --> quiz
    // components for Level and Quiz
// - option for randomized categories 

/* eslint-disable react/prop-types */


import { useEffect, useState } from 'react';
import axios from 'axios';


const Categories = ({setSelectedCategory}) => {
  const [categories, setCategories] = useState([]);
  

  const handleCategoryId = (id) => {
    setSelectedCategory(id);
    console.log('Hi,', id);
  };

  useEffect(() => {
    const URL = 'https://opentdb.com/api_category.php';
    axios.get(URL)
      .then(response => {
        setCategories(response.data.trivia_categories);
      });
  }, []);

  return (
    <div>
      <h1>Trivia</h1>
      <div className="categoryCard">
        {categories.map(category => (
          <div key={category.id}>
            <button className="catButton" onClick={() => handleCategoryId(category.id)}>{category.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};




export default Categories;

