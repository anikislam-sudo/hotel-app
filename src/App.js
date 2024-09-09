import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./Layout/Main";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProductForm from "./pages/ProductForm/ProductForm";
import Manage from "./components/Manage/Manage";
import Update from "./components/Update/Update";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },

      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <ProductForm></ProductForm>
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage",
        element: (
          <ProtectedRoute>
            <Manage></Manage>
          </ProtectedRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        ),
       
      },
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
