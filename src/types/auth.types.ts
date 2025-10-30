// Authentication types

export enum AuthProvider {
  Email = 'email',
  Google = 'google',
  Apple = 'apple',
}

export interface User {
  id: string;
  email: string;
  name?: string;
  provider: AuthProvider;
  isPremium: boolean;
  createdAt: Date;
  profileImageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface SocialAuthResult {
  provider: AuthProvider;
  idToken: string;
  email?: string;
  name?: string;
}
