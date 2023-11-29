import React from 'react'
import Navbar from './Navbar'

const Cart = () => {

  /// TO REFACTOR
  const [keyArr, setKeyArr] = React.useState([Object.keys(localStorage)])
  const [cart, setCart] = React.useState([])
  React.useEffect(()=>{
    for(let i=0; i< keyArr.length; i++){
      setCart([
        ...cart,
        JSON.parse(localStorage.getItem(keyArr[i]))
      ])
    }
  },[])
  
 

  console.log("ARRAY OF KEYS: ", keyArr)
  console.log("FIRST ITEM", localStorage.getItem(keyArr[0]))
    

    
  



    
  
  const emptyCart = () => {
    
    console.log("CART: ", cart)
    console.log(JSON.parse(localStorage.getItem(keyArr[1])))
  

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