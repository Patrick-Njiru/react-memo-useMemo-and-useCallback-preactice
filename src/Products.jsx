import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

// When the App re-renders due to change in count state, it triggers re-render of the children components since they are created anew in the App component.
// To avoid this we can use memo / React.memo which ensures that the product component only re-renders when the its props change
// This way even the child of Products component won't be affected by the App state

const Products = React.memo(function Products({ products, addToCart }) {
  useEffect(() => { console.log('render products list'); })
  
  return (
    <div className='container'>
      <div className="row justify-content-evenly">
        {products.map(product =>
          <div key={product.id} className="card text-dark col-6 col-sm-5 col-md-3 m-3 p-0 border-light border-3">
            <Product {...product} addToCart={addToCart} />
          </div>)}
      </div>
    </div>
  )
})

Products.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
}

export default Products