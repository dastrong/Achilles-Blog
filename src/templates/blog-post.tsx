import React from 'react';
import { graphql } from 'gatsby';
import { FacebookProvider, Comments } from 'react-facebook';

import Content, { HTMLContent } from '../components/Content';
import DayPicker from '../components/DayPicker';
import Layout from '../components/Layout';
import useHelmet from '../components/useHelmet';
import { getInjuryDate, getDaysSinceInjury } from '../utils/dates';

type NextPrevProps = {
  frontmatter: {
    date: Date;
  };
  fields: {
    slug: string;
  };
};

type TemplateProps = {
  content: any;
  contentComponent?: any;
  date: string;
  title: string;
  helmet?: JSX.Element;
  previous?: NextPrevProps;
  next?: NextPrevProps;
  slug: string;
};

export const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  title,
  helmet,
  previous,
  next,
  slug,
}: TemplateProps) => {
  const PostContent = contentComponent || Content;
  const injuryDate = getInjuryDate();

  return (
    <Layout>
      {helmet || ''}
      <section className="blogpost">
        <div className="styled-container">
          <div className="blogpost__info">
            <h1>{title}</h1>
            <p>{new Date(date).toDateString()}</p>
          </div>

          <PostContent content={content} />

          {(previous || next) && (
            <div className="blogpost__pagination">
              {previous ? (
                <DayPicker
                  style={{ position: 'absolute', left: 0 }}
                  path={previous.fields.slug}
                  daysSince={getDaysSinceInjury(
                    injuryDate,
                    new Date(previous.frontmatter.date)
                  )}
                />
              ) : null}
              {next && (
                <DayPicker
                  style={{ position: 'absolute', right: 0 }}
                  path={next.fields.slug}
                  daysSince={getDaysSinceInjury(
                    injuryDate,
                    new Date(next.frontmatter.date)
                  )}
                />
              )}
            </div>
          )}

          {process.env.GATSBY_FACEBOOK_APPID && (
            <FacebookProvider appId={process.env.GATSBY_FACEBOOK_APPID}>
              <Comments
                width="100%"
                href={`https://achillesrecovery.netlify.com${slug}`}
              />
            </FacebookProvider>
          )}
        </div>
      </section>
    </Layout>
  );
};

type Props = {
  data: {
    post: {
      id: string;
      html: React.ReactNode;
      frontmatter: {
        date: string;
        title: string;
        description: string;
      };
    };
  };
  pageContext: {
    next: NextPrevProps;
    previous: NextPrevProps;
    slug: string;
  };
};

export default function BlogPost({ data, pageContext }: Props) {
  const { html } = data.post;
  const { title, description, date } = data.post.frontmatter;
  const helmet = useHelmet(title, description);
  const { next, previous, slug } = pageContext;

  return (
    <BlogPostTemplate
      content={html}
      contentComponent={HTMLContent}
      helmet={helmet}
      title={title}
      date={date}
      next={next}
      previous={previous}
      slug={slug}
    />
  );
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date
        title
        description
      }
    }
  }
`;
