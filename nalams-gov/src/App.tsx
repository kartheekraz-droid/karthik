import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LiveMap from './pages/LiveMap'
import Parcel from './pages/Parcel'
import Citizen from './pages/Citizen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<LiveMap />} />
      <Route path="/parcel/:id" element={<Parcel />} />
      <Route path="/parcel" element={<Parcel />} />
      <Route path="/citizen" element={<Citizen />} />
    </Routes>
  )
}
