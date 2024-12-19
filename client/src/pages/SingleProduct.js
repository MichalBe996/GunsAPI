import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'



const SingleProduct = () => {
  
    const navigate = useNavigate();
    const redirectBack = () => {
      navigate("/");
    };
    
    const { id } = useParams();
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/guns/${id}`)
        .then((res)=> setData(res.data.data.singleGun))
        .catch(err=> setError(err.message))
        
        
    }, [])

    function addToCart(){
      if(JSON.parse(localStorage.getItem(id))===null){
       let cartItem = {
         id: id,
         name: data.name,
         img: data.imageCover,
         price: data.price,
         amount: 1
        }
        localStorage.setItem(id, JSON.stringify(cartItem))
      }else {
       let cartItem = JSON.parse(localStorage.getItem(id))
       cartItem.amount += 1
       localStorage.setItem(id, JSON.stringify(cartItem))
      }
      
      
   
       
       
     }
 
       
      
     
  return (
    <div>
        <Navbar />
        
        <div className="single--gun--card">
              <div className="single--gun--image">
                <img src={data.imageCover}></img>
              </div>
              <div className="gun--parameters">
                <h2>{data.name}</h2>
                
                <h3>Price: ${data.price}</h3>
                <p className='card--gun--summary'>{data.summary}</p>
                <h3>Stock material: {data.stockMaterial}</h3>
                <h3>Gauge: {data.gauge}</h3>
                <h3>Action: {data.action}</h3>
                <h3>Capacity: {data.capacity}</h3>
                <div className="single--card--buttons">
                   <button className="single--card--button"onClick={redirectBack}>Go Back</button>
                   <button className='single--card--button' onClick={addToCart}>Add to Cart</button>
        </div>
              </div>
        </div>
        
    </div>
  )
}

export default SingleProduct