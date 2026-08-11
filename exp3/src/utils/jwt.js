// src/utils/jwt.js

export const createToken = (user) => {
  const loginTime = new Date().toISOString();

  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 2);

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    loginTime,
    expiry: expiryDate.toISOString(),
  };

  // Simulated JWT for this frontend practical
  const token = btoa(JSON.stringify(payload));

  return {
    token,
    loginTime,
    expiry: expiryDate.toISOString(),
  };
};

export const decodeToken = (token) => {
  try {
    if (!token) return null;

    return JSON.parse(atob(token));
  } catch (error) {
    return null;
  }
};