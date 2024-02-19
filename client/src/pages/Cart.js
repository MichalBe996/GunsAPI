import React from 'react'
import Navbar from './Navbar'
import CartItem from './CartItem'


const Cart = () => {

  /// TO REFACTOR
  
  const [cart, setCart] = React.useState([JSON.parse(localStorage.getItem("localCart"))])
  let reducedCart = []
  

  
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
        if(newCartItem.amount !== 0){
          let cartArray = cart;
          cartArray.forEach(element=>{
            if(element.id === id){
              element = newCartItem;
            }
          })
          localStorage.setItem(id, JSON.stringify(newCartItem))
          setCartItem(newCartItem)
        }else {
        let cartArray = cart;
        console.log(cartArray)
        console.log(cart.indexOf((element)=>{return element.id == id}))
        }
        
        
      
      

      }
    
    

    
    

     
    
    
    
    
    

  



    
  // const mappedCartItems = cart.map((element)=> {
  //   return <CartItem 
  //           name={element.name}
  //           img={element.img}
  //           amount={element.amount}
  //           price={element.price}
  //           id={element.id}
  //           incrementAmount={incrementAmount}
  //           decrementAmount={decrementAmount}
            
            

  //   />
  // })
  
  return (
    <div>
        <Navbar/>
        <div className="cart--body">
            <div className="cart--items">
            
            

            </div>
            <div className="cart--summary">

            </div>

        </div>
    </div>
  )
}

export default Cart