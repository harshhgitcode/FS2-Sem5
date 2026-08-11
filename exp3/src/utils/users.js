const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "Administrator"
  },
  {
    id: 2,
    username: "editor",
    password: "editor123",
    role: "Editor",
    name: "Content Editor"
  },
  {
    id: 3,
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
    name: "Content Viewer"
  }
];

// Export both ways so existing files work
export { users };
export default users;