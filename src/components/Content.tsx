import React from 'react';

type Props = {
  content: any;
};

export const HTMLContent = ({ content }: Props) => (
  <article
    className="blogpost-content"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const Content = ({ content }: Props) => (
  <article className="blogpost-content">{content}</article>
);

export default Content;
