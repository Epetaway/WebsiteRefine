import glob from 'fast-glob';
import * as path from 'path';

async function importArticle(articleFilename) {
  let { meta } = await import(`../pages/articles/${articleFilename}`);
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
  };
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => new Date(z.date) - new Date(a.date));
}
