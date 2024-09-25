import axios from 'axios';
import { APP_API_URL } from '/config.js';

const client = axios.create({
    baseURL: APP_API_URL,
  });
  
export const getProductByIdAPI = async (productId) => {
    try {
        const response = await client.get('/products/productDetail', {
            params: {
                productId,
            },
        });
      return response.data;
    } catch (error) {
      throw error;
    }
};
  

export const uploadImages = async (imageDataUrl) => {
  const formData = new FormData();
  const blob = await fetch(imageDataUrl).then(r => r.blob());
  formData.append('file', blob, 'image.jpg');

  try {
      const response = await client.post(`${APP_API_URL}/message/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
  } catch (error) {
      if (error.response) {
          throw new Error("No drugs detected, Pplease try again");
      } else if (error.request) {
          throw new Error('No response from server, please try again later');
      } else {
          throw new Error(`Request setup error: ${error.message}`);
      }
  }
};

export const searchProducts = async (searchText) => {
  try {
      const response = await client.get('/products', {
          params: {
              searchText,
          },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};