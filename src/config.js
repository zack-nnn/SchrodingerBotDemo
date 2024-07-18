const NODE_ENV = process.env.NODE_ENV;

const configMap = {
  test: {
    tgHomeUrl: "https://cat.schrodingerai.com/tg-home",
    websiteUrl: "https://schrodingerai.com",
  },
  production: {
    tgHomeUrl: "https://cat.schrodingernft.ai/tg-home",
    websiteUrl: "https://schrodingernft.ai",
  },
};

module.exports = configMap[NODE_ENV];
