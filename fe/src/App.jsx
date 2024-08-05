import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailHotel from './pages/DetailHotel';
import { Routes, Route, Navigate } from 'react-router'
import Layout from './layouts/Layout';
import DetailRoom from './pages/DetailRoom';
import ListBooking from './pages/ListBooking';
import Result from './pages/Result';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/hotels/:hotelID" element={<DetailHotel />} />
          <Route path="/hotels/:hotelID/rooms/:roomID" element={<DetailRoom />} />
          <Route path="/bookings" element={<ListBooking />} />
          <Route path="/search" element={<Result />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
