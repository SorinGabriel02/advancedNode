const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
const clientHGetAsync = util.promisify(client.hget).bind(client);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) return exec.apply(this, arguments);
  // unique key for redis
  const key = JSON.stringify({
    ...this.getFilter(),
    collection: this.mongooseCollection.name,
  });
  // see if we have a value for key in redis
  const cacheValue = await clientHGetAsync(this.hashKey, key);
  // if yes, return that value
  if (cacheValue) {
    // exec expects us to return mongoose model instances
    // turn the cacheValue string back into a mongoose model document
    // or an array of mongoose models
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  // else issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result));
  // set expiration in seconds
  client.expire(this.hashKey, 15);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
