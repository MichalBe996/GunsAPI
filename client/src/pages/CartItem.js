import React from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const CartItem = (props) => {
 
  const [cartItem, setCartItem] = React.useState({
    id: props.id,
    name: props.name,
    img: props.img,
    amount: props.amount,
    price: props.price

  })
  const [loggedUserCart, setLoggedUserCart] = React.useState([])
  const [token, setToken] = React.useState([])
  React.useEffect(()=>{
    setToken(Cookies.get("jwt"))
    axios.get(`http://localhost:5000/api/v1/users/${jwtDecode(Cookies.get("jwt")).id}`)
    .then((res)=>{
      console.log(res.data.data.singleUser.cartArray)
      setLoggedUserCart(res.data.data.singleUser.cartArray)
      console.log(loggedUserCart)
      
    })
  }, [])
  
  const incrementForLogged = () => {
    let updatedCart = loggedUserCart;
    setCartItem({
      ...cartItem,
      amount: cartItem.amount + 1})
      updatedCart.forEach(element=> {
        if(element.id === cartItem.id){
          element = cartItem
        }
        
      })
      axios.patch("http://localhost:5000/api/v1/users/updateMe", {
        cartArray: updatedCart,
        
      },{
        headers: {
          "Authorization":  `Bearer ${token}`
          
                    
        }
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
      
      
  }
  
    
   

    
  
  return (
    <div className="cart--item--card">
        <img className="cart--item--image" src={props.img}></img>
        <div className="cart--item--info">
             <h3>{cartItem.name.slice(0, 15)}</h3>
             <div className="cart--item--price">
                <h4>Price: {cartItem.price}</h4>
                <div className="cart--amount--div">
                <h4>Amount: {cartItem.amount}</h4>
                <div className="cart--amount--buttons">
                    <button onClick={()=>{

                      Cookies.get("jwt") ? setCartItem({
                        ...cartItem,
                        amount: cartItem.amount + 1
                      })
                       :props.incrementAmount(cartItem, setCartItem, cartItem.id)
                      
                    }}>+</button>
                    <button onClick={()=> {
                      Cookies.get("jwt") ? setCartItem({
                        ...cartItem,
                        amount: cartItem.amount - 1
                      }) :
                      props.decrementAmount(cartItem, setCartItem, cartItem.id)
                      
                    }}>-</button>
                </div>
                
                </div>
                
                <h4>Total Price: {(cartItem.price * cartItem.amount).toFixed(2)}$</h4>
             </div>
        </div>

    </div>
  )
}

export default CartItem