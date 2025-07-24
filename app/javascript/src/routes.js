const routes = {
  root: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  blogs: {
    index: "/blogs",
    create: "/blogs/create",
    show: "/blogs/:slug/show",
    edit: "/blogs/:slug/edit",
  },
  categories: {
    index: "/categories",
  },
  myBlogs: "/my-blogs",
  fallback: "*",
};

export default routes;
