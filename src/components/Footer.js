import React from 'react';
import { Link } from 'gatsby';
import { ReactComponent as FacebookSVG } from '../img/social/facebook.svg';
import { ReactComponent as InstagramSVG } from '../img/social/instagram.svg';

const SocialLink = ({ url, children }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Footer = () => (
  <footer className="footer">
    <Link to="/">Home</Link>

    <SocialLink url="https://www.instagram.com/fwarrior.135">
      <InstagramSVG height="1em" width="1em" />
    </SocialLink>

    <SocialLink url="https://www.facebook.com/walter.barrios">
      <FacebookSVG height="1em" width="1em" />
    </SocialLink>

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
