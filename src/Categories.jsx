import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
  
    const handleCategoryId = (id) => {
        setCategoryId(id)
        console.log('Hi ,', id)
    }
  
    useEffect(() => {
      axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          setCategories(response.data.trivia_categories);
        })
    }, []);
  
    return (
      <div>
        <h1>Categories</h1>
        <div className="categories">
          {categories.map(category => (
            <ul key={category.id}><button onClick={() => handleCategoryId(category.id)}>{category.name}</button></ul>
          ))}
        </div>
      </div>
    );
  };

  
  export default Categories;