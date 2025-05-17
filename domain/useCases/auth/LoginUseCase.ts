import { User } from '../../entities/User';
import { IAuthRepository, AuthCredentials } from '../../repositories/IAuthRepository';

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
}

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}
  
  async execute(request: LoginRequest): Promise<LoginResponse> {
    try {
      const credential: AuthCredentials = {
        email: request.email,
        password: request.password,
      };

      const user = await this.authRepository.login(credential);
      return { user };
    } catch (error) {
      throw new Error(`Falha ao realizar login: ${error}`);
    }
  }
}
