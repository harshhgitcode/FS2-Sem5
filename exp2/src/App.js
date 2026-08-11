import React, { useMemo } from "react";

import AddPost from "./components/AddPost";
import PlatformList from "./components/PlatformList";
import PostList from "./components/PostList";
import FilteredPosts from "./components/FilteredPosts";

function App() {

  const heading = useMemo(() => {
    return "Redux Toolkit Post Manager";
  }, []);

  return (
    <div className="container">

      <h1>{heading}</h1>

      <AddPost />

      <PlatformList />

      <PostList />

      <FilteredPosts />

    </div>
  );
}

export default App;