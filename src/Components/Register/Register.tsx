import React from 'react'
import { Link } from 'react-router-dom';

const RegisterTypes = () => {
  return (
    <div>
        <h1>RegisterTypes</h1>
        <div>
            <Link to="register/" ><button>Worker</button></Link>        
        </div>
        <div>
            <Link to="register/" ><button>Client</button></Link>
        </div>

    </div>
  )
}

export default RegisterTypes