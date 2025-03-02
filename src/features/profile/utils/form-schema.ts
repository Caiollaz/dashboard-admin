import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  lastname: z
    .string({ required_error: 'Sobrenome é obrigatório' })
    .min(3, { message: 'Sobrenome deve ter pelo menos 3 caracteres' }),
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email({ message: 'Email deve ser um email válido' }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: 'Selecione um país' }),
  city: z.string().min(1, { message: 'Selecione uma cidade' }),
  // a matriz de empregos é para os campos dinâmicos
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: 'Selecione um país' }),
      jobcity: z.string().min(1, { message: 'Selecione uma cidade' }),
      jobtitle: z
        .string()
        .min(3, { message: 'Cargo deve ter pelo menos 3 caracteres' }),
      employer: z
        .string()
        .min(3, { message: 'Empregador deve ter pelo menos 3 caracteres' }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: 'Data de início deve ser no formato YYYY-MM-DD'
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Data de término deve ser no formato YYYY-MM-DD'
      })
    })
  )
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
