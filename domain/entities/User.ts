export interface UserProps {
    id: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    phoneNumber?: string;
    photoURL?: string;
  }
  
  export class User {
    private readonly props: UserProps;
  
    constructor(props: UserProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get email(): string {
      return this.props.email;
    }
  
    get displayName(): string | undefined {
      return this.props.displayName;
    }
  
    get emailVerified(): boolean {
      return this.props.emailVerified;
    }
  
    get phoneNumber(): string | undefined {
      return this.props.phoneNumber;
    }
  
    get photoURL(): string | undefined {
      return this.props.photoURL;
    }
  
    public isEmailVerified(): boolean {
      return this.props.emailVerified;
    }
  
    // Métodos de domínio podem ser adicionados aqui
  }