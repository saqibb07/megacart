import './Navbar.css'
import {  useState } from 'react'
import Product from '../../pages/Products/Product'
import { MagnifyingGlassIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import Categories from '../../pages/Categories/Categories'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../Redux/slices/CartSlice'
const Navbar = () => {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onHandleChange = e => {
    const Text = e.target.value
    setText(Text)
  }
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const count = useSelector(state => state.cart.value);
  return (
    <>
      <div className="productContainer">
      <div className="navbarContainer">
        <div className="imageContainer">
          <img src="brandLogo.png" alt='' className="imageLogo" />
        </div>
        <div className="selectContainer">
          <div>
          <Categories onSelectCategory={handleCategorySelect} />
          </div>
          <div className="searchContainer">
            <input type="text" name="search" className="searchInput" placeholder="Search here..." autoComplete="off" onChange={onHandleChange}/>
            <div
              className="magnifyingContainer {
"
            >
              <MagnifyingGlassIcon className="icon" />
            </div>
          </div>
        </div>
        <div className="iconContainer">
          <ShoppingCartIcon className="shoppingCart" />
          <p className="cartTitle">Cart</p>
          {count>0 && 
          <>
          <p className='cartTitle1'>{count}</p>
          <TrashIcon className='trash-cart' onClick={() => dispatch(emptyCart())}/>
          </>
          }

        </div>
      
      </div>
    </div>
    <div className="selectContainerr">
      <div>
       
    
      <select className="selectInput">
        <option>All</option>
      </select>
    </div>
      <div className="searchContainer">
      <input
        type="text"
        name="search"
        className="searchInput"
        placeholder="Search here..."
        autoComplete="off"
      />
      <div className="magnifyingContainer {
">
        <MagnifyingGlassIcon className="icon" />
      </div>
    </div>
      
      </div>
  

    <div className='product-list'>
        <Product text={text} category={category}/>
        </div>
    </>
  )
}
export default Navbar
