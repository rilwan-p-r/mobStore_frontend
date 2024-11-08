import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import { admGetProduct } from "../../Api/admin/admGetProduct";
import { Product } from "../../interfaces/Product.interface";
// import { admEditProduct } from "../../Api/admin/admEditProduct";
import { admDeleteProduct } from "../../Api/admin/admDeleteProduct";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd"

const { confirm } = Modal
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, { ...newProduct, _id: Date.now().toString() }]);
  };

  const fetchProducts = async () => {
    try {
      await admGetProduct().then((response) => {
        if (response.success) {
          setProducts(response.data as Product[]);
        }
      }).catch((error) => {
        console.error("Failed to fetch products:", error);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const showDeleteConfirm = (productId: string) => {
    confirm({
      title: 'Are you sure you want to delete this blog post?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      async onOk() {
        try {

          const response = await admDeleteProduct(productId);
          if (response.status === 200) {
            message.success('Product deleted successfully');
            fetchProducts();
          }
        } catch (error) {
          console.log('Failed to delete product', error);
        }
      },
    });
  };

  const handleDelete = (productId: string) => {
    return ()=>{
      showDeleteConfirm(productId)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-950 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors duration-200"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3 transition-colors duration-200">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      onClick={handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;