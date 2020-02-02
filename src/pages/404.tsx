import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <Layout>
    <div
      style={{
        margin: '40px auto 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Page not found</h1>
      <Link to="/">
        <Button content="Go back home" />
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;
