import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.productData || [];
    
  const handleProductClick = (product) => {
    navigate(`/result/${product.productId}`, { state: { product } });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleHomeClick}
          className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          <Home size={24} />
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow">Product Results</h1>
      </div>
      <div className="overflow-auto h-[calc(100vh-10rem)]">
        {productData.map((product) => (
          <div 
            key={product.productId} 
            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleProductClick(product)}
          >
            <div className="flex items-center">
              <img
                src={product.imageSrc}
                alt={product.productName}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-grow p-4">
                <h2 className="text-sm font-semibold mb-2 line-clamp-2">
                  {product.productName}
                </h2>
                <p className="text-lg font-bold text-green-600">${product.productPrice}</p>
              </div>
              <ChevronRight className="mr-4 text-gray-400" />
            </div>                
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;