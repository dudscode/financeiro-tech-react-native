import { ExtratoItemProps } from '@/domain/entities/Extrato';
import db, { auth, storage } from './config';
import { IExtratoRepository } from '@/domain/repositories/IExtratoRepository';
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { DocumentPickerAsset } from 'expo-document-picker';

export class ExtratoFirebaseRepository implements IExtratoRepository {
  private readonly extratoCollection = collection(db, 'extrato');

  async createTransaction(transaction: ExtratoItemProps): Promise<void> {
    const user = this.getCurrentUser();

    if (!user) {
      console.warn('Usuário não autenticado. Não é possível adicionar transação.');
      return;
    }
    try {
      const transactionWithUser = {
        ...transaction,
        userId: user.uid,
      };
      const docRef = await addDoc(this.extratoCollection, transactionWithUser);
      console.log('Transação adicionada com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  }

  async getTransactions(): Promise<ExtratoItemProps[]> {
    const user = this.getCurrentUser();

    if (!user) {
      console.warn('Usuário não autenticado.');
      return [];
    }

    try {
      const q = query(
        this.extratoCollection,
        where('userId', '==', user.uid),
        orderBy('fullDate', 'desc')
      );

      const querySnapshot = await getDocs(q);

      const transactions: ExtratoItemProps[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          mes: data.mes,
          tipo: data.tipo,
          data: data.data,
          fullDate: data.fullDate ?? null,
          valor: data.valor,
          imagePath: data.imagePath ?? null,
        };
      });
      return transactions;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      return [];
    }
  }

  async updateTransaction(id: string, transaction: ExtratoItemProps): Promise<void> {
    const user = this.getCurrentUser();

    if (!user) {
      console.warn('Usuário não autenticado. Não é possível atualizar transação.');
      return;
    }

    try {
      const transactionRef = doc(this.extratoCollection, id);
      const transactionDoc = await getDoc(transactionRef);

      if (!transactionDoc.exists() || transactionDoc.data().userId !== user.uid) {
        console.warn('Transação não encontrada ou não pertence ao usuário.');
        return;
      }

      const updatedTransaction = {
        ...transaction,
        userId: user.uid,
      };
      await setDoc(transactionRef, updatedTransaction, { merge: true });
    } catch (error) {
      console.error('Erro ao atualizar a transação:', error);
      throw error;
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    const user = this.getCurrentUser();

    if (!user) {
      console.warn('Usuário não autenticado. Não é possível excluir transação.');
      return;
    }
    try {
      const transactionRef = doc(db, 'extrato', id);
      const transactionDoc = await getDoc(transactionRef);

      if (!transactionDoc.exists() || transactionDoc.data().userId !== user.uid) {
        console.warn('Transação não encontrada ou não pertence ao usuário.');
        return;
      }

      await deleteDoc(transactionRef);
      console.log('Transação excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    }
  }

  async uploadFile(file: DocumentPickerAsset): Promise<string | null> {
    const user = this.getCurrentUser();

    if (!user) {
      console.warn('Usuário não autenticado. Não é possível fazer upload.');
      return null;
    }

    try {
      const response = await fetch(file.uri);
      const blob = await response.blob();

      const storagePath = `images/users/${user.uid}/${new Date().getTime()}.${file.mimeType?.replace('image/', '')}`;
      const storageRef = ref(storage, storagePath);

      await uploadBytes(storageRef, blob);
      //todo testar funcionamento do upload
      console.log('Arquivo enviado com sucesso!');
      return storagePath;
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      return null;
    }
  }

  async downloadImage(imagePath: string): Promise<string | null> {
    const user = this.getCurrentUser();

    if (!user) {
      console.warn('Usuário não autenticado. Não é possível baixar a imagem.');
      return null;
    }
    try {
      const storageRef = ref(storage, imagePath);
      const url = await getDownloadURL(storageRef);
      return url;
      //Todo testar funcionamento do download
    } catch (error) {
      console.error('Erro ao fazer download da imagem:', error);
      return null;
    }
  }

  private getCurrentUser() {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return user;
  }
}
