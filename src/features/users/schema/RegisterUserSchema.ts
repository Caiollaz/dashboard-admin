import { z } from 'zod';

export const checkPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 20; // Tamanho mínimo
  if (/[a-z]/.test(password)) strength += 20; // Letras minúsculas
  if (/[A-Z]/.test(password)) strength += 20; // Letras maiúsculas
  if (/[0-9]/.test(password)) strength += 20; // Dígitos
  if (/[\W_]/.test(password)) strength += 20; // Caracteres especiais
  return strength;
};

export const RegisterUserSchema = z.object({
  firstName: z.string().min(1, { message: 'Nome é obrigatório' }),
  lastName: z.string().min(1, { message: 'Sobrenome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    .refine((password) => checkPasswordStrength(password) == 100, {
      message:
        'A senha deve ser forte. Inclua letras maiúsculas, minúsculas, números e caracteres especiais.'
    }),
  clienteId: z.string().min(1, { message: 'ID do cliente é obrigatório' })
});

export type IRegisterUser = z.infer<typeof RegisterUserSchema>;
