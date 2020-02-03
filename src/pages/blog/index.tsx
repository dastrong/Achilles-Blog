import React from 'react';
import { graphql } from 'gatsby';
import BlogRoll from '../../components/BlogRoll';
import Layout from '../../components/Layout';

type Props = {
  data: {
    info: {
      frontmatter: {
        injuryinfo: string;
      };
    };
    posts: {
      edges: [
        {
          node: {
            id: string;
            frontmatter: {
              date: string;
              description: string;
              title: string;
            };
            fields: {
              slug: string;
            };
          };
        }
      ];
    };
  };
};

export default function Blog({ data }: Props) {
  const { info, posts } = data;
  return (
    <Layout>
      <section style={{ padding: '40px 0 50px' }}>
        <BlogRoll injuryinfo={info.frontmatter.injuryinfo} posts={posts} />
        <div className="styled-container" style={{ textAlign: 'center' }}>
          More posts coming soon.
          <br />
          <br />
          Stay tuned.
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    info: markdownRemark(fields: { slug: { eq: "/" } }) {
      frontmatter {
        injuryinfo
      }
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      sort: { order: ASC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
