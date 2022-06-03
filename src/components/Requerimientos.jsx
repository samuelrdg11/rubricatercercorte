import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'

const Requerimientos = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log('Existe el usuario');
      setUser(auth.currentUser)
    } else {
      console.log('No existe el usuario');
      navigate("/login")
    }
  }, [navigate])
  return (
    <div>
      {

        user && (
        
          <Registro user={user}/>
        )
      }
  
      <br />
    </div>
  )
}

export default Requerimientos