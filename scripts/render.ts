import { readFileSync } from 'fs-extra';
import { minify } from 'html-minifier';
import * as marked from 'marked';
import { join, resolve } from 'path';

const assets = resolve('assets');

export function render (post) {
  const markdown = readFileSync(join(assets, 'markdown', `${post.slug}.md`), 'utf8');
  const html = marked(markdown);
  return minify(html, {collapseWhitespace: true});
}