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
    let newCart = []
    for(let i=0; i< keyArr.length; i++){
      newCart.push(JSON.parse(localStorage.getItem(keyArr[i])))
    }
    console.log("CART VARIABLE:", newCart)
    setCart(newCart)
  }, [])

  
  const incrementAmount = (cartItem, setCartItem, id) => {
    let newCartItem = {
      ...cartItem,
      amount: cartItem.amount + 1
    }
    setCartItem(newCartItem)
    console.log(newCartItem)
    let cartArray = cart;
    for(let i=0; i < cartArray.length; i++){
      if(cartArray[i].id === id){
        cartArray[i] = newCartItem;
      }
    }
    setCart(cartArray)
    console.log("NEW CART", cart)
    localStorage.setItem(id, JSON.stringify(newCartItem))
    
  }

  const decrementAmount = (cartItem, setCartItem, id) => {
    if(cartItem.amount === 1){
      console.log("ITEM REMOVED")
      localStorage.removeItem(id)
      setKeyArr(Object.keys(localStorage))
      console.log(keyArr)
      let filteredCart = cart.filter(function(element){return element.id !== id})
      console.log("FILTERED", filteredCart)
    }else{
      let newCartItem = {
        ...cartItem,
        amount: cartItem.amount -1
      }
     
      setCartItem(newCartItem)
      console.log(newCartItem)
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