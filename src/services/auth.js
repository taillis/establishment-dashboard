export const TOKEN_KEY = "@fortBrasilAuth-Token";
export const USER_DATA_KEY = "@fortBrasilData";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getData = () => JSON.parse(localStorage.getItem(USER_DATA_KEY));

export const setData = ({ _id, name, email }) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify({ _id, name, email }));
};
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = (callback) => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);

  if (callback && typeof callback === "function") callback();
};
