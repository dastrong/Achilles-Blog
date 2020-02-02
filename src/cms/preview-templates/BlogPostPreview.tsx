import React from 'react';
import { BlogPostTemplate } from '../../templates/blog-post';

type Props = {
  entry: {
    getIn: (args: [string, string]) => string;
  };
  widgetFor: (arg0: string) => void;
};

export default function BlogPostPreview({ entry, widgetFor }: Props) {
  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      date={entry.getIn(['data', 'date'])}
      title={entry.getIn(['data', 'title'])}
    />
  );
}
