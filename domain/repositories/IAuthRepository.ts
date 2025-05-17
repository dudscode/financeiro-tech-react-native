import { User } from "../entities/User";
import { LoginRequest } from "../useCases/auth/LoginUseCase";
import { RegisterRequest } from "../useCases/auth/RegisterUseCase";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface IAuthRepository {
  getCurrentUser(): Promise<User | null>;
  login(credentials: LoginRequest): Promise<User>;
  register(credentials: RegisterRequest): Promise<User>;
  logout(): Promise<void>;
  updateEmail(newEmail: string, password: string): Promise<void>;
  updatePassword(currentPassword: string, newPassword: string): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}