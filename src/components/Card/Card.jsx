import { StarIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import './Card.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../Redux/slices/CartSlice'

const Card = ({ title, price, img, rate, review, id }) => {
  const [showCard, setShowCard] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [ratingArray, setRatingArray] = useState([])

  const cart = useSelector(state => state)
  console.log(cart)

  // choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 525) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  const dispatch = useDispatch()

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  let rating = 0
  useEffect(() => {
    if (rate) {
      rating = Math.floor(rate)
      const array = Array.from({ length: rating }, (_, index) => index)
      setRatingArray(array)
    }
  }, [rate])

  return (
    <div className={`card ${showCard && 'hoverBtn'}`} onMouseEnter={() => setShowCard(true)} onMouseLeave={() => setShowCard(false)}>
      {showCard && !isMobile && (
        <div className="btnContainer">
          <button
            className={`btn ${showCard && 'hoverBtn'}`}
            onClick={() => {
              dispatch(increment())
            }}
          >
            Add to Cart
          </button>
        </div>
      )}
      <div className="imageContainer">
        <img src={img} alt="Avatar" className={`img ${showCard && 'hoverBtn'}`} />
      </div>
      <div className="container">
        <div className={`${isMobile && 'titleContainer'}`}>
          <p>{title}</p>
          <div>
            <b>${price}</b>
          </div>
        </div>

        <div className="ratingContainer">
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
            {ratingArray.map(num => (
              <StarIcon key={num} className={`starIcon ${num < rating ? 'fillStar' : 'emptyStar'}`} />
            ))}
          </div>
          {isMobile && showCard && (
            <button
              className={`mobBtn ${showCard && 'hoverBtn'}`}
              onClick={() => {
                dispatch(increment())
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
