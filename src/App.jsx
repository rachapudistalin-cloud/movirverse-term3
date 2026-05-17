import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Favorites from './pages/Favorites'
import Details from './pages/Details'
import ProtectedRoute from './routes/ProtectedRoute'


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
  path='/'
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/movie/:id' element={<Details />} />

        <Route
          path='/favorites'
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App