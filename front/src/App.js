
import './App.css';
import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductDetails } from './components/products/ProductDetails';
import { Dashboard } from './components/admin/Dashboard';
import { Productlist } from './components/admin/Productlist';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Routes >
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/producList" element={<Productlist/>}/>
          <Route path="/admin/newproduct" element={<NewProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
