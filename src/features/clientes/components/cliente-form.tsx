'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clientes } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  desconto: z.coerce.number().min(0).max(100)
});

type FormValues = z.infer<typeof formSchema>;

interface ClienteFormProps {
  cliente: Clientes | null;
}

export default function ClienteForm({ cliente }: ClienteFormProps) {
  const router = useRouter();
  const isNew = !cliente;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: cliente?.nome || '',
      cnpj: cliente?.cnpj || '',
      desconto: cliente?.desconto || 0
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Aqui você implementaria a lógica para salvar no banco de dados
      // usando uma API route ou action

      toast.success(
        isNew
          ? 'Cliente criado com sucesso!'
          : 'Cliente atualizado com sucesso!'
      );
      router.push('/dashboard/cliente');
      router.refresh();
    } catch (error) {
      toast.error('Ocorreu um erro ao salvar o cliente.');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='nome'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='Nome do cliente' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cnpj'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder='CNPJ do cliente' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='desconto'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desconto (%)</FormLabel>
                <FormControl>
                  <Input type='number' min={0} max={100} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='ml-auto'>
          {isNew ? 'Criar' : 'Salvar alterações'}
        </Button>
      </form>
    </Form>
  );
}
