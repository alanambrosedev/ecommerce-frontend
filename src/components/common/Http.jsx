export const apiUrl = "http://127.0.0.1:8000/api/";
export const adminToken = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  return adminInfo ? adminInfo.token : "";
};
export const userToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? userInfo.token : "";
};

export const STRIPE_PUBLIC_KEY =
  "pk_test_51U9S9sSqikeVCJSL2euKn9q1RgqoNIicJ0jPxfu1kUF6QRETLbeb8k1sI6ucgnAjycI5mJbG9qLeOct5ZCpcXoAV00BRZmd8Kn";
