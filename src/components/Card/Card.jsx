import { StarIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import './Card.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../Redux/slices/CartSlice'

const Card = ({ data }) => {
  const [showCard, setShowCard] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [ratingArray, setRatingArray] = useState([])
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowCard(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowCard(false)
  }
  const cart = useSelector(state => state)

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
    if (data.rating.rate) {
      rating = Math.floor(data.rating.rate)
      const array = Array.from({ length: rating }, (_, index) => index)
      setRatingArray(array)
    }
  }, [data.rating.rate])

  return (
    <div className={`card ${showCard && 'hoverBtn'} ${isHovered && 'hovered'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {data.discount && (
        <div className="discountCard">
          {data.discount}%<span>OFF</span>
        </div>
      )}
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
        <img src={data.image} alt="Avatar" className="img" />
      </div>
      <div className="container">
        <div className={`${isMobile && 'titleContainer'}`}>
          <p>{data.title}</p>
          <div>
            <b>${data.price}</b>
          </div>
        </div>

        <div className="ratingContainer">
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
            {ratingArray.map(num => (
              <StarIcon key={num} className={`starIcon ${num < rating ? 'fillStar' : 'emptyStar'}`} />
            ))}
          </div>
          {isMobile && (
            <button
              className={`mobBtn`}
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
