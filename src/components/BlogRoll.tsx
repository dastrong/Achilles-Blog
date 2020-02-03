import React from 'react';
import PostList from './PostList';
import { getInjuryDate, getDaysSinceInjury } from '../utils/dates';

type Props = {
  injuryinfo: string;
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

export default function BlogRoll({ injuryinfo, posts }: Props) {
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
    <>
      <h2 className="custom-heading blog-heading">Blog Posts</h2>
      <p className="custom-heading blog-subheading">{injuryinfo}</p>

      {allPosts && <PostList allPosts={allPosts} />}
    </>
  );
}
