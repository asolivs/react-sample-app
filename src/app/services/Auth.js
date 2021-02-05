export const TOKEN_KEY = "@DropBrowser";

export const getToken = async () => {
  try {
    const token = await localStorage.getItem("@DropBrowser");
    return token;
  } catch (e) {
    console.log(e);
  }
};

export const loginApi = async (token) => {
  try {
    await localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
