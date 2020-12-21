module.exports = {
  database: {
    database: process.env.DATABASE_NAME || "eoloplantDB",
    username: process.env.USERNAME || "root",
    password: process.env.PASSWORD || "password",
    host: process.env.DATABASE_SERVER || "localhost",
  },
};
