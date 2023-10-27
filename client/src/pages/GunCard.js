import React from 'react'
import { useNavigate } from 'react-router-dom'

const GunCard = (props) => {
   const navigate = useNavigate();
   const redirectToInfo = () => {
    navigate(`/products/${props.id}`)
   }
   const [cartItems, setCartItems] = React.useState([])
   ////// ADDING TO CART NEEDS REFACTOR
   let id = props.id
   const addToCart = () => {
    setCartItems([...cartItems, {id: props}])   
   }  
  return (
    <div className="gun--div">
        <h1 id="gun--name">{props.name.substring(0, 23)}</h1>
        <img className="gun--img" id="gun--img" src={props.img}></img>
        <h3 id="gun--price">${props.price}</h3>
        <div className="gun--card--buttons" id="gun--card--buttons">
            <button onClick={redirectToInfo}>See more</button>
            <button onClick={addToCart}>Add to cart</button>

        </div>
    </div>
  )
  }

export default GunCard;