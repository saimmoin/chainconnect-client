/** @format */

// src/Posts.js
import React from "react";

// Sample data for the posts
const postsData = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/300",
    likes: 23,
    comments: 5,
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/300",
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/300",
    likes: 8,
    comments: 2,
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/300",
    likes: 12,
    comments: 3,
  },
  {
    id: 5,
    avatar: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/300",
    likes: 19,
    comments: 7,
  },
  {
    id: 6,
    avatar: "https://via.placeholder.com/50",
    image: "https://via.placeholder.com/300",
    likes: 32,
    comments: 15,
  },
];

const Posts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {postsData.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg mb-4 max-w-xs mx-auto">
          {" "}
          {/* Added mx-auto for centering */}
          <div className="flex items-center p-3 border-b">
            <img src={post.avatar} alt="Avatar" className="rounded-full w-10 h-10 mr-3" />
          </div>
          <img src={post.image} alt="Post" className="w-full h-auto" />
          <div className="flex justify-between items-center p-2 border-t">
            <div className="flex items-center text-gray-700 text-sm">
              <span role="img" aria-label="heart" className="mr-1">
                ❤️
              </span>
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center text-gray-700 text-sm">
              <span role="img" aria-label="comment" className="mr-1">
                💬
              </span>
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
