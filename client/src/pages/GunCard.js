import React from 'react'

const GunCard = (props) => {
  return (
    <div className="gun--div">
        <h1 id="gun--name">{props.name}</h1>
        <p id="gun--desc">{props.summary}</p>
        <p id="gun--price">{props.price}</p>
    </div>
  )
}

export default GunCard