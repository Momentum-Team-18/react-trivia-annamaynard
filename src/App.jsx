import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(response => {
        setCategories(response.data.trivia_categories);
        console.log(response.data.trivia_categories)
      })
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <div>
        {categories.map(category => (
          <ul key={category.id}><a href='#'>{category.name}</a></ul>
        ))}
      </div>
    </div>
  );
};

export default Categories;