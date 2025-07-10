import React from "react";

import Card from "./Card";

const List = () => {
  const posts = [
    {
      id: 1,
      title: "My first post",
      description:
        "Welcome tao my first blog Welcome to my first blog Welcome to my first blog Welcome to my first blog Welcome to my first blog Welcome to my first blog Welcome to my first blog Welcome to my first blog ",
      upvotes: 0,
      downvotes: 0,
      is_bloggable: false,
      created_at: "2025-07-10T09:07:32.558Z",
      updated_at: "2025-07-10T09:07:32.558Z",
    },
    {
      id: 2,
      title: "Another  post",
      description:
        "Welcome Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus voluptate ipsam illo ea animi aperiam tenetur architecto quos eveniet, dolores minima eos aliquam qui explicabo deserunt nisi dolorum libero alias tempore? Harum eos ex reiciendis debitis, at, velit voluptatibus aspernatur, tenetur similique itaque id? Aliquid voluptate hic cum blanditiis inventore ut qui nam cupiditate exercitationem voluptates laudantium ullam suscipit, quia doloremque officiis voluptas obcaecati odio debitis tenetur soluta! Doloribus est unde odio laboriosam enim praesentium totam nisi a tempora! Natus quasi facilis quos debitis mollitia nihil ut nisi enim voluptatem. Temporibus ex dolor modi iure laboriosam perferendis accusamus eum repudiandae?to my first blog",
      upvotes: 0,
      downvotes: 0,
      is_bloggable: false,
      created_at: "2025-07-10T09:19:16.541Z",
      updated_at: "2025-07-10T09:19:16.541Z",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <Card key={post.id} {...post} />
      ))}
    </div>
  );
};

export default List;
