import React from 'react';
import { Link } from 'gatsby';

import facebook from '../img/social/facebook.svg';
import instagram from '../img/social/instagram.svg';

const Footer = () => (
  <footer className="footer">
    <Link to="/">Home</Link>
    <a
      href="https://www.instagram.com/fwarrior.135"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={instagram}
        alt="Instagram"
        style={{ width: '1em', height: '1em' }}
      />
    </a>
    <a
      href="https://www.facebook.com/walter.barrios"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={facebook}
        alt="Facebook"
        style={{ width: '1em', height: '1em' }}
      />
    </a>

    <p>
      Built by{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.github.com/dastrong"
      >
        DaStrong
      </a>
      .
    </p>
  </footer>
);

export default Footer;
