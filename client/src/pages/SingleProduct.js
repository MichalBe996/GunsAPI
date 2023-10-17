import React from 'react'
import { useParams } from "react-router-dom"
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'



const SingleProduct = () => {
    
    const { id } = useParams();
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/guns/${id}`)
        .then((res)=> setData(res.data.data.singleGun))
        .catch(err=> setError(err.message))
        
        
    }, [])
  return (
    <div>
        <Navbar />
        <h3>{data.name}</h3>
        <p>{data.summary}
        </p>
    </div>
  )
}

export default SingleProduct