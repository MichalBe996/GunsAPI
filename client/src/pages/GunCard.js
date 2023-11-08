import React from 'react'
import { useNavigate } from 'react-router-dom'


const GunCard = (props) => {
   const navigate = useNavigate();
   const redirectToInfo = () => {
    navigate(`/products/${props.id}`)
   }
   let id = props.id
   const [item, setItem] = React.useState(()=> {
    if(JSON.parse(localStorage.getItem(id)!== null)){
      return {
        name: props.name,
        quantity: JSON.parse(localStorage.getItem(id)).quantity + 1
      }
    }
    return {
      name: props.name,
      quantity: 1
    }
   })
   
   
   ////// ADDING TO CART NEEDS REFACTOR
   
   const addToCart = () => {
    
    

   

   
  
   localStorage.setItem(id, JSON.stringify(item))
   console.log(localStorage)



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