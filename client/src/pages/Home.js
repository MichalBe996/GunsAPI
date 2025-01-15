import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from "react"
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode'
import "core-js/stable/atob";
import axios from "axios"
import GunCard from './GunCard'

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    type: ""
  })
  const [cartItems, setCartItems] = React.useState([])
  const [loggedUserCart, setLoggedUserCart] = React.useState([])
  const [userCart, setUserCart] = React.useState([])
  const [token, setToken] = React.useState("")
  
  useEffect(()=> {
    if(Cookies.get("jwt")){
      console.log(jwtDecode(Cookies.get("jwt")).id)
      axios.get(`http://localhost:5000/api/v1/users/${jwtDecode(Cookies.get("jwt")).id}`)
    .then((res)=>{console.log(res.data.data.singleUser.cartArray)
      setLoggedUserCart(prevState=> [...prevState, res.data.data.singleUser.cartArray])
      console.log("LOGGED USER CART:", loggedUserCart)
    })
    .catch(err=>{
      console.log(err)})


      

      
     

    
      
    }
    axios.get("http://localhost:5000/api/v1/guns?limit=10")
    .then((res)=>setData(res.data.data.allGuns))
    .catch(err=>{
      setError(err.message)
    })
  


  }, [])

function addToCart(props){
    if(token===""){
      if(JSON.parse(localStorage.getItem(props.id))===null){
        let cartItem = {
          id: props.id,
          name: props.name,
          img: props.img,
          price: props.price,
          amount: 1
         }
         localStorage.setItem(props.id, JSON.stringify(cartItem))
       }else {
        let cartItem = JSON.parse(localStorage.getItem(props.id))
        cartItem.amount += 1
        localStorage.setItem(props.id, JSON.stringify(cartItem))
       }
    }else {
      
      
      axios.patch("http://localhost:5000/api/v1/users/updateMe", {
        cartArray: "testGunAddedFromclientSideNowCompletelyWorking",
        
      },{
        headers: {
          "Authorization":  `Bearer ${token}`
          
                    
        }
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }
}
  

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setFormData({
      ...formData,
      [name]: value
    })
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let link;
    formData.type === "" ? link = "http://localhost:5000/api/v1/guns?limit=10" 
    : link = `http://localhost:5000/api/v1/guns?limit=10&type=${formData.type}`
    axios
    .get(link)
    .then((res)=>setData(res.data.data.allGuns))
    .catch(err=>{
      setError(err.message)
    })
  }
    
  
  
  

  const mappedCards = data.map((element)=>{
    return <GunCard 
            key={element._id}
            name={element.name}
            summary={element.summary}
            price={element.price}
            id={element._id}
            img={element.imageCover}
            addToCart={addToCart}
    />
  })



  return (

    <div>
        <Navbar/>
        <div className="form--and--cards">
          <div className="form--div">
            <form onSubmit={handleSubmit}>

              <div className="form--gun--type">
                <h3>Type: </h3>
                <table>
                  <tr>
                    <td className="type-radio">
                    <input
                onChange={handleChange}
                name="type"
                id="all"
                type="radio"
                value=""/>
                    </td>
                    <td className="type-label">
                    <label htmlFor='all'>All</label>
                    </td>
                    
                
                  </tr>
                  <tr>
                    <td className="type-radio">
                    <input
              onChange={handleChange}
              name="type"
              id="pistol"
              type="radio"
              value="Pistol"/>
                    </td>
                    <td className="type-label">
                    <label htmlFor='pistol'>Pistol</label>
                    </td>
                  </tr>
                  <tr>
                    <td className="type-radio">
                    <input
              onChange={handleChange}
              name="type"
              id="shotgun"
              type="radio"
              value="Shotgun"/>

                    </td>
                    <td className="type-label">
                    <label htmlFor='shotgun'>Shotgun</label>
                    </td>
                  </tr>
                  <tr>
                    <td className="type-radio">
                    <input
              onChange={handleChange}
              name="type"
              id="rifle"
              type="radio"
              value="Rifle"/>
                    </td>
                    <td className="type-label">
                      <label htmlFor='rifle'>Rifle</label>
                    </td>
                  </tr>
                </table>
                </div>
              <div>
              <button type='submit' className="search--button">
                Search
              </button>
              </div>
              
              

            </form>
          </div>
          <div className="gun--cards--div" id="gun--cards--div">
            {mappedCards}
          </div>
        </div>
        

    </div>
  )
}

export default Home