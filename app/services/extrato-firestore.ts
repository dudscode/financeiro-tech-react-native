import { ItemPropsExtrato } from "@/components/utils/config";
import db from "../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, query, orderBy } from "firebase/firestore";

const addTransaction = async (transaction: ItemPropsExtrato) => {
  try {
    const docRef = await addDoc(collection(db, "extrato"), transaction);
    console.log("Transação adicionada com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
  }
};
const getTransactions = async (): Promise<ItemPropsExtrato[]> => {
  try {
    const q = query(collection(db, "extrato"), orderBy("data", "desc"));
    const querySnapshot = await getDocs(q);
    const transactions: ItemPropsExtrato[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        mes: data.mes,
        tipo: data.tipo,
        data: data.data,
        valor: data.valor,
      };
    });

    return transactions;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
};

const deleteTransaction = async (id: string) => {
  try {
    await deleteDoc(doc(db, "extrato", id));
    console.log("Transação excluída com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir transação:", error);
  }
};
const updateTransaction = async (id: string, updatedData: ItemPropsExtrato) => {
  try {
    const transactionRef = doc(db, 'extrato', id);
    await setDoc(transactionRef, updatedData, { merge: true });
    console.log(`Transação ${id} atualizada com sucesso!`);
  } catch (error) {
    console.error('Erro ao atualizar a transação:', error);
    throw error;
  }
};
const extratoFirestore = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};

export default extratoFirestore;