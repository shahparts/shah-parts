const client = require('./elasticClient');

async function createProductIndex() {
  const index = 'products_v2';
  const exists = await client.indices.exists({ index });
  if (exists.body) {
    console.log(index, 'already exists');
    return;
  }

  const mapping = {
    "settings": {
      "analysis": {
        "filter": {
          "edge_ngram_filter": {
            "type": "edge_ngram",
            "min_gram": 2,
            "max_gram": 20
          }
        },
        "analyzer": {
          "edge_ngram_analyzer": {
            "tokenizer": "standard",
            "filter": ["lowercase", "edge_ngram_filter"]
          },
          "lowercase_analyzer": {
            "tokenizer": "standard",
            "filter": ["lowercase"]
          }
        }
      }
    },
    "mappings": {
      "properties": {
        "Title": {
          "type": "text",
          "analyzer": "lowercase_analyzer",
          "fields": {
            "autocomplete": {
              "type": "text",
              "analyzer": "edge_ngram_analyzer",
              "search_analyzer": "lowercase_analyzer"
            },
            "keyword": { "type": "keyword" }
          }
        }
      }
    }
  };
  await client.indices.create({ index, body: mapping });
  console.log('Index created:', index);
}

createProductIndex().catch(console.error);