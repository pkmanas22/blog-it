const routes = {
  root: "/",
  blogs: {
    index: "/blogs",
    create: "/blogs/create",
    show: "/blogs/:slug",
  },
  categories: {
    index: "/categories",
  },
};

export default routes;
