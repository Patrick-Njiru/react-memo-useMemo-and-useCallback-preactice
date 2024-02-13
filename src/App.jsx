import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Products from './Products'
import './App.css'

const API_URL = 'https://fakestoreapi.com/products'

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState(0)
  
  console.log('render App');  
  
  const getData = () => {
    axios.get(API_URL)
      .then(res => { setProducts(res.data)})
      .catch(error => { setError(error.message); console.log(error) })
  }
  
  const calculateHighestAndLowestPrice = (data) => {
    const highestPrice = Math.max(...(data.map(item => +item.price)))
    const lowestPrice = Math.min(...(data.map(item => +item.price)))
    
     return [highestPrice, lowestPrice]
  }
  
  const highestAndLowestPrice = useMemo(() => {
    console.log('useMemo called')
    return calculateHighestAndLowestPrice(products)
  }, [products])

  useEffect(() => { getData() }, [])

  // Using useCallback ensures that this func will only be re-rendered when the cart state changes. 
  // So the component that it's passed to will also only re-render when this prop changes
  const addToCart = useCallback(() => {
    setCart(cart + 1)
    console.log('render addToCart Func');
  }, [cart])
  
  return (
    <div style={{background: 'beige', minHeight: '100vh'}}>
      {products.length > 0 ?
        <div>
          <div className="text-center pt-5 mb-5" >
            <h1> Count : {count} </h1>
            <button
              type='button'
              className="btn btn-secondary"
              onClick={() => setCount(count + 1)}
            >
              Increase Count
            </button>
          </div>
          <div className="text-center my-5">
            <h1>Cart : {cart} </h1>
          </div>
          <div className="text-center my-5">
            <div className="text-start p-5 badge bg-primary rounded-pill">
              <h1>Highest Price : ${highestAndLowestPrice[0]}</h1>
              <h1>Lowest Price : ${highestAndLowestPrice[1]}</h1>
            </div>
          </div>
          <Products products={products} addToCart={addToCart} />
        </div >
        : error ?
          <div className="p-5">
            <h1 className="p-5 alert alert-danger mx-auto" style={{width: 'fit-content'}}>{error}</h1>
          </div>
          : <div className="loading-page">
            <div className="loader position-absolute top-50 start-50"></div>
          </div>
      }
    </div>
  )
}

export default App
