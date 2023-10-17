import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from "react"
import axios from "axios"
import GunCard from './GunCard'

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  
    
  
  useEffect(()=> {
    axios
    .get("http://localhost:5000/api/v1/guns?limit=10")
    .then((res)=>setData(res.data.data.allGuns))
    .catch(err=>{
      setError(err.message)
    })
  
    console.log(data)

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
  
  // const renderedCards = data.map((element)=>{
  //   return <GunCard 
  //     name={element.name}
  //     price={element.price}
  //     description={element.description}
    
  //   />
  // })
  return (

    <div>
        <Navbar/>

        <div className="gun--cards--div" id="gun--cards--div">
          {mappedCards}
        </div>

    </div>
  )
}

export default Home