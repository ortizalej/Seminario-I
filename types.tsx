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
  id?: string;
  name: string;
  surname: string;
  phoneNumber: string;
  prefix: string;
  email: string;
  password: string;
  image?: string;
  remembered: boolean;
}

export interface Travel {
  id?: string;
  date: Date;
  originAddress: string;
  destinationAddress: string;
  status: "Cancelado" | "En Curso" | "Finalizado";
  amount: number;
  paidMethod: "Efectivo" | "Tarjeta  Crédito" | "Tarjeta Débito";
  cardNumber?: string;
  totalDistance?: number;
  enterprise: "Uber" | "Cabify";
}

export interface UberEstimateItemResponse {
  distance: number;
  duration: number;
  total: TotalResponse;
}

export interface CabifyEstimateResponse {
  data: CabifyEstimateItemResponse[];
}

export interface CabifyEstimateItemResponse {
  distance: number;
  duration: number;
  priceBase: PriceBaseCabifyResponse;
  product: ProductCabifyResponse;
  route: string[];
  supplements: any;
  total: TotalResponse;
}

export interface PriceBaseCabifyResponse {
  amount: number;
  currency: string;
}

export interface ProductCabifyResponse {
  description: DescriptionProductCabifyResponse;
  icon: string;
  id: string;
  name: NameCabifyResponse;
}

export interface DescriptionProductCabifyResponse {
  en: string;
  es: string;
  pt: string;
}

export interface NameCabifyResponse {
  ca: string;
  en: string;
  es: string;
  pt: string;
}

export interface TotalResponse {
  amount?: number;
  currency?: string;
}

// Constantes para Async Storage
export const USERLOGGED = "usserlogged";
