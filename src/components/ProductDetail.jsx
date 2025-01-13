import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Product Details</h1>
      <table className="table-auto border-collapse border border-indigo-300">
        <thead>
          <tr className="bg-white text-left">
            <th className="border border-gray-300 px-4 py-2 text-indigo-700">Product Image</th>
            <th className="border border-gray-300 px-4 py-2 text-indigo-700">Product Information</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            {/* Product Image */}
            <td className="border border-gray-300 px-4 py-6">
              <img
                src={product.image}
                alt={product.title}
                className="w-100 h-100 object-cover mx-auto rounded-md shadow-lg border-4 border-blue-300"
              />
            </td>
            {/* Product Details */}
            <td className="border border-gray-300 px-4 py-6">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="font-semibold text-indigo-600">ID:</td>
                    <td>{product.id}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-indigo-600">Title:</td>
                    <td className="font-medium text-blue-800">{product.title}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-indigo-600">Price:</td>
                    <td className="text-green-600">Rs. {product.price}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-indigo-600">Rate:</td>
                    <td className="text-green-600">{product.rating.rate} Stars ({product.rating.count} Reviews)</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-indigo-600">Description: </td>
                    <td className="text-gray-800">{product.description}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-6">
        <Link to="/">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-300">
            Back to Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
