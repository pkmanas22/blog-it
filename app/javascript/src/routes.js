const routes = {
  root: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  posts: {
    index: "/posts",
    create: "/posts/create",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
  },
  categories: {
    index: "/categories",
  },
  myPosts: "/my-posts",
  fallback: "*",
};

export default routes;
