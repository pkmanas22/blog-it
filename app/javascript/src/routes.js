const routes = {
  root: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  blogs: {
    index: "/blogs",
    create: "/blogs/create",
    show: "/blogs/:slug",
  },
  categories: {
    index: "/categories",
  },
  fallback: "*",
};

export default routes;
