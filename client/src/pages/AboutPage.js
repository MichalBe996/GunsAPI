import React from 'react'
import Navbar from './Navbar'

const AboutPage = () => {
  return (
    <div>
        <Navbar/>
        <div className='about-div'>
            <h1 classname="about-header">Welcome!</h1>
            <div className='about-div-text'>
                This is a test site made entirely by me to present complex application consisting of fully functional front-end
                developed in React.js and working server programmed in Express.js with connection to MongoDB database. Functionalities of the application
                include basic CRUD operations on the database regarding products added to cart, registration/login/logout process of users, shop carts
                assigned to specific users and lastly - filling the shop cart if the user is not logged in.

            </div>
        </div>
    </div>
  )
}

export default AboutPage