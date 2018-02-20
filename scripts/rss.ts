import * as RSS from 'rss';
import { resolve } from 'url';

import { render } from './render';

const rss_pkg = require('rss/package');

export function rss (posts) {
  const feed = new RSS({
    title: 'solomon',
    description: 'PoiScript\'s Blog',
    generator: `node-rss ${rss_pkg.version}`,
    feed_url: 'https://blog.poi.cat/atom.xml',
    site_url: 'https://blog.poi.cat',
    language: 'zh-Hans',
  });

  const POST_BASE = resolve('https://blog.poi.cat', 'post');
  posts.sort((a, b) => (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0))
    .forEach(post => feed.item({
      title: post.title,
      description: render(post),
      url: resolve(POST_BASE, post.slug),
      guid: post.slug,
      categories: post.tags,
      author: 'PoiScript',
      date: post.date,
    }));

  return feed.xml();
}
