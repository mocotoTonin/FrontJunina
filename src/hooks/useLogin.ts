import { useMutation } from '@tanstack/react-query';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  cpf: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData): Promise<User> => {
      const res = await fetch('http://localhost:8081/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Erro no login');
      }

      const result: LoginResponse = await res.json();

      // Armazena o token no localStorage (ou sessionStorage)
      localStorage.setItem('token', result.token);

      // Retorna apenas os dados do usuário
      return result.user;
    }
  });
};