import React from 'react'
import Navbar from './Navbar'
import CartItem from './CartItem'

const Cart = () => {

  /// TO REFACTOR
  const [keyArr, setKeyArr] = React.useState(Object.keys(localStorage))
  const [cart, setCart] = React.useState([])
  console.log(keyArr)
  console.log("Cart: ", cart)
  React.useEffect(()=>{
    for(let i=0; i< keyArr.length; i++){
      setCart(prevState=>[
        ...prevState,
        JSON.parse(localStorage.getItem(keyArr[i]))
      ])
    }
  }, [])


  const incrementAmount = (cartItem, setCartItem, id) => {
    let newCartItem = {
      ...cartItem,
      amount: cartItem.amount + 1
    }
    setCartItem(newCartItem)
    console.log(newCartItem)
    localStorage.setItem(id, JSON.stringify(newCartItem))
    
  }

  const decrementAmount = (cartItem, setCartItem, id) => {
    let newCartItem = {
      ...cartItem,
      amount: cartItem.amount -1
    }
     if(newCartItem.amount > 0){
      setCartItem(newCartItem)
      localStorage.setItem(id, JSON.stringify(newCartItem))

     
     }if(newCartItem.amount === 0){
      localStorage.removeItem(id)
      setKeyArr(Object.keys(localStorage))
      console.log("NEW ARRAY OF KEYS", keyArr)
      const newCart = cart.filter(function(element){return element.id !== id})
      console.log("NEW CART:", newCart)
      setCart(newCart)
     }

     
    
    
    
    
    }  

  



    
  const mappedCartItems = cart.map((element)=> {
    return <CartItem 
            name={element.name}
            img={element.img}
            amount={element.amount}
            price={element.price}
            id={element.id}
            incrementAmount={incrementAmount}
            decrementAmount={decrementAmount}
            
            

    />
  })
  
  return (
    <div>
        <Navbar/>
        <div className="cart--body">
            <div className="cart--items">
              {mappedCartItems}
            

            </div>
            <div className="cart--summary">

            </div>

        </div>
    </div>
  )
}

export default Cart