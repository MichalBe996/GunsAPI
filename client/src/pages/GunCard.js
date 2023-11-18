import React from 'react'
import { useNavigate } from 'react-router-dom'


const GunCard = (props) => {
   const navigate = useNavigate();
   const redirectToInfo = () => {
    navigate(`/products/${props.id}`)
   }
   let id = props.id
   const [isInLocalStorage, setIsInLocalStorage] = React.useState(false)
   const [cartItem, setCartItem] = React.useState({
    id: props.id,
    name: props.name,
    img: props.img,
    price: props.price,
    quantity: 1
   })
   
   ////// figure out how quantity stays on 1 when user adds the object to local storage for the second time
   
   const addToCart = () => {
    
    
    JSON.parse(localStorage.getItem(id)) === null ? setIsInLocalStorage(false) : setIsInLocalStorage(true)
    
    if(!isInLocalStorage){
       console.log("Cart item when it's not in local storage:", cartItem)
       localStorage.setItem(id, JSON.stringify(cartItem))
    }else{
      console.log("Already in storage")
      setCartItem(prevState=>({
        ...prevState,
        quantity: cartItem.quantity + 1
      }))
      console.log("Cart item when it's already in storage: ", cartItem)
    }
      
    
      
    
    
   
   
  


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