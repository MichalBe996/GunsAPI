import React from 'react'
import Navbar from './Navbar'

const Cart = () => {

  /// TO REFACTOR
  const [cartItems, setCartItems] = React.useState([])
    
    Object.keys(localStorage).map(k => {
      setCartItems(prevState=>[
        ...prevState,
        JSON.parse(localStorage.getItem(k))
      ])
    }
    )

    console.log("I FIRE ONCE")
    console.log(cartItems)
  
  return (
    <div>
        <Navbar/>
        <div className="cart--body">
            <div className="cart--items">
              <button onClick={console.log(cartItems)}>HEHEHEH</button>
            </div>
            <div className="cart--summary">

            </div>

        </div>
    </div>
  )
}

export default Cart