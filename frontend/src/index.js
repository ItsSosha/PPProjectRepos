import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import App from './App';

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Global />
    <RouterProvider router={router} />
  </React.StrictMode>
);
