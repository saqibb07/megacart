import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import Card from '../../components/Card/Card';

const Product = ({ text, category }) => {
  const [data, setData] = useState([]);
  const [textSearch, setTextSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          category
            ? `https://fakestoreapi.com/products/category/${category}`
            : 'https://fakestoreapi.com/products'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    const filteredData = data.filter(param =>
      param.title.toLowerCase().includes(text.toLowerCase())
    );
    setTextSearch(filteredData);
  }, [data, text]);

  return (
    <div className="card_Container">
      {textSearch.map((param, index) => (
        <Card
          key={index}
          title={param.title}
          price={param.price}
          img={param.image}
          rate={param.rating.rate}
          id={param.id}
        />
      ))}
    </div>

  );
};

export default Product;
