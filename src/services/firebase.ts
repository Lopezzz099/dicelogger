import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  projectId: "logoflegends-19383",
  appId: "1:487764884661:web:1cc8e754cc2f02de7592fc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
