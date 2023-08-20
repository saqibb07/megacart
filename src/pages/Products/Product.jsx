import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './product.css'
import Card from '../../components/Card/Card'

const Product = ({ text, category }) => {
  const [data, setData] = useState([])
  const [textSearch, setTextSearch] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [category])
  const newData = data.map(item => (item.price > 109 ? { ...item, discount: 56 } : item.price > 60 && item.price < 109 ? { ...item, discount: 20 } : { ...item }))
  useEffect(() => {
    const filteredData = newData.filter(param => param.title.toLowerCase().includes(text.toLowerCase()))
    setTextSearch(filteredData)
  }, [data, text])
  return (
    <div className="parent">
      <h2 className="heading">Results</h2>
      <div className="card_Container">
        {textSearch.map((param, index) => (
          <Card key={index} data={param} />
        ))}
      </div>
    </div>
  )
}

export default Product
