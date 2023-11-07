import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {

  const { params } = useParams();

  const posts = {
    "article1": {
      title: "My Awesome Article",
      content: "Content of the article goes here...",
    },
    "article2": {
      title: "Another Great Article",
      content: "More content goes here...",
    },
  };

  const post = posts[params];

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
