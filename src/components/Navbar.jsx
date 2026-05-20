import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <nav className='navbar'>

      <h2 className="logo">
        MovieVerse
      </h2>

      <div>

        {user && (
          <a href='/'>
            Home
          </a>
        )}

        {user && (
          <Link to='/favorites'>
            Favorites
          </Link>
        )}

        {user ? (

          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            Logout
          </button>

        ) : (

          <>
            <Link to='/login'>
              Login
            </Link>

            <Link to='/register'>
              Register
            </Link>
          </>

        )}

      </div>
    </nav>
  )
}

export default Navbar