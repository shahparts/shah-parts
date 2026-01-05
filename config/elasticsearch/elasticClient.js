const { Client } = require('@elastic/elasticsearch');

const ES_HOST = process.env.ELASTIC_HOST || 'http://167.172.21.10:9200';

const client = new Client({
  node: ES_HOST
});

module.exports = client;