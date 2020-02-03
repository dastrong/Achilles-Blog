import CMS from 'netlify-cms-app';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';

CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('index', IndexPagePreview);
