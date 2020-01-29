import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';

export default function IndexPage() {
  const data = useStaticQuery(imgQuery);
  const imgs = data.allFile.edges;
  return (
    <Layout>
      <div className="index-container">
        <div className="imgs">
          {imgs.map(({ node }) => {
            const img = node.childImageSharp.fluid;
            const name = img.originalName.slice(0, img.originalName.length - 5);
            return <Img key={name} fluid={img} alt={name} />;
          })}
        </div>
        <div className="headings">
          <h1>Achilles Recovery</h1>
          <p>My first hand experiences to regain mobility</p>
        </div>
      </div>
    </Layout>
  );
}

const imgQuery = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "walter" } }) {
      edges {
        node {
          childImageSharp {
            fluid {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
