const url =
    import.meta.env.VITE_API_PROTOCOL +
    "://" +
    import.meta.env.VITE_API_HOST +
    ":" +
    import.meta.env.VITE_API_PORT;

export default url;

// import dotenv from 'dotenv'
// dotenv.config();
// const env = {
//     backHost: process.env.BLOG_BACKEND_HOST,
//     backPort: process.env.BLOG_BACKEND_PORT,
// };
