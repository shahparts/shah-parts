const mongoose = require('mongoose');
const client = require('./elasticClient');
const Product = require('../../models/productModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shahparts:241180MujtabaHassan@cluster0.fc40i.mongodb.net/shah-parts?retryWrites=true&w=majority&appName=Cluster0';
const INDEX = 'products_v2';

async function bulkIndex() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const batchSize = 20000;
  let skip = 0;
  while (true) {
    const products = await Product.find().skip(skip).limit(batchSize).lean();
    if (!products || products.length === 0) break;

    const body = [];
    for (const p of products) {
      body.push({ index: { _index: INDEX, _id: p._id.toString() } });
      body.push({
        Title: p.Title
      });
    }

    const resp = await client.bulk({ refresh: true, body });
if (resp.errors) {
  console.error('Bulk index errors', resp.items.filter(i => i.index && i.index.error));
}
    skip += products.length;
    console.log('Indexed batch, count:', skip);
  }

  console.log('Indexing complete');
  process.exit(0);
}

bulkIndex().catch(err => { console.error(err); process.exit(1); });
