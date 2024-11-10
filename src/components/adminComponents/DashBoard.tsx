import { useEffect, useState } from "react";
import { admGetProduct } from "../../Api/admin/admGetProduct";
import { getUsers } from "../../Api/admin/getUsers";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getUsers();
        if (usersResponse?.success) {
          setTotalUsers(usersResponse.data.length);
        }
        const productsResponse = await admGetProduct();
        if (productsResponse?.success) {
          setTotalProducts(productsResponse.data.length);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-purple-950">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-purple-950">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-purple-950">***</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;