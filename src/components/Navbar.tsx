import React, { useState } from 'react';
import { Link } from 'gatsby';

export default function Navbar() {
  const [activeClass, setActiveClass] = useState('');

  const toggleMenu = () => setActiveClass(state => (!state ? 'is-active' : ''));

  return (
    <nav className="navbar" role="navigation" aria-label="main-navigation">
      <div className="container is-fullhd">
        <div className="navbar-brand ">
          <Link to="/" className="navbar-item walter-logo">
            Walter Barrios
          </Link>

          <div
            className={`navbar-burger burger ${activeClass}`}
            data-target="navMenu"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="navbar-end">
          <div id="navMenu" className={`navbar-menu ${activeClass}`}>
            <a href="#about" className="navbar-item">
              About Me
            </a>
            {activeClass === 'is-active' && <hr className="navbar-divider" />}
            <a href="#posts" className="navbar-item">
              Blog
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
