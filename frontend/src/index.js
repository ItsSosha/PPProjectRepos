import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import defaultTheme from './utils/theme';
import { 
  Home,
  Product,
  ProductAbout,
  ProductReviews,
  SearchResults,
  NotFound,
  User,
  UserAbout,
  UserWishlist,
  SharedWishlist,
  AdminApproved,
  AdminUnapproved,
  AdminManageCategories,
  AdminLinkCategories
 } from './pages';
 import AdminRoutes from './auth/AdminRoutes';
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
    errorElement: <NotFound />,
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
        path: "users/:id",
        element: <User />,
        children: [
          {
            path: "about",
            element: <UserAbout />
          },
          {
            path: "wishlist",
            element: <UserWishlist />
          },
          {
            path: "admin",
            element: <AdminRoutes />,
            children: [
              {
                path: "approved",
                element: <AdminApproved />
              },
              {
                path: "unapproved",
                element: <AdminUnapproved />
              },
              {
                path: "manageCategories",
                element: <AdminManageCategories />
              },
              {
                path: "linkCategories",
                element: <AdminLinkCategories />
              }
            ]
          }
        ]
      },
      {
        path: "search",
        element: <SearchResults />
      },
      {
        path: "sharedWishlist/:id",
        element: <SharedWishlist />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
