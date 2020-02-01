import React from 'react';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import Helmet from 'react-helmet';

export default function useHelmet(titleArg?: string, descriptionArg?: string) {
  const img = `${withPrefix('/')}img/favicon.png`;
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const title = titleArg || site.siteMetadata.title;
  const description = descriptionArg || site.siteMetadata.description;

  return (
    <Helmet titleTemplate="%s | Walter Barrios">
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="apple-touch-icon" sizes="180x180" href={img} />
      <link rel="icon" type="image/png" href={img} sizes="32x32" />
      <link rel="icon" type="image/png" href={img} sizes="16x16" />
      <link rel="mask-icon" href={img} color="#ffed68" />

      <meta name="theme-color" content="#ffed68" />
      <meta property="og:type" content="blog" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="/" />
      <meta property="og:image" content={img} />
    </Helmet>
  );
}
