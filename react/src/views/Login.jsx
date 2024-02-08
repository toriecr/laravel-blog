import { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

const Login = () => {
  const {token} = useStateContext()

  if (token) {
    return <Navigate to='/admin' />
  }

  const emailRef = useRef()
  const passwordRef = useRef()
  const [errors, setErrors] = useState(null) // used to display errors on FE
  const {setUser, setToken} = useStateContext()

  const onSubmit = (event) => {
    event.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null)
    axiosClient.post('/login', payload)
    .then(({data}) => { 
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) { //validation error
        if (response.data.errors) {
          setErrors(response.data.errors)
        } else { 
          setErrors({
            email: [response.data.message]
          })
        }
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login into your account, Blog Master
          </h1>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
          }
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login