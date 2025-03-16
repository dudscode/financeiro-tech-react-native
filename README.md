![Expo](https://img.shields.io/badge/Expo-52.0.38-blue) ![React Native](https://img.shields.io/badge/React%20Native-0.76.7-blue)
![React](https://img.shields.io/badge/React-18-blue) ![Firebase](https://img.shields.io/badge/Firebase-11.4.0-blue)
![Node](https://img.shields.io/badge/Node-18.18-417e38)

## Descrição

O aplicativo **Financeiro-Tech React Native** foi desenvolvido para oferecer uma experiência moderna e intuitiva em dispositivos móveis, utilizando o ecossistema **React Native** com **Expo**. O projeto integra diversos recursos, como navegação avançada via **Expo Router**, formulários otimizados com **React Hook Form** e autenticação com **Firebase**. Além disso, são utilizadas bibliotecas modernas para garantir performance, responsividade e uma interface atraente.

## Requisitos

- [**Node.js**](https://nodejs.org/en) (versão 18.18 ou superior)
- [**Expo CLI**](https://docs.expo.dev/get-started/installation/)
- Um emulador Android ou iOS, ou um dispositivo físico com o aplicativo Expo Go instalado

## Configuração do Firebase

Antes de iniciar o projeto, crie um arquivo **.env** na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
EXPO_PUBLIC_API_KEY=
EXPO_PUBLIC_AUTH_DOMAIN=
EXPO_PUBLIC_PROJECT_ID=
EXPO_PUBLIC_STORAGE_BUCKET=
EXPO_PUBLIC_MESSAGING_SENDER_ID=
EXPO_PUBLIC_WEB_CLIENT_ID=
```

Preencha esses campos com as credenciais do seu projeto Firebase.

## Como executar o projeto

### 1. Executar localmente

1. **Instalar as dependências:**  

   ```sh
   npm i
   ```

2. **Iniciar o projeto:**  
   Utilize um dos seguintes comandos, conforme o ambiente desejado:
   - Para Android:  

     ```sh
     npm run android
     ```

   - Para iOS:  

     ```sh
     npm run ios
     ```

   - Para Web (via Expo):  

     ```sh
     npm run web
     ```

   - Para iniciar o servidor de desenvolvimento com cache limpo:  

     ```sh
     npm start
     ```

### 2. Executar os testes e linting

- **Testes:**  

  ```sh
  npm run test
  ```

- **Linting:**  

  ```sh
  npm run lint
  ```

- **Formatação do código:**

  ```sh
  npm run format
  ```

## Scripts Principais

- **`npm i`**: Instala as dependências do projeto.
- **`npm start`**: Inicia o Expo com limpeza de cache.
- **`npm run android`**: Executa o app em um dispositivo/emulador Android.
- **`npm run ios`**: Executa o app em um dispositivo/emulador iOS.
- **`npm run web`**: Executa o app no navegador.
- **`npm run test`**: Executa os testes com Jest.
- **`npm run lint`**: Verifica o código com ESLint.
- **`npm run format`**: Formata o código utilizando Prettier.
- **`npm run reset-project`**: Reseta o estado do projeto (útil para limpeza de caches e configurações).

## Tecnologias Utilizadas

- [**Expo**](https://expo.dev/) (~52.0.38): Framework para desenvolvimento de aplicativos React Native.
- [**React Native**](https://reactnative.dev/) (0.76.7): Framework para criação de aplicativos móveis.
- [**React**](https://reactjs.org/) (18.3.1): Biblioteca para construção de interfaces de usuário.
- [**Expo Router**](https://expo.github.io/router/): Gerenciamento de navegação.
- [**Firebase**](https://firebase.google.com/) (11.4.0): Autenticação e banco de dados em tempo real.
- [**React Hook Form**](https://react-hook-form.com/) (7.54.2): Gerenciamento eficiente de formulários.
- [**Styled Components**](https://styled-components.com/) (6.1.15): Estilização de componentes.
- Outras bibliotecas: Axios, Yup, e diversas bibliotecas do ecossistema Expo para funcionalidades como fontes, ícones, haptics e mais.

---
