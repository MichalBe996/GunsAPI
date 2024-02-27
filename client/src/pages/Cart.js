import React from 'react'
import Navbar from './Navbar'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

  /// TO REFACTOR
  const navigate = useNavigate();
  
  const [storageKeys, setStorageKeys] = React.useState(Object.keys(localStorage))
  const [cart, setCart] = React.useState([])
  console.log("KEYS FROM STORAGE: ", storageKeys)
  
  React.useEffect(()=>{
    let newCart = []
    if(storageKeys.length > 0){
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
    
  },[])
  
  
  
  

  
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
       
        if(newCartItem.amount===0){
          let filteredCart = cart.filter(function(element){return element.id !== id})
          
          let filteredKeyArr = storageKeys.filter(function(element){return element !== id})
          setStorageKeys(filteredKeyArr)
          localStorage.removeItem(id)
          setCart(filteredCart)
          console.log("REMOVED FROM THE CART", filteredCart)
          
          if(cart.length === 1){
            setCart([])
            localStorage.clear(
            )
          }
          window.location.reload()
          
        }else{
          localStorage.setItem(id, JSON.stringify(newCartItem))
          setCartItem(newCartItem)
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