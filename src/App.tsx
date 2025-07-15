import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';

// Pages
import Home from './pages/Home';
import CategoriesList from './pages/CategoriesList';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './components/admin/AdminLayout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCategories from './pages/admin/Categories';
import AdminProducts from './pages/admin/Products';
import AdminUsers from './pages/admin/Users';
import AdminOrders from './pages/admin/Orders';
import PrivacyPolicy from './pages/privacyPolicy';
import TermsAndConditions from './pages/tnc'; 
import ShippingPolicy from './pages/shippingPolicy';

function App() {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    if (logoClickCount >= 5) {
      setShowAdminLogin(true);
      setLogoClickCount(0);
    }
  }, [logoClickCount]);

  const handleLogoClick = () => {
    setLogoClickCount(prev => prev + 1);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  return (
    <Router>
      {showAdminLogin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleAdminLogin}
        />
      )}

      <Routes>
        {/* Admin Routes */}
        {isAdmin ? (
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        ) : null}

        {/* Public Routes */} 
        <Route
          path="/"
          element={<Layout onLogoClick={handleLogoClick}><Home /></Layout>}
        />
        <Route path="/categories" element={<Layout><CategoriesList /></Layout>} />
        <Route path="/category/:slug" element={<Layout><CategoryProducts /></Layout>} />
        <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/order-confirmation/:orderId" element={<Layout><OrderConfirmation /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/t&c" element={<Layout><TermsAndConditions /></Layout>} />
        <Route path="/shipping-policy" element={<Layout><ShippingPolicy /></Layout>} />
        {/* <Route path="/verify-otp" element={<Layout><OtpVerification /></Layout>} /> */}

        {/* Redirect /admin to dashboard if authenticated */}
        <Route path="/admin/*" element={isAdmin ? <Layout><Admin /></Layout> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;