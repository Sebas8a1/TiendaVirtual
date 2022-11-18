
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductDetails } from './components/products/ProductDetails';
import { Dashboard } from './components/admin/Dashboard';
import { Productlist } from './components/admin/Productlist';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';
import EditProduct from './components/admin/EditProduct';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { UpdateProfile } from './components/user/UpdateProfile';
import { loadUser } from './actions/userActions';
import store from './store';
import { Profile } from './components/user/Profile';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from './components/user/ForgotPassword';
import { NewPassword } from './components/user/NewPassword';
import { Shipping } from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import { Payment } from './components/cart/Payment';
import CheckoutSteps from './components/cart/CheckOutSteps';
import { Success } from './components/cart/Success';


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes >
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/admin/dashboard" element={<ProtectedRoutes isAdmin={true}><Dashboard /></ProtectedRoutes>} />
            <Route path="/admin/productList" element={<Productlist />} />
            <Route path="/admin/newproduct" element={<NewProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/edit/:id" element={<ProtectedRoutes isAdmin={true}><EditProduct /></ProtectedRoutes>} />
            <Route path="/shipping" element={<ProtectedRoutes ><Shipping/></ProtectedRoutes>} />
            <Route path="/payment" element={<ProtectedRoutes ><Payment/></ProtectedRoutes>} />
            <Route path="/success" element={<ProtectedRoutes ><Success/></ProtectedRoutes>} />
            <Route path="/order/confirm" element={<ProtectedRoutes ><ConfirmOrder/></ProtectedRoutes>} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>


  );
}

export default App;