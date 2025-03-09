import { z } from 'zod';

export const RegisterClientSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  desconto: z.coerce.number().min(0).max(100)
});

export type IRegisterClient = z.infer<typeof RegisterClientSchema>;
