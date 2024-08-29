const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');

const links = [
  { url: 'https://shahparts.com/', changefreq: 'monthly', priority: 1.0 },
  { url: 'https://shahparts.com/shop/', changefreq: 'monthly', priority: 0.9 },
  { url: 'https://shahparts.com/brands/', changefreq: 'monthly', priority: 0.9 },
  { url: 'https://shahparts.com/categories/', changefreq: 'monthly', priority: 0.9 },
  { url: 'https://shahparts.com/about-us/', changefreq: 'monthly', priority: 0.8 },
  { url: 'https://shahparts.com/contact-us/', changefreq: 'monthly', priority: 0.8 },
  { url: 'https://shahparts.com/terms-and-conditions/', changefreq: 'monthly', priority: 0.8 },
  { url: 'https://shahparts.com/user/profile/', changefreq: 'monthly', priority: 0.7 },
  { url: 'https://shahparts.com/cart/', changefreq: 'monthly', priority: 0.7 },
  // Add more URLs here
];

const stream = new SitemapStream({ hostname: 'https://www.shahparts.com' });

const writableStream = createWriteStream('./public/sitemap.xml');
streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  writableStream.write(data.toString())
);