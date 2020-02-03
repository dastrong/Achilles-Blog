import React from 'react';
import { Link } from 'gatsby';
import facebook from '../img/social/facebook.svg';
import instagram from '../img/social/instagram.svg';

type SocialTypes = {
  img: string;
  name: string;
  url: string;
};

const SocialLink = ({ img, name, url }: SocialTypes) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <img src={img} alt={name} />
  </a>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer__links">
      <SocialLink
        img={facebook}
        name="facebook"
        url="https://www.instagram.com/fwarrior.135"
      />

      <SocialLink
        img={instagram}
        name="instagram"
        url="https://www.facebook.com/walter.barrios"
      />
    </div>

    <div className="footer__links">
      <Link to="/">Home</Link>
      <Link to="/" state={{ target: 'about' }}>
        About Me
      </Link>
      <Link to="/blog">Blog</Link>
    </div>

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
