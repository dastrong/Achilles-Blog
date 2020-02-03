import React, { useState } from 'react';
import { navigate, Link } from 'gatsby';
import Button from './Button';

type Props = {
  allPosts: {
    id: string;
    path: string;
    title: string;
    description: string;
    dateString: string;
    daysSince: number;
  }[];
};

export default function PostList({ allPosts }: Props) {
  const [viewCount, setViewCount] = useState(4);

  const viewMore = () => setViewCount(state => state + 4);

  return (
    <div className="postlist-container">
      <div className="posts-container">
        {allPosts
          .slice(0, viewCount)
          .map(({ id, path, title, description, dateString, daysSince }) => (
            <div
              className="post__container"
              key={id}
              onClick={() => navigate(path)}
            >
              <div className="post__day">{`Day ${daysSince}`}</div>
              <div className="post__content">
                <h2 className="post__title">{title}</h2>
                <span className="post__date">{dateString}</span>
                <p className="post__description">{description}</p>
              </div>
            </div>
          ))}
      </div>

      <h2 className="postlist-daypicker">Go to a day below</h2>
      <div className="postlist-shortcuts">
        {allPosts.map(({ path, daysSince }) => (
          <Link to={path} key={path}>
            {daysSince}
          </Link>
        ))}
      </div>

      {allPosts.length > viewCount && (
        <Button handleClick={viewMore} content="View More" />
      )}
    </div>
  );
}
