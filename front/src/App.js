
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductDetails } from './components/products/ProductDetails';
import { Dashboard } from './components/admin/Dashboard'
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
import { Success } from './components/cart/Success';
import { useSelector } from 'react-redux';
import UsersList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import OrdersList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProccessOrder';
import { ListOrder } from './components/order/ListOrder';
import { OrderDetails } from './components/order/OrderDetails';



function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const{user,isAuthenticated,loading}=useSelector(state=>state.auth)


  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes >

            {/*Users*/}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/update" element={<ProtectedRoutes><UpdateProfile /></ProtectedRoutes>} />
            <Route path="/me" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path="/password/update" element={<ProtectedRoutes><UpdatePassword /></ProtectedRoutes>} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />

            {/*Admin*/}
            <Route path="/admin/dashboard" element={<ProtectedRoutes isAdmin={true}><Dashboard /></ProtectedRoutes>} />
            <Route path="/admin/productList" element={<ProtectedRoutes><Productlist /></ProtectedRoutes>} />
            <Route path="/admin/newproduct" element={<ProtectedRoutes><NewProduct /></ProtectedRoutes>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoutes isAdmin={true}><EditProduct /></ProtectedRoutes>} />
            <Route path="/admin/users" element={<ProtectedRoutes isAdmin={true}><UsersList /></ProtectedRoutes>} />
            <Route path="/admin/user/:id" element={<ProtectedRoutes isAdmin={true}><UpdateUser /></ProtectedRoutes>} />

            {/*Order*/}
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ProtectedRoutes ><Shipping/></ProtectedRoutes>} />
            <Route path="/payment" element={<ProtectedRoutes ><Payment/></ProtectedRoutes>} />
            <Route path="/success" element={<ProtectedRoutes ><Success/></ProtectedRoutes>} />
            <Route path="/order/confirm" element={<ProtectedRoutes ><ConfirmOrder/></ProtectedRoutes>} />
            <Route path="/orderList" element={<ProtectedRoutes isAdmin={true}><OrdersList /></ProtectedRoutes>} />
            <Route path="/admin/order/:id" element={<ProtectedRoutes isAdmin={true}><ProcessOrder /></ProtectedRoutes>} />
            <Route path="/myOrders" element={<ProtectedRoutes><ListOrder /></ProtectedRoutes>} />
            <Route path="/order/:id" element={<ProtectedRoutes><OrderDetails /></ProtectedRoutes>} />

            {/*Products*/}
            <Route path="/product/:id" element={<ProductDetails />} />


            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            
            
            

            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role!=="admin") &&(
          <Footer/>
        )}
      </div>
    </Router>


  );
}

export default App;