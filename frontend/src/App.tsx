import { Route, Routes } from "react-router-dom"
import { Client } from "./components/client/Client"
import Shop from "./components/client/Shop"
import ProductDetails from "./components/client/ProductDetails"
import Cart from "./components/client/Cart"
import Order from "./components/client/Order"
import Login from "./components/client/Login"
import Register from "./components/client/Register"
import Index from "./components/server/Index"
import Admin from "./components/server/Admin"
import AddProduct from "./components/server/AddProduct"
import Users from "./components/server/Users"
import Category from "./components/server/Category"
import Orders from "./components/server/Orders"
import CheckOut from "./components/client/CheckOut"
import ChangeUserInfo from "./components/client/ChangeUserInfo"
import AdminLogin from "./components/Admin/AdminLogin"
function App() {
  

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Client/>}>
          <Route index element={<Shop/>}></Route>
          <Route path="product-details" element={<ProductDetails/>}></Route>
          <Route path="cart" element={<Cart/>}></Route>
          <Route path="order" element={<Order/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="checkOut" element={<CheckOut/>}></Route>
          <Route path="changeUserInfo" element={<ChangeUserInfo/>}></Route>
        </Route>
        <Route path="/admin" element={<Index/>}>
          <Route index element={<Admin/>}></Route>
          <Route path="add-product" element={<AddProduct/>}></Route>
          <Route path="users" element={<Users/>}></Route>
          <Route path="category" element={<Category/>}></Route>
          <Route path="order" element={<Orders/>}></Route>
        </Route>
        <Route path="/admin-login" element={<AdminLogin/>}></Route>
      </Routes>
    </>
  )
}

export default App
