import React from 'react'
import Navbar from './Navbar'
import CartItem from './CartItem'

const Cart = () => {

  /// TO REFACTOR
  const [keyArr, setKeyArr] = React.useState(Object.keys(localStorage))
  const [cart, setCart] = React.useState([])
  console.log(keyArr)
  React.useEffect(()=>{
    for(let i=0; i< keyArr.length; i++){
      setCart(prevState=>[
        ...prevState,
        JSON.parse(localStorage.getItem(keyArr[i]))
      ])
    }
  }, [])


  const incrementAmount = (cartItem, setCartItem, id) => {
    setCartItem({
      ...cartItem,
      amount: cartItem.amount + 1
    })
    localStorage.setItem(id, JSON.stringify(cartItem))
    
  }

  const decrementAmount = (cartItem, setCartItem, id) => {
    setCartItem({
      ...cartItem,
      amount: cartItem.amount - 1
    })
    if(cartItem.amount === 1){
      let newArray = cart.filter(function(element){return element.id !== id})
      setCart(newArray)
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