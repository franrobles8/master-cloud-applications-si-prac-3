module.exports = {
  database: {
    database: process.env.DATABASE_NAME || "eoloplantsDB",
    username: process.env.USERNAME || "root",
    password: process.env.PASSWORD || "password",
    host: process.env.DATABASE_SERVER || "localhost",
  },
};
