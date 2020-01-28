import React, { useState } from 'react';
import { Link } from 'gatsby';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState('');

  const toggleHamburger = () => {
    setIsActive(state => !state);
    setNavBarActiveClass(cxState => (!cxState ? 'is-active' : ''));
  };

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            Walter Barrios
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={toggleHamburger}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About Me
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
