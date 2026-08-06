// Simulated JWT

export const generateToken = (user) => {

  const tokenData = {
    username: user.username,
    role: user.role,
    loginTime: new Date().toLocaleString(),
    expiry: "1 Hour",
    token: btoa(
      user.username +
      ":" +
      user.role +
      ":" +
      Date.now()
    )
  };

  return tokenData;
};

export const decodeToken = (token) => {
  try {
    return atob(token);
  } catch {
    return "Invalid Token";
  }
};