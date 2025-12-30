const axios = require('axios');
const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

async function generateSitemaps() {
  let page = 1;
  let hasMoreProducts = true;

  while (hasMoreProducts) {
    const response = await axios.get('https://shahparts.com/api/products/get/product-ids/', {
      params: {
        page,
        limit: 1000
      }
    });

    const productIds = response.data;
    if (productIds.length > 0) {
      const sitemap = new SitemapStream({ hostname: 'https://shahparts.com' });
      const writeStream = fs.createWriteStream(`./sitemap${page}.xml`);

      sitemap.pipe(writeStream);

      productIds.forEach(({ _id }) => {
        sitemap.write({ url: `/product/${_id}`, changefreq: 'daily', priority: 0.8 });
      });

      sitemap.end();
      await streamToPromise(sitemap); // Wait for the sitemap stream to finish

      console.log(`Generated sitemap for page ${page}`);
      page += 1;
    } else {
      hasMoreProducts = false;
    }
  }
}

generateSitemaps().catch(console.error);
