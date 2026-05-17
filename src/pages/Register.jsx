import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password
    }

    localStorage.setItem(
      'registeredUser',
      JSON.stringify(userData)
    )

    alert('Registration Successful')

    navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Register</h2>

      <input
        type='text'
        placeholder='Enter Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button type='submit'>Register</button>
    </form>
  )
}

export default Register