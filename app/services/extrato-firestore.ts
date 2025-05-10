import { ItemPropsExtrato } from "@/components/utils/config";
import db from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, query, orderBy, where, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import * as Linking from "expo-linking"; // para abrir no navegador
import { storage } from "@/app/firebase/config";


const addTransaction = async (transaction: ItemPropsExtrato) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    console.warn("Usuário não autenticado. Não é possível adicionar transação.");
    return;
  }

  try {
    const transactionWithUser = {
      ...transaction,
      userId: user.uid
    };

    const docRef = await addDoc(collection(db, "extrato"), transactionWithUser);
    console.log("Transação adicionada com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
  }
};

const getTransactions = async (): Promise<ItemPropsExtrato[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.warn("Usuário não autenticado.");
    return [];
  }

  try {
    const q = query(
      collection(db, "extrato"),
      where("userId", "==", user.uid), 
      orderBy("data", "desc")
    );

    const querySnapshot = await getDocs(q);
    const transactions: ItemPropsExtrato[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        mes: data.mes,
        tipo: data.tipo,
        data: data.data,
        valor: data.valor,
        imagePath: data.imagePath || null,
      };
    });

    return transactions;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
};


const deleteTransaction = async (id: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.warn("Usuário não autenticado. Não é possível excluir transação.");
    return;
  }

  try {
    const transactionRef = doc(db, "extrato", id);
    const transactionDoc = await getDoc(transactionRef);

    if (!transactionDoc.exists() || transactionDoc.data().userId !== user.uid) {
      console.warn("Transação não encontrada ou não pertence ao usuário.");
      return;
    }

    await deleteDoc(transactionRef);
    console.log("Transação excluída com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir transação:", error);
  }
};

const updateTransaction = async (id: string, updatedData: ItemPropsExtrato) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.warn("Usuário não autenticado. Não é possível atualizar transação.");
    return;
  }

  try {
    const transactionRef = doc(db, "extrato", id);
    const transactionDoc = await getDoc(transactionRef);

    if (!transactionDoc.exists() || transactionDoc.data().userId !== user.uid) {
      console.warn("Transação não encontrada ou não pertence ao usuário.");
      return;
    }

    const updatedTransaction = {
      ...updatedData,
      userId: user.uid,
    };

    await setDoc(transactionRef, updatedTransaction, { merge: true });
    console.log(`Transação ${id} atualizada com sucesso!`);
  } catch (error) {
    console.error("Erro ao atualizar a transação:", error);
    throw error;
  }
};

const downloadImage = async (imagePath: string) => {
  try {
    const storageRef = ref(storage, imagePath);
    const url = await getDownloadURL(storageRef);
    Linking.openURL(url);
  } catch (error) {
    console.error("Erro ao fazer download da imagem:", error);
  }
};
const extratoFirestore = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  downloadImage
};

export default extratoFirestore;