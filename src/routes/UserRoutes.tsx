import { Route, Routes, Navigate } from "react-router-dom"
import Home from "../Pages/user/Home"
import Cart from "../Pages/user/Cart"


const UserRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
  )
}

export default UserRoutes
