import axios from "axios";

// Backend Base URL
const BASE_URL = "https://jkbcompany.onrender.com";

// ===============================
// LOGIN
// ===============================
export const createLogin = async (loginData) => {
  return await axios.post(
    `${BASE_URL}/login`,
    loginData
  );
};

// ===============================
// FORGOT PASSWORD
// ===============================
export const resetPassword = async (data) => {
  return await axios.put(`${BASE_URL}/reset-password`, data);
};
  
