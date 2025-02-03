import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://digital-library-system-2.onrender.com", // Add your backend URL here
  headers: {
    "Content-Type": "application/json", // Optionally set the default Content-Type
  },
});

export const apiConnector = (method, url, body, header, params) => {
  return axiosInstance({
    method: method, // e.g., 'POST', 'GET', etc.
    url: url, // URL relative to baseURL
    data: body ? body : null, // Send data if available
    headers: header ? header : null, // Additional headers if any
    params: params ? params : null, // Query params if needed
  });
};
