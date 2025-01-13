import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // For Calculate the products to be shown on the current page
    const offset = (page - 1) * itemsPerPage;
    const paginatedProducts = products.slice(offset, offset + itemsPerPage);
    setCurrentProducts(paginatedProducts);
  }, [page, products]);

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Product List
      </h1>
      <div className="overflow-hidden shadow-lg rounded-lg bg-white">
        {loading ? (
          <div className="text-center py-6 text-gray-600">Loading...</div>
        ) : (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4 text-center">{product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-between mt-6 items-center">
        <p className="text-gray-700 text-sm">
          Showing page {page} of {Math.ceil(products.length / itemsPerPage)}
        </p>
        <div>
          <button
            className={`px-4 py-2 mr-2 text-sm font-semibold rounded-lg ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-lg ${
              page * itemsPerPage >= products.length
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={page * itemsPerPage >= products.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
