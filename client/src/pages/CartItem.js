import React from 'react'

const CartItem = (props) => {
  return (
    <div className="cart--item--card">
        <img className="cart--item--image" src={props.img}></img>
        <div className="cart--item--info">
             <h3>{props.name}</h3>
             <div className="cart--item--price">
                <h4>Price: {props.price}</h4>
                <div className="cart--amount--div">
                <h4>Amount: {props.amount}</h4>
                <div className="cart--amount--buttons">
                    <button>+</button>
                    <button>-</button>
                </div>
                
                </div>
                
                <h4>Total Price: </h4>
             </div>
        </div>

    </div>
  )
}

export default CartItem