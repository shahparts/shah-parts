const { Client } = require('@elastic/elasticsearch');

const ES_HOST = process.env.ELASTIC_HOST || 'http://167.172.21.10:9200';

const client = new Client({
  node: ES_HOST,
  // auth: process.env.ELASTIC_USERNAME ? {
  //   username: process.env.ELASTIC_USERNAME,
  //   password: process.env.ELASTIC_PASSWORD
  // } : undefined,
  // tls options can be added if needed
});

module.exports = client;