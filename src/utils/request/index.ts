import axios from "axios";
import { message } from "antd";

const HTTP = axios.create({
  baseURL: "/",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to safely extract and sanitize error messages
const getSafeErrorMessage = (error: any): string => {
  if (!error?.response?.data) {
    return "网络错误，请稍后重试";
  }
  
  const message = error.response.data.message || "服务器错误";
  // Basic sanitization to prevent XSS
  return String(message).replace(/<[^>]*>/g, '').substring(0, 200);
};

HTTP.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    const safeMessage = getSafeErrorMessage(error);
    message.error(safeMessage);
    
    // Safer authentication check with proper error handling
    if (error?.response?.status === 401 || error?.response?.data?.code === "11401") {
      // Use window.location.href for safer navigation
      window.location.href = "/ui/login";
    }
    
    // Return the original error instead of throwing a generic one
    return Promise.reject(error);
  }
);

HTTP.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

export { HTTP as request };
