import { Route, Routes, Navigate } from "react-router-dom"
import Home from "../Pages/user/Home"


const UserRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
  )
}

export default UserRoutes
