const axios = require('axios');
const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

const hostname = 'https://shahparts.com'; // Replace with your actual hostname
const apiEndpoint = 'https://shahparts.com/api/products/get/product-ids/'; // Replace with your actual API endpoint

async function generateSitemaps() {
  let page = 2356;
  let hasMoreProducts = true;
  const sitemapFiles = [];

  while (hasMoreProducts) {
    const response = await axios.get(apiEndpoint, {
      params: {
        page,
        limit: 1000
      }
    });

    const productIds = response.data;
    if (productIds.length > 0) {
      const sitemap = new SitemapStream({ hostname });
      const sitemapPath = `C:/Users/admin/Downloads/new sitemaps/sitemap${page}.xml`;
      const writeStream = fs.createWriteStream(sitemapPath);

      sitemap.pipe(writeStream);

      productIds.forEach(({ _id }) => {
        sitemap.write({ url: `/product/${_id}`, changefreq: 'never', priority: 1 });
      });

      sitemap.end();
      await streamToPromise(sitemap); // Wait for the sitemap stream to finish

      sitemapFiles.push(sitemapPath);
      console.log(`Generated sitemap for page ${page}`);
      page += 1;
    } else {
      hasMoreProducts = false;
    }
  }
}

generateSitemaps().catch(console.error);
