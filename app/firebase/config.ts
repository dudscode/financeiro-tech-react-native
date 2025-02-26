
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  // PEGAR CONTEXTO DE NO GRUPO DE WHATS (na descrição do grupo)
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db ;