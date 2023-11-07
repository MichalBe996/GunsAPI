import React from 'react'
import Navbar from './Navbar'

const Cart = () => {

  /// TO REFACTOR
  const [keyArr, setKeyArr] = React.useState([Object.keys(localStorage)])
    
  

    
  



    
  
  const showCart = () => {
    
    console.log(JSON.parse(localStorage.getItem(Object.keys(localStorage)[1])))
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