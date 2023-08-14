import { useEffect, useState } from 'react';
import './Categories.css';
import axios from 'axios';

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div >
      <select value={selectedCategory} onChange={handleCategoryChange} className="categories-container">
        <option className='option' value="">All</option>
        {categories.map(category => (
          <option className='option' key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
