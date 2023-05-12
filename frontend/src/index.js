import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { 
  Home,
  Product,
  ProductAbout,
  ProductReviews,
  SearchResults,
 } from './pages';
import App from './App';

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100vh;
}
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products/:id",
        element: <Product />,
        children: [
          {
            path: "about",
            element: <ProductAbout />
          },
          {
            path: "reviews",
            element: <ProductReviews />
          }
        ]
      },
      {
        path: "search",
        element: <SearchResults />
      }
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
