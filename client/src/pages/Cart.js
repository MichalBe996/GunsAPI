import React from 'react'
import Navbar from './Navbar'

const Cart = () => {

  /// TO REFACTOR
  const [keyArr, setKeyArr] = React.useState([Object.keys(localStorage)])
  const [cartItemsArr, setCartItemsArr] = React.useState([])
  


   
    

    
  



    
  
  const emptyCart = () => {
    
    console.log(localStorage)


  }
  return (
    <div>
        <Navbar/>
        <div className="cart--body">
            <div className="cart--items">
            <button onClick={emptyCart}>Empty cart</button>
            </div>
            <div className="cart--summary">

            </div>

        </div>
    </div>
  )
}

export default Cart