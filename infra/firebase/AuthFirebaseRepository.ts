import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { User } from '../../domain/entities/User';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import db, { auth } from './config';
import { LoginRequest } from '@/domain/useCases/auth/LoginUseCase';
import { RegisterRequest } from '@/domain/useCases/auth/RegisterUseCase';
import { doc, setDoc } from 'firebase/firestore';

export class AuthFirebaseRepository implements IAuthRepository {
  private readonly auth = auth;

  // Função auxiliar para mapear um usuário Firebase para nosso domínio
  private mapFirebaseUserToDomainUser(firebaseUser: FirebaseUser | null): User | null {
    if (!firebaseUser) return null;

    return new User({
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName ?? undefined,
      emailVerified: firebaseUser.emailVerified,
      phoneNumber: firebaseUser.phoneNumber ?? undefined,
      photoURL: firebaseUser.photoURL ?? undefined,
    });
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = this.auth.currentUser;
    return this.mapFirebaseUserToDomainUser(firebaseUser);
  }

  async login(credentials: LoginRequest): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      const domainUser = this.mapFirebaseUserToDomainUser(userCredential.user);

      if (!domainUser) {
        throw new Error('Falha ao obter dados do usuário após login');
      }

      return domainUser;
    } catch (error: any) {
      this.handleFirebaseAuthError(error);
      throw error;
    }
  }

  async register(registerData: RegisterRequest): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        registerData.email,
        registerData.password
      );

      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: registerData.displayName ?? null,
          userId: user.uid,
          emailVerified: user.emailVerified,
        });
      }

      const domainUser = this.mapFirebaseUserToDomainUser(userCredential.user);

      if (!domainUser) {
        throw new Error('Falha ao obter dados do usuário após registro');
      }

      return domainUser;
    } catch (error: any) {
      this.handleFirebaseAuthError(error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      this.handleFirebaseAuthError(error);
      throw error;
    }
  }

  async updateEmail(newEmail: string, password: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user?.email) {
        throw new Error('Nenhum usuário autenticado ou email inválido');
      }

      await this.reauthenticate({ email: user.email, password });
      await firebaseUpdateEmail(user, newEmail);
    } catch (error: any) {
      this.handleFirebaseAuthError(error);
      throw error;
    }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user?.email) {
        throw new Error('Nenhum usuário autenticado ou email inválido');
      }

      await this.reauthenticate({ email: user.email, password: currentPassword });
      await firebaseUpdatePassword(user, newPassword);
    } catch (error: any) {
      this.handleFirebaseAuthError(error);
      throw error;
    }
  }

  async reauthenticate(credentials: LoginRequest): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error('Nenhum usuário autenticado');
      }

      const authCredential = EmailAuthProvider.credential(credentials.email, credentials.password);

      await reauthenticateWithCredential(user, authCredential);
    } catch (error: any) {
      this.handleFirebaseAuthError(error);
      throw error;
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseOnAuthStateChanged(this.auth, firebaseUser => {
      if (firebaseUser) {

      const domainUser = this.mapFirebaseUserToDomainUser(firebaseUser);
      callback(domainUser);
    } else {
      callback(null);
    }
    });
  }

  private handleFirebaseAuthError(error: any): void {
    const errorCode = error.code ?? '';
    let errorMessage = 'Ocorreu um erro durante a operação de autenticação';

    switch (errorCode) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este email já está sendo utilizado por outra conta.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Esta conta foi desativada.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Senha incorreta.';
        break;
      case 'auth/weak-password':
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Muitas tentativas consecutivas. Tente novamente mais tarde.';
        break;
      case 'auth/requires-recent-login':
        errorMessage =
          'Esta operação é sensível e requer autenticação recente. Faça login novamente antes de tentar novamente.';
        break;
      case 'auth/invalid-action-code':
        errorMessage =
          'O código de ação é inválido. Isso pode acontecer se o código expirou ou já foi usado.';
        break;
    }

    console.error(`[Auth Error] ${errorCode}: ${errorMessage}`);
    error.message = errorMessage;
  }
}
