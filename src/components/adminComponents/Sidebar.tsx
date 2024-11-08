import { Users, Package, Home } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }: { 
    activePage: string; 
    setActivePage: (page: string) => void 
  }) => {
    const isActivePage = (page: string) => {
      return activePage === page ? 'bg-purple-100 text-purple-950' : 'text-gray-600';
    };
  
    return (
      <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-950">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => setActivePage('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors ${isActivePage('dashboard')}`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActivePage('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors ${isActivePage('users')}`}
          >
            <Users className="w-5 h-5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActivePage('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors ${isActivePage('products')}`}
          >
            <Package className="w-5 h-5" />
            <span>Products</span>
          </button>
        </nav>
      </div>
    );
  };

  export default Sidebar