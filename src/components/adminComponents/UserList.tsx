import { useEffect, useState } from 'react';
import { getUsers } from '../../Api/admin/getUsers';
import { message } from 'antd';
import { ShoppingCart } from 'lucide-react';
import UserViewCartModal from './UserViewCartModal';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      if (response?.success) {
        setUsers(response?.data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      message.error("Failed to fetch users");
    }
  }

  const handleClickViewCart = (user) => {
    setSelectedUser(user);
    setIsCartModalOpen(true);
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cart</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-950 font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleClickViewCart(user)}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-purple-700 hover:text-purple-950 hover:bg-purple-50 rounded-md transition-colors duration-150"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1.5" />
                      View Cart
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserViewCartModal
        isOpen={isCartModalOpen}
        onClose={() => {
          setIsCartModalOpen(false);
          setSelectedUser(null);
        }}
        userId={selectedUser?._id}
        userName={selectedUser?.name}
      />
    </div>
  );
};

export default UserList;