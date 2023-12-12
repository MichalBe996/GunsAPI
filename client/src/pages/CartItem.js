import React from 'react'

const CartItem = (props) => {
  const [amountOfItems, setAmountOfItems] = React.useState(props.amount)
  
    
   

    
  
  return (
    <div className="cart--item--card">
        <img className="cart--item--image" src={props.img}></img>
        <div className="cart--item--info">
             <h3>{props.name}</h3>
             <div className="cart--item--price">
                <h4>Price: {props.price}</h4>
                <div className="cart--amount--div">
                <h4>Amount: {amountOfItems}</h4>
                <div className="cart--amount--buttons">
                    <button onClick={()=>{
                      props.incrementAmount(amountOfItems, setAmountOfItems, props.id)
                    }}>+</button>
                    <button onClick={()=> {
                      props.decrementAmount(amountOfItems, setAmountOfItems, props.id)
                    }}>-</button>
                </div>
                
                </div>
                
                <h4>Total Price: {props.price * amountOfItems}$</h4>
             </div>
        </div>

    </div>
  )
}

export default CartItem