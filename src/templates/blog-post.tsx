import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
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
};

export const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  title,
  helmet,
  previous,
  next,
}: TemplateProps) => {
  const PostContent = contentComponent || Content;
  const injuryDate = getInjuryDate();

  return (
    <Layout>
      {helmet || ''}
      <section className="blogpost">
        <div className="blogpost__container">
          <div className="blogpost__info">
            <h1>{title}</h1>
            <p>{new Date(date).toDateString()}</p>
          </div>
          <PostContent content={content} />
          {/* {(previous || next) && (
            <div className="blogpost__pagination">
              {previous && (
                <Link to={previous.fields.slug}>
                  {`Day ${getDaysSinceInjury(
                    injuryDate,
                    new Date(previous.frontmatter.date)
                  )}`}
                </Link>
              )}
              {next && (
                <Link to={next.fields.slug}>
                  {`Day ${getDaysSinceInjury(
                    injuryDate,
                    new Date(next.frontmatter.date)
                  )}`}
                </Link>
              )}
            </div>
          )} */}
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
  };
};

export default function BlogPost({ data, pageContext }: Props) {
  const { html } = data.post;
  const { title, description, date } = data.post.frontmatter;
  const helmet = useHelmet(title, description);
  const { next, previous } = pageContext;

  return (
    <BlogPostTemplate
      content={html}
      contentComponent={HTMLContent}
      helmet={helmet}
      title={title}
      date={date}
      next={next}
      previous={previous}
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
