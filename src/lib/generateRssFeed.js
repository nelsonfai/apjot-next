// utils/generateRssFeed.js

import fs from 'fs';
import path from 'path';

export function generateRssFeed(posts) {
    console.log('Post:',posts)
  const rssItemsXml = posts
    .map((post) => {
      return `
      <item>
        <title>${post.title}</title>
        <link>https://apjot.blog/blog/${post.slug}</link>
        <pubDate>${new Date(post.created).toUTCString()}</pubDate>
        <description><![CDATA[${post.meta_description} - ${post.tagline}]]></description>
        </item>`;
    })
    .join('');

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Apjot</title>
        <link>https://apjot.blog</link>
        <description>A public journal of thoughts</description>
        <language>en</language>
        ${rssItemsXml}
      </channel>
    </rss>`;

  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rssFeedXml, 'utf8');
}
