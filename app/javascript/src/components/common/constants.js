import { Book, Edit, ListDetails } from "neetoicons";
import routes from "routes";

export const SIDE_BAR_ITEMS = [
  {
    icon: Book,
    slug: routes.blogs.index,
  },
  {
    icon: Edit,
    slug: routes.blogs.create,
  },
  {
    icon: ListDetails,
    slug: routes.categories.index,
  },
];

export const DEFAULT_AVATAR_URL =
  "https://plus.unsplash.com/premium_photo-1732757787074-0f95bf19cf73?q=80&w=754&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
