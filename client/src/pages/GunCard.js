import React from 'react'

const GunCard = (props) => {
   
  return (
    <div className="gun--div">
        <h1 id="gun--name">{props.name.substring(0, 23)}</h1>
        <img className="gun--img" id="gun--img" src={props.img}></img>
        <p id="gun--price">${props.price}</p>
        <div className="gun--card--buttons" id="gun--card--buttons">
            <button>See more</button>
            <button>Add to cart</button>

        </div>
    </div>
  )
}

export default GunCard