const fs = require('fs');

const totalSitemaps = 2355;
const hostname = 'https://shahparts.com';
const sitemapIndexPath = 'C:/Users/admin/Downloads/new sitemaps/sitemapindex.xml';

const sitemapEntries = Array.from({ length: totalSitemaps }, (_, i) => `
  <sitemap>
    <loc>${hostname}/sitemap${i + 1}.xml</loc>
  </sitemap>`).join('');

const sitemapIndexContent = `
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapEntries}
</sitemapindex>
`;

fs.writeFileSync(sitemapIndexPath, sitemapIndexContent.trim(), 'utf8');

console.log(`Generated sitemap index for ${totalSitemaps} sitemaps at ${sitemapIndexPath}`);
