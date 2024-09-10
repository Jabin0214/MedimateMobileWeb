import { RouterProvider, Outlet } from 'react-router-dom';
import router from "../src/router/index.jsx";
import { Home } from 'lucide-react';


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
