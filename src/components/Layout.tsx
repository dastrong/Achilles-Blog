import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import ToTopButton from './ToTopButton';
import './all.sass';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <div className="main-container">
      <div className="custom-bg-svg">
        <div className="bg-svg" />
      </div>
      <div className="page-content">{children}</div>
    </div>
    <Footer />
    <ToTopButton />
  </>
);

export default Layout;
