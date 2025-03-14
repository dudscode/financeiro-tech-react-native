import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
<<<<<<< HEAD
    // PEGAR CONTEXTO DE NO GRUPO DE WHATS (na descrição do grupo)
=======
  apiKey: "AIzaSyCW6WhtZLhPRXT0U9iJcmPROneqBfPIGV8",
  authDomain: "fintech-react-native.firebaseapp.com",
  projectId: "fintech-react-native",
  storageBucket: "fintech-react-native.firebasestorage.app",
  messagingSenderId: "1002196146362",
  appId: "1:1002196146362:web:c477e235adb650bd55ca83",
>>>>>>> 9311436 (wip)
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export default db;
export { auth }