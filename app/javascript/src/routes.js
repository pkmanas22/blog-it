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
  },
  categories: {
    index: "/categories",
  },
  fallback: "*",
};

export default routes;
