import { createSelector } from "@reduxjs/toolkit";

export const selectPosts = (state) => state.posts.posts;

export const selectLinkedInPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.platform === "LinkedIn")
);

export const totalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);