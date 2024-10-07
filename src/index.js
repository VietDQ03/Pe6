import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Star from './components/Star';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/movie" />, // Tự động chuyển hướng từ / đến /movie
  },
  {
    path: "/movie",
    element: <App />,
   
  },
  {
    path: "movie/:id?/add-stars",
    element: <Star />,
   
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);