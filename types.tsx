/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type TabOneParamList = {
  WelcomeScreen: undefined;
};

export type TabTwoParamList = {
  LoginScreen: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Menu: undefined;
  Home: undefined;
  Travels: undefined;
  User: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export interface ServiceResult<T> {
  msg: T;
  isSuccess: boolean;
}

export interface User {
  name: string;
  surname: string;
  phoneNumber: string;
  prefix: string;
  email: string;
  password: string;
  image?: string;
}

// Constantes para Async Storage
export const USERLOGGED = "usserlogged";
