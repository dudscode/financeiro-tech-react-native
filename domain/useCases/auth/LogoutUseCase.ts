import { IAuthRepository } from '../../repositories/IAuthRepository';

export class LogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    try {
      await this.authRepository.logout();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao realizar logout: ${error.message}`);
      }
      throw new Error('Falha ao realizar logout: Erro desconhecido');
    }
  }
}