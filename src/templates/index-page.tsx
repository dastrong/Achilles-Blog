import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Img, { FluidObject } from 'gatsby-image';
import useHelmet from '../components/useHelmet';

type Image = {
  childImageSharp: {
    fluid: FluidObject & {
      originalName: string;
    };
  };
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
          };
        }
      ];
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
  const injuryDate = new Date('12/1/2019').getTime();

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

        <div className="index-posts">
          {posts &&
            posts.edges.map(post => {
              const { frontmatter, id } = post.node;
              const { title, date, description } = frontmatter;
              const daysSinceInjury = Math.floor(
                (new Date(date).getTime() - injuryDate) / 86400000 // 1 day in ms
              );
              return (
                <div className="post__container" key={id}>
                  <div className="post__day">{`Day ${daysSinceInjury}`}</div>
                  <div className="post__content">
                    <h2 className="post__title">{title}</h2>
                    <span className="post__date">{date}</span>
                    <p className="post__description">{description}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div id="about" className="about-container">
          <h2 id="about">About Me</h2>
          {aboutme}
        </div>
      </section>
    </Layout>
  );
};

export default function IndexPage({ data }: Props) {
  const { info, posts } = data;
  const {
    aboutme,
    heading,
    injuryinfo,
    subheading,
    ...imgs
  } = info.frontmatter;
  const helmet = useHelmet();

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
        }
      }
    }
  }
`;
