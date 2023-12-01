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


  const incrementAmount = (id) => {
    const cartObject = JSON.parse(localStorage.getItem(id))
    cartObject.amount += 1;
    localStorage.setItem(id, JSON.stringify(cartObject))
    cart.forEach(element=>{
      if(element.id===id){
        setCart(...prevState=>[
          ...prevState,
          {
            amount: element.amount + 1
          }
        ])
      }
    })
    
    console.log(localStorage)
  }
  const decrementAmount = (id) => {
    const cartObject = JSON.parse(localStorage.getItem(id))
    cartObject.amount -= 1;
    localStorage.setItem(id, JSON.stringify(cartObject))
    
    console.log(localStorage)
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