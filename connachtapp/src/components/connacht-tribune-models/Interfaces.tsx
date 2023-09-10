export interface ISocialLogin {
  email: string;
  firstName: string;
  lastName: string;
  auth: {provider: 'fb' | 'gmail' | 'email'; providerKey: string};
}

export interface ServerRes<T> {
  error?: {code?: number; message?: string};
  data?: T;
}
