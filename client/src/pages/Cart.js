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


  const incrementAmount = (amount, setAmount, id) => {
    setAmount(amount + 1);
    let item = cart.filter(function(element){return element.id === id});
    item.amount = amount;
    let newCart = cart;
    newCart.forEach(element=>{
      if(element.id === id){
        element = item;
      }
    })
    setCart(newCart)
    
  }

  const decrementAmount = (amount, setAmount, id) => {
    if(amount === 1){
      setCart(cart.filter(function(element){return element.id ==! id}))
      
    }else {
      setAmount(amount - 1)
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