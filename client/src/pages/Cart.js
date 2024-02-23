import React from 'react'
import Navbar from './Navbar'
import CartItem from './CartItem'


const Cart = () => {

  /// TO REFACTOR
  
  const [storageKeys, setStorageKeys] = React.useState(Object.keys(localStorage))
  const [cart, setCart] = React.useState([])
  
  React.useEffect(()=>{
    let newCart = []
    if(storageKeys){
      storageKeys.forEach(element=>{
        let cartItem = JSON.parse(localStorage.getItem(element))
        newCart.push(cartItem)
      })
  
      setCart(newCart)
      cart.forEach(element=>{
        if(element.amount===0){
          localStorage.removeItem(element.id)
          let newCart = cart.filter(function(element){return element.amount !== 0})
          setCart(newCart)
        }
      })
    }
    
  },[cart])
  
  
  
  

  
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
        let newCartItem = {
          ...cartItem,
          amount: cartItem.amount - 1

        }
        
          localStorage.setItem(id, JSON.stringify(newCartItem))
          setCartItem(newCartItem)
       
        
        
      
      

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
      
    }
  )
  
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

export default Cart;