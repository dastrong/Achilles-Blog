const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { order: ASC, fields: frontmatter___date }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          next {
            frontmatter {
              date
            }
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              date
            }
          }
          node {
            frontmatter {
              templateKey
            }
            fields {
              slug
            }
            id
          }
        }
      }
      index: markdownRemark(
        frontmatter: { templateKey: { eq: "index-page" } }
      ) {
        fields {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  // creates blog posts
  result.data.posts.edges.forEach(({ node, next, previous }) => {
    const { id, fields } = node;
    createPage({
      path: fields.slug,
      component: path.resolve(`src/templates/blog-post.tsx`),
      context: {
        id,
        next,
        previous,
        slug: fields.slug,
      },
    });
  });

  // creates index page
  createPage({
    path: result.data.index.fields.slug,
    component: path.resolve('src/templates/index-page.tsx'),
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
