import { useEffect } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

const Admin = () => {
  const {token, setUser, setToken} = useStateContext()
  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    console.log('here')
    event.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
    
    return <Navigate to="/" />
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  return (
    <div>
      Admin
      <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
    </div>
  )
}

export default Admin