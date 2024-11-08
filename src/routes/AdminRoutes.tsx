import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Pages/admin/adminDashboard';


const AdminRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<AdminDashboard/>}/>
        </Routes>
  )
}

export default AdminRoutes
