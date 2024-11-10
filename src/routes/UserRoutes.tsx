import { Route, Routes, Navigate } from "react-router-dom"
import Home from "../Pages/user/Home"
import Cart from "../Pages/user/Cart"
import OrderSuccess from "../Pages/user/OrderSuccess"


const UserRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
  )
}

export default UserRoutes
