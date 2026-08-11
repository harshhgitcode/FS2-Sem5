export const saveUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};