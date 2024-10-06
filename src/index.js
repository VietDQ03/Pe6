import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Movie from './components/Moives';

const router = createBrowserRouter([
  {
    path: "/movie",
    element: <App />,
    // children: [
    //   {
    //     path: "/director",
    //   },
    // ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);