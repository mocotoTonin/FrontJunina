import { useMutation } from '@tanstack/react-query';

interface RegisterData {
  username: string;
  email: string;
  cpf: string;
  password: string;
}

interface User {
  username: string; 
  email: string;
  cpf: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData): Promise<User> => {
      const res = await fetch('http://localhost:8081/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Erro no cadastro');
      }

      return res.json();
    }
  });
};
