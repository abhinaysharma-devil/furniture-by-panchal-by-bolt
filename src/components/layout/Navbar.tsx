import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignJustify, X, ShoppingCart, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import fbpPng from '../../../public/fbp-logo-removebg-preview.png';
import { useCart } from "../../context/cartContext"

interface NavbarProps {
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  const cartItemCount = cart

  const { logout } = useAuthStore();

  const { user, isAuthenticated } = JSON.parse(localStorage.getItem('furniture-auth-storage') || '{}')

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-3'
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center"
          onClick={onLogoClick}
        >

          <img width={200} src={fbpPng} alt="" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks isScrolled={isScrolled} />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <AlignJustify className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-primary font-bold text-xl">FurnitureByPanchal ccc</span>
            <button
              className="text-gray-500 hover:text-primary transition-colors"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="py-4 px-4">
            <div className="flex flex-col space-y-3">
              <NavLinks mobile />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({cartItemCount})</span>
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={logout}
                      className="text-left text-gray-700 hover:text-primary transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  isScrolled?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile, isScrolled }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const links = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`
            ${mobile ? 'text-base py-2' : 'text-sm font-medium'} 
            ${isActive(link.path)
              ? 'text-primary font-semibold'
              : isScrolled || mobile
                ? 'text-gray-700 hover:text-primary'
                : 'text-gray-800 hover:text-primary'
            }
            transition-colors
          `}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Navbar;