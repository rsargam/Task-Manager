// import { toast } from 'react-toastify';

// export const notify = (message, type) => {
//     toast[type](message);
// }

// export const API_URL='http://localhost:8080';




// export const API_URL = "http://localhost:8080"; // ✅ Backend URL

// // Optional toast utility
// export const notify = (message, type) => {
//   console.log(`${type.toUpperCase()}: ${message}`);
// };


// frontend/src/utils.js
import { toast } from "react-toastify";

export const API_URL = "http://localhost:8080"; // ✅ Backend URL

// ✅ Toast notification helper
export const notify = (message, type) => {
  if (type === "success") {
    toast.success(message, { position: "top-right", autoClose: 3000 });
  } else if (type === "error") {
    toast.error(message, { position: "top-right", autoClose: 3000 });
  } else {
    toast.info(message, { position: "top-right", autoClose: 3000 });
  }
};
