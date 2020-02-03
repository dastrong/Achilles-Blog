import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import useHelmet from '../components/useHelmet';
import { getDaysSinceInjury, getInjuryDate } from '../utils/dates';

type Image = {
  childImageSharp: {
    fluid: FluidObject & {
      originalName: string;
    };
  };
};

type TemplateProps = {
  aboutme: string;
  heading: string;
  injuryinfo: string;
  subheading: string;
  imgs: any;
  posts?: any;
  helmet?: JSX.Element;
};

export const IndexPageTemplate = ({
  aboutme,
  heading,
  injuryinfo,
  subheading,
  imgs,
  posts,
  helmet,
}: TemplateProps) => {
  const injuryDate = getInjuryDate();
  const allPosts =
    posts &&
    posts.edges.map(post => {
      const dateNow = new Date(post.node.frontmatter.date);
      const daysSince = getDaysSinceInjury(injuryDate, dateNow);
      return {
        daysSince,
        dateString: dateNow.toDateString(),
        description: post.node.frontmatter.description,
        id: post.node.id,
        path: post.node.fields.slug,
        title: post.node.frontmatter.title,
      };
    });

  return (
    <Layout>
      {helmet || ''}
      <section className="index-cover">
        <div className="imgs">
          {Object.keys(imgs).map((img: 'image1' | 'image2' | 'image3') => {
            const isPreviewingCMS = !imgs[img].childImageSharp;
            if (isPreviewingCMS) return imgs[img];
            const { originalName, ...fluid } = imgs[img].childImageSharp.fluid;
            const name = originalName.slice(0, originalName.length - 5);
            return <Img key={name} fluid={fluid} alt={name} />;
          })}
        </div>
        <div className="headings">
          <h1>{heading}</h1>
          <p>{subheading}</p>
        </div>
      </section>

      <section className="index-content">
        <h2 id="posts" className="custom-heading blog-heading">
          Blog Posts
        </h2>
        <p className="custom-heading blog-subheading">{injuryinfo}</p>

        {posts && <PostList allPosts={allPosts} />}

        <div id="about" className="about-container">
          <h2 id="about">About Me</h2>
          {aboutme}
        </div>
      </section>
    </Layout>
  );
};

type Props = {
  data: {
    info: {
      frontmatter: {
        heading: string;
        subheading: string;
        aboutme: string;
        injuryinfo: string;
        image1: Image;
        image2: Image;
        image3: Image;
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
  location: {
    state: {
      target?: string;
    };
  };
};

export default function IndexPage({ data, location }: Props) {
  const { info, posts } = data;
  const {
    aboutme,
    heading,
    injuryinfo,
    subheading,
    ...imgs
  } = info.frontmatter;
  const helmet = useHelmet();

  // handles scrolling down to the about section
  useEffect(() => {
    const id = setTimeout(() => {
      if (!location.state || !location.state.target) return;
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }, 250);
    return () => clearTimeout(id);
  }, [location.state]);

  return (
    <IndexPageTemplate
      aboutme={aboutme}
      heading={heading}
      injuryinfo={injuryinfo}
      subheading={subheading}
      imgs={imgs}
      posts={posts}
      helmet={helmet}
    />
  );
}

export const pageQuery = graphql`
  {
    info: markdownRemark(fields: { slug: { eq: "/" } }) {
      frontmatter {
        aboutme
        heading
        image1 {
          childImageSharp {
            fluid {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
        image2 {
          childImageSharp {
            fluid {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
        image3 {
          childImageSharp {
            fluid {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
        injuryinfo
        subheading
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
