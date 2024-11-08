const Dashboard = () => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-purple-950">2,345</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-purple-950">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-purple-950">3,456</p>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;