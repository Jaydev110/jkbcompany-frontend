import axios from "axios";

// =====================================
// BACKEND BASE URL
// =====================================

const BASE_URL = "https://jkbcompany.onrender.com";


// =====================================
// LOGIN
// =====================================

export const createLogin = async (loginData) => {
  return await axios.post(
    `${BASE_URL}/login`,
    loginData
  );
};


// =====================================
// FORGOT / RESET PASSWORD
// =====================================

export const resetPassword = async (data) => {
  return await axios.put(
    `${BASE_URL}/reset-password`,
    data
  );
};


// =====================================
// CONTACT FORM
// =====================================

export const createContact = async (contactData) => {
  return await axios.post(
    `${BASE_URL}/create`,
    contactData
  );
};