import React from 'react'
import Navbar from './Navbar'

const Cart = () => {

  /// TO REFACTOR
  const [keyArr, setKeyArr] = React.useState([Object.keys(localStorage)])
  const [cartItemsArr, setCartItemsArr] = React.useState([])
  React.useEffect(()=>{
    for(let i = 0; i < Object.keys(localStorage).length; i++){
      setCartItemsArr(prevState => [
        ...prevState,
        JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]))

      ])
 
    
    }  
  }, [])
    

    
  



    
  
  const showCart = () => {
    
    console.log("CART ITEMS: ", cartItemsArr)
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