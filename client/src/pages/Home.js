import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from "react"
import axios from "axios"
import GunCard from './GunCard'

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    type: ""
  })
  

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
    
  
  useEffect(()=> {
    axios
    .get("http://localhost:5000/api/v1/guns?limit=10")
    .then((res)=>setData(res.data.data.allGuns))
    .catch(err=>{
      setError(err.message)
    })
  


  }, [])

  const mappedCards = data.map((element)=>{
    return <GunCard 
            key={element._id}
            name={element.name}
            summary={element.summary}
            price={element.price}
            id={element._id}
            img={element.imageCover}
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
                <div className="form--type--options">
                <input
                onChange={handleChange}
                name="type"
                id="all"
                type="radio"
                value=""/>
                <label htmlFor='all'>All</label>
                <input
              onChange={handleChange}
              name="type"
              id="pistol"
              type="radio"
              value="Pistol"/>
                <label htmlFor='pistol'>Pistol</label>

              <input
              onChange={handleChange}
              name="type"
              id="shotgun"
              type="radio"
              value="Shotgun"/>
              <label htmlFor='shotgun'>Shotgun</label>
              <input
              onChange={handleChange}
              name="type"
              id="rifle"
              type="radio"
              value="Rifle"/>
              <label htmlFor='rifle'>Rifle</label>
                </div>
              </div>
              
              <button type='submit'>
                Search
              </button>
              

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