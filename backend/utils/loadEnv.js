require("dotenv").config();

const env = {
    backPort: process.env.BLOG_BACKEND_PORT,

    frontHost: process.env.BLOG_FRONTEND_HOST,
    frontPort: process.env.BLOG_FRONTEND_PORT,

    mongoHost: process.env.BLOG_MONGODB_HOST,
    mongoPort: process.env.BLOG_MONGODB_PORT,
    mongoDb: process.env.BLOG_MONGODB_DB,
    mongoUser: process.env.BLOG_MONGODB_USER,
    mongoPwd: process.env.BLOG_MONGODB_PASSWORD,
};

module.exports = env;
