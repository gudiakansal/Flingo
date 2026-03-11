import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "flingo-food-delivery.firebaseapp.com",
  projectId: "flingo-food-delivery",
  storageBucket: "flingo-food-delivery.firebasestorage.app",
  messagingSenderId: "687286969116",
  appId: "1:687286969116:web:48194b263332207b3c90d9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth  };
