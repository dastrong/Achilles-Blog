import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';

export default function IndexPage() {
  const data = useStaticQuery(imgQuery);
  const imgs = data.allFile.edges;

  return (
    <Layout>
      <section className="index-cover">
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
      </section>
      <section className="index-content" style={{ height: '700px' }}>
        <h1
          style={{ textAlign: 'center', fontSize: '3rem', marginTop: '40px' }}
        >
          Blog Posts
        </h1>
        <div className="index-posts">
          {posts.map(({ title, date, description }) => (
            <div className="post__container">
              <div className="post__day">{date}</div>
              <div className="post__content">
                <h2 className="post__title">{title}</h2>
                <span className="post__date">{new Date().toDateString()}</span>
                <p className="post__description">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="about-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
            eius quo ad dolor quaerat corporis, voluptatem ratione quasi quae
            cumque provident nihil? Magni labore maxime, illo fugiat maiores
            deleniti nam.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            aspernatur reiciendis quae quam ratione esse eum repellendus eos.
            Laboriosam non soluta nulla.
          </p>
        </div>
      </section>
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

const posts = [
  {
    title: 'Lorem ipsum dolor sit.',
    date: 'Day 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae eveniet, quis, culpa commodi dolor quia beatae quo dolorum, et consectetur sed? Debitis fugit exercitationem hic pariatur earum iusto cumque.',
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    date: 'Day 15',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aut sed, perspiciatis eaque, non temporibus vero modi accusantium vitae excepturi alias necessitatibus voluptatibus ab qui fugiat corrupti quod. Officiis inventore eaque, natus, doloremque sit temporibus non illum repudiandae voluptatibus debitis sunt ducimus. Repellendus aperiam nam architecto autem quas excepturi molestiae!',
  },
  {
    title: 'Lorem ipsum dolor sit amet  sit amet consectetur.',
    date: 'Day 16',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, sed totam eos earum nisi quos eligendi amet, illo illum, perferendis cupiditate enim commodi. Sed aspernatur nostrum praesentium voluptate et tenetur?',
  },
];
