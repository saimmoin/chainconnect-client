/** @format */

import React from "react";
import { useParams, useLocation } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const sampleComments = [
    { id: 1, user: "User A", text: "Great post! Really enjoyed this." },
    { id: 2, user: "User B", text: "Awesome content, keep it up!" },
    { id: 3, user: "User C", text: "This was really helpful, thank you!" },
  ];

  const timelineEvents = [
    {
      from: "User A",
      to: "User B",
      message: "Mentioned in a comment",
      fromAvatar: "https://via.placeholder.com/50",
      toAvatar: "https://via.placeholder.com/50",
    },
    {
      from: "User B",
      to: "User C",
      message: "Replied to a comment",
      fromAvatar: "https://via.placeholder.com/50",
      toAvatar: "https://via.placeholder.com/50",
    },
    {
      from: "User C",
      to: "User A",
      message: "Shared post link",
      fromAvatar: "https://via.placeholder.com/50",
      toAvatar: "https://via.placeholder.com/50",
    },
    // Add more interactions as needed
  ];

  const post = state?.post;

  if (!post) {
    return <div className="p-4">No post data available. Please go back and select a post.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-14 ">
      <div className="bg-white rounded-2xl flex flex-col items-center m-10 p-10 shadow-xl">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6" style={{ boxShadow: "-1px 1px 8px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center mb-4">
            <img src={post.avatar} alt="Avatar" className="rounded-full w-12 h-12 mr-3" />
            <h2 className="text-xl font-semibold">Post by User {post.id}</h2>
          </div>
          <img src={post.image} alt="Post" className="w-full h-auto mb-4" />
          <div className="flex justify-between items-center text-gray-700 mb-4">
            <div className="flex items-center text-sm">
              <span role="img" aria-label="heart" className="mr-1">
                ❤️
              </span>
              <span>{post.likes} Likes</span>
            </div>
            <div className="flex items-center text-sm">
              <span role="img" aria-label="comment" className="mr-1">
                💬
              </span>
              <span>{post.comments} Comments</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {sampleComments.length > 0 ? (
              <ul className="space-y-3">
                {sampleComments.map((comment) => (
                  <li key={comment.id} className="border-b pb-2">
                    <p className="font-semibold text-gray-800">{comment.user}</p>
                    <p className="text-gray-600">{comment.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No comments available.</p>
            )}
          </div>

          {/* Timeline Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Timeline</h3>
            <div className="overflow-x-auto">
              <ul className="flex space-x-6">
                {timelineEvents.map((event, index) => (
                  <li key={index} className="min-w-[250px] bg-gray-100 p-3 rounded-lg shadow-sm flex items-center space-x-3">
                    <img src={event.fromAvatar} alt={`${event.from} Avatar`} className="w-8 h-8 rounded-full" />
                    <p className="text-sm font-medium text-gray-800">{`${event.from} ➔ ${event.to}`}</p>
                    <img src={event.toAvatar} alt={`${event.to} Avatar`} className="w-8 h-8 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
