const client = require('./elasticClient');

async function testConnection() {
  try {
    const info = await client.info();
    console.log('Connected to Elasticsearch');
    console.log(info.body);
  } catch (err) {
    console.error('Elasticsearch connection failed:', err);
  }
}

testConnection();
