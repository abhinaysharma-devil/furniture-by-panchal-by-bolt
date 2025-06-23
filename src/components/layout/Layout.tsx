import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogoClick }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLogoClick={onLogoClick} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;