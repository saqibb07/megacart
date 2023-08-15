import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Product from '../pages/Products/Product'
import Categories from '../pages/Categories/Categories'
const myRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/Products" element={<Product />}></Route>
          <Route path="/Categories" element />
        </Route>
      </Routes>
    </div>
  )
}
