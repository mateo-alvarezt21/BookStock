import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDjr3ab8_H8-1zs6p9rTnPWGs7Ia1NsE-4",
  authDomain: "reactfirebase-cesde.firebaseapp.com",
  projectId: "reactfirebase-cesde",
  storageBucket: "reactfirebase-cesde.appspot.com",
  messagingSenderId: "289493260457",
  appId: "1:289493260457:web:f563b983a3efcf2ed1b1b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase authentication
export const auth = getAuth(app);