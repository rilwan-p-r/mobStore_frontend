import { useState } from "react";
import Dashboard from "../../components/adminComponents/DashBoard";
import ProductList from "../../components/adminComponents/ProductList";
import UserList from "../../components/adminComponents/UserList";
import Sidebar from "../../components/adminComponents/Sidebar";

const AdminDashboard = () => {
    const [activePage, setActivePage] = useState('dashboard');
  
    const renderContent = () => {
      switch (activePage) {
        case 'users':
          return <UserList />;
        case 'products':
          return <ProductList />;
        default:
          return <Dashboard />;
      }
    };
    return (
        <div className="flex">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          <div className="ml-64 flex-1 min-h-screen bg-gray-50">
            {renderContent()}
          </div>
        </div>
      );
    };
    
    export default AdminDashboard;