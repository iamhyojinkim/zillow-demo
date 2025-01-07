import { initializeApp } from "firebase/app";

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyAi5Cigg5JijUlETPNx2aI0KPNiX0lv-7g",
  authDomain: "zillow-56b74.firebaseapp.com",
  projectId: "zillow-56b74",
  storageBucket: "zillow-56b74.firebasestorage.app",
  messagingSenderId: "607509219439",
  appId: "1:607509219439:web:cf92948c16516f2c0da59a",
  measurementId: "G-9M23Z15VV1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log(app);

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  signOut(auth).then(() => {
    return null;
  });
}

export function onAuthStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
