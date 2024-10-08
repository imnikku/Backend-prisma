import radis from "express-redis-cache";
const radisCache = radis({
  host: process.env.RADIS_URL,
  port: 6379,
  prefix: "backend",
  expire: 60 * 60,
});

export default radisCache;
