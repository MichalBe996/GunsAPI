import React from 'react'
import Navbar from './Navbar'

const Cart = () => {

  /// TO REFACTOR
  const [cartItems, setCartItems] = React.useState([])
  const [keyArr, setKeyArr] = React.useState([])
  React.useEffect(()=>{
    setKeyArr([
      Object.keys(localStorage)
    ])  
    keyArr.map((element)=>[
      setCartItems([
        ...cartItems,
        localStorage.getItem((element))
      ])
    ])
    
    },[])
  


  



    
  
  const showCart = () => {
    console.log(JSON.parse(localStorage.getItem(keyArr[0])))
  }
  return (
    <div>
        <Navbar/>
        <div className="cart--body">
            <div className="cart--items">
            <button onClick={showCart}>Show Cart</button>
            </div>
            <div className="cart--summary">

            </div>

        </div>
    </div>
  )
}

export default Cart