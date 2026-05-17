import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = (email, password) => {
    const fakeUser = {
      email,
      token: 'jwt-demo-token'
    }

    setUser(fakeUser)

    localStorage.setItem('user', JSON.stringify(fakeUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}