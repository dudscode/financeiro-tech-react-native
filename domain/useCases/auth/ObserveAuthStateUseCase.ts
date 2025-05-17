import { User } from '../../entities/User';
import { IAuthRepository } from '../../repositories/IAuthRepository';

type AuthStateCallback = (user: User | null) => void;

export class ObserveAuthStateUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  execute(callback: AuthStateCallback): () => void {
    return this.authRepository.onAuthStateChanged(callback);
  }
}