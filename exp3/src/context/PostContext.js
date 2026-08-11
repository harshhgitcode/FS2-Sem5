import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {

  // Load posts from localStorage
  const [posts, setPosts] = useState(() => {

    const savedPosts = localStorage.getItem("socialPosts");

    if (savedPosts) {
      return JSON.parse(savedPosts);
    }

    // Default demo posts
    return [
      {
        id: 1,
        title: "React Hooks Guide",
        content: "Understanding useState and useEffect.",
        platform: "LinkedIn",
        status: "Published",
        author: "editor",
        likes: 142,
        createdAt: new Date().toLocaleString()
      },
      {
        id: 2,
        title: "JWT Authentication",
        content: "How JWT secures APIs.",
        platform: "Instagram",
        status: "Draft",
        author: "admin",
        likes: 0,
        createdAt: new Date().toLocaleString()
      },
      {
        id: 3,
        title: "AI Trends 2026",
        content: "Top AI trends for developers.",
        platform: "Twitter",
        status: "Published",
        author: "editor",
        likes: 201,
        createdAt: new Date().toLocaleString()
      }
    ];

  });

  // Save whenever posts change
  useEffect(() => {

    localStorage.setItem(
      "socialPosts",
      JSON.stringify(posts)
    );

  }, [posts]);


  // CREATE POST
  const addPost = (postData) => {

    const newPost = {

      id: Date.now(),

      ...postData,

      likes: 0,

      createdAt: new Date().toLocaleString()

    };

    setPosts(prevPosts => [
      newPost,
      ...prevPosts
    ]);

  };


  // DELETE POST
  const deletePost = (id) => {

    setPosts(prevPosts =>
      prevPosts.filter(post => post.id !== id)
    );

  };


  // EDIT POST
  const editPost = (id, updatedData) => {

    setPosts(prevPosts =>
      prevPosts.map(post =>

        post.id === id
          ? {
              ...post,
              ...updatedData
            }
          : post

      )
    );

  };


  // LIKE POST
  const likePost = (id) => {

    setPosts(prevPosts =>

      prevPosts.map(post =>

        post.id === id
          ? {
              ...post,
              likes: post.likes + 1
            }
          : post

      )

    );

  };


  // PUBLISH POST
  const publishPost = (id) => {

    setPosts(prevPosts =>

      prevPosts.map(post =>

        post.id === id
          ? {
              ...post,
              status: "Published"
            }
          : post

      )

    );

  };


  // SAVE AS DRAFT
  const draftPost = (id) => {

    setPosts(prevPosts =>

      prevPosts.map(post =>

        post.id === id
          ? {
              ...post,
              status: "Draft"
            }
          : post

      )

    );

  };


  return (

    <PostContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        editPost,
        likePost,
        publishPost,
        draftPost
      }}
    >

      {children}

    </PostContext.Provider>

  );

}


// Custom hook
export function usePosts() {

  return useContext(PostContext);

}

export default PostContext;