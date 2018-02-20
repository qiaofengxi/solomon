import { readFileSync } from 'fs-extra';
import { minify } from 'html-minifier';
import * as marked from 'marked';
import { join, resolve } from 'path';

const content = resolve('content');
const renderer = new marked.Renderer();
const headings = [];

marked.setOptions({
  highlight: code => require('highlight.js').highlightAuto(code).value,
});

renderer.heading = text => {
  const id = encodeURI(text);
  headings.push({id, text});
  return `</div></section><section id="${id}"><h2>${text}</h2><div class="section-content">`;
};

const toc = () => `
  <section class="toc">
    <h2>${headings.length ? 'Contents' : ''}</h2>
    <div class="section-content">
      <nav>
        <ul>
          ${headings.map(h => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}
        </ul>
      </nav>
`;

export function render (post) {
  // clear headings array
  while (headings.length) {
    headings.pop();
  }

  const markdown = readFileSync(join(content, `${post.slug}.md`), 'utf8');
  const html = marked(markdown, {renderer}).concat('</div></section>');

  return minify(toc().concat(html), {collapseWhitespace: true, removeEmptyElements: true});
}
