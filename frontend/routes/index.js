import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
// import EwastePage from '../'
import Hero from '../pages/EwastePage'
import AllEwasteUploads  from '../pages/AllEwasteUploads'
import AllTraders from '../pages/AllTraders'
import  AssignedTasks  from '../pages/AssignedTasks'
import Dashboard from '../pages/Dashboard'
import RewardsPage from '../pages/RewardPage'
import MyProfile from '../pages/MyProfile'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "ewastepage",
        element: <Hero />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "assigned-tasks",
        element: <AssignedTasks />,
      },
      {
        path: "rewards",
        element: <RewardsPage />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },

      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-ewaste-uploads",
            element: <AllEwasteUploads />,
          },
          {
            path: "all-traders",
            element: <AllTraders />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);


export default router