import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page';

type Props = {
  entry: {
    getIn: (args: [string, string]) => string;
  };
  widgetFor: (arg0: string) => void;
};

export default function IndexPagePreview({ entry, widgetFor }: Props) {
  const imgs = {
    image1: widgetFor('image1'),
    image2: widgetFor('image2'),
    image3: widgetFor('image3'),
  };

  return (
    <>
      <IndexPageTemplate
        aboutme={entry.getIn(['data', 'aboutme'])}
        heading={entry.getIn(['data', 'heading'])}
        injuryinfo={entry.getIn(['data', 'injuryinfo'])}
        subheading={entry.getIn(['data', 'subheading'])}
        imgs={imgs}
      />
    </>
  );
}
