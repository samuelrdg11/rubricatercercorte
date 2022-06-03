import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
  const navigate=useNavigate()
  const cerrarSesion=()=>{
    auth.signOut()
    .then(()=>{
      navigate("/login")
    })
  }
  return (
    <div className="navbar navbar-dark bg-dark ">
       <Link className='navbar-brand mb-0 h1' to="/">¡Bienvenido a <i>Your House Company</i>!</Link> 
     
        <div>
            <div className='d-flex'>
                <Link to="/" className='btn btn-dark btn-sm'>Inicio</Link>
                {
                   props.firebaseUser !==null ?(
                    <Link to="/requerimientos" className='btn btn-dark btn-sm'>Consulta</Link>
                   ):
                   null
                }
                {
                  props.firebaseUser !==null ?(
                    <button className='btn btn-dark btn-sm' onClick={()=>cerrarSesion()}>Cerrar sesión</button>
                  ):(
                    <Link to="/login" className='btn btn-dark btn-sm'>Login</Link>
                  )
                }
                
            </div>
        </div>
    </div>
  )
}
export default Navbar