import {Navigate, createBrowserRouter} from 'react-router-dom'
import Login from './views/Login'
import Blogs from './views/Blogs'
import Admin from './views/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blogs />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Admin />
  },
])

export default router