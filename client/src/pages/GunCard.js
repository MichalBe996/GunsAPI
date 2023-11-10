import React from 'react'
import { useNavigate } from 'react-router-dom'


const GunCard = (props) => {
   const navigate = useNavigate();
   const redirectToInfo = () => {
    navigate(`/products/${props.id}`)
   }
   let id = props.id
   
   const [cartItem, setCartItem] = React.useState(JSON.parse(localStorage.getItem(id)))
   
   ////// ADDING TO CART NEEDS REFACTOR
   
   const addToCart = () => {
    
  
  console.log(cartItem)
  if(cartItem===null){
    setCartItem({
      ...props,
      quantity: 1
    })
    
  }else{
  
  }
  console.log(cartItem)

   
   
   
  


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