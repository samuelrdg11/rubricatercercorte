import React from 'react'
import { db,auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [modoRegistro, setModoRegistro] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [error, setError] = React.useState(null)
  const navigate=useNavigate()

  const guardarDatos = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('¡No ha ingresado el email')
      return
    }
    if (!pass.trim()) {
      setError('¡No ha ingresado la contraseña!')
      return
    }
    if (pass.length < 8) {
      setError('¡La contraseña debe tener mínimo 8 caracteres!')
      return
    }
    setError(null)
    if (modoRegistro) {
      registrar()
    } else {
      login()
    }
  }
  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass)
      console.log(res.user)
      setEmail('')
      setPass('')
      setError('')
      navigate("/requerimientos")
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/invalid-email') {
        setError('¡El email ingresado no es válido!')
      }
      if (error.code === 'auth/user-not-found') {
        setError('¡El usuario no está registrado!')
      }
      if (error.code === 'auth/wrong-password') {
        setError('¡La contraseña es incorrecta!')
      }
      
    }

  },[email,pass])
  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(res.user)
      await db.collection('usuariosdb1').doc(res.user.email).set(
      {
        email:res.user.email,
        id:res.user.uid
      }
      )
      //Tuve que colocar el navigate acá para que al registrarse me enviará a la consulta de requerimientos.
      navigate("/requerimientos")
      await db.collection(res.user.uid).add()
      setEmail('')
      setPass('')
      setError(null)
     
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/invalid-email') {
        setError('¡El email ingresado no es válido!')
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('¡El email ingresado ya está registrado!')
      }
    }
  },[email,pass])

  return (
    <div>
      <br />
      <h5 className='text-center'>
        {
          modoRegistro ? 'Registro de usuario' : 'Acceso al sistema'
        }
      </h5>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-xl-4">
          <form onSubmit={guardarDatos}>
            {
              error && (
                <div className='alert alert-warning'>
                  {error}
                </div>
              )
            }


            <input type="email"
              className='form-control mb-2'
              placeholder='Ingrese su email'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input type="password"
              className='form-control mb-2'
              placeholder='Ingrese su contraseña'
              onChange={e => setPass(e.target.value)}
              value={pass}
            />
            <div className='d-grid gap-2'>
              <button className='btn btn-outline-danger btn-sm'>
                {
                  modoRegistro ? 'Registrarse' : 'Entrar al sistema'
                }
              </button>
              <button className='btn btn-outline-danger btn-sm'
                onClick={() => { setModoRegistro(!modoRegistro) }}
                type='button'
              >
                {
                  modoRegistro ? '¿Ya estás registrado?' : '¿No tienes cuenta?'
                }
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login