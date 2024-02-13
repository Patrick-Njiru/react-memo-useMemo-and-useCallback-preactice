import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Product = ({ image, price, title, addToCart }) => {
  useEffect(() => { console.log('render product'); })
  
  return (
    <div className=''>
      <img src={image} alt={title} className='img-fluid mb-2' style={{height: '250px', width: '100%'}} />
      <h6 className="my-3 mx-2" style={{minHeight: 80, maxHeight: 150}}>{title}</h6>
      <h5 className="my-3 mx-2">$ {price}</h5>
      <button className='btn btn-danger my-3 mx-2' onClick={() => addToCart()}>Add to Cart</button>
    </div>
  )
}

Product.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
}

export default Product