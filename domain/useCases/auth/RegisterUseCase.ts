import { User } from '../../entities/User';
import { IAuthRepository } from '../../repositories/IAuthRepository';

export interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

interface RegisterResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const user = await this.authRepository.register(request);

      return {
        user,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao registrar usuário: ${error.message}`);
      }
      throw new Error('Falha ao registrar usuário: Erro desconhecido');
    }
  }
}
