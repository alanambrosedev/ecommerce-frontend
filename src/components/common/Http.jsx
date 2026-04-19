export const apiUrl = "http://ecommerce-backend.test/api/";
export const adminToken = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  return adminInfo.token;
};
