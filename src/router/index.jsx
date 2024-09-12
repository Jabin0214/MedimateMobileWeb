import { createBrowserRouter } from 'react-router-dom';

import Result from '../pages/Result';
import HomePage from '../pages/HomePage';
import CameraPage from '../pages/CameraPage';
import ProductDetail from '../pages/ProductDetail';
import UploadSearchPage from '../pages/UploadSearchPage';

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/result',
        element: <Result />,
    },
    {
        path: '/result/:productId',
        element: <ProductDetail />,
  },
  {
    path: '/camera',
    element: <CameraPage />,
  },
  {
    path: '/upload-search',
    element: <UploadSearchPage />,
  },
    
  ]);


export default router;