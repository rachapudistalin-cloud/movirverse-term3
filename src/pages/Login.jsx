import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
  e.preventDefault()

  const storedUser = JSON.parse(
    localStorage.getItem('registeredUser')
  )

  if (
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    login(email, password)

    navigate('/')
  } else {
    alert('Invalid Email or Password')
  }
}

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Login</h2>

      <input
        type='email'
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit'>Login</button>
      <p>
  Don't have an account? <a href="/register">Register</a>
</p>
    </form>
  )
}

export default Login