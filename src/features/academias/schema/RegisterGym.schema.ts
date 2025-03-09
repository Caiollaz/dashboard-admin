import { z } from 'zod';

export const RegisterGymSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  rua: z.string().min(1, 'Rua é obrigatória'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  clienteId: z.string().min(1, 'Cliente é obrigatório')
});

export type IRegisterGYM = z.infer<typeof RegisterGymSchema>;
