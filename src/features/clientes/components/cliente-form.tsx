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
import {
  IRegisterClient,
  RegisterClientSchema
} from '../schema/RegisterCliente.schema';
import { useTransition } from 'react';
import { registerClient, updateClient } from '@/actions/client';
import { Loader2 } from 'lucide-react';

interface ClienteFormProps {
  cliente: Clientes | null;
}

export default function ClienteForm({ cliente }: ClienteFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isNew = !cliente;

  const form = useForm<IRegisterClient>({
    resolver: zodResolver(RegisterClientSchema),
    defaultValues: {
      nome: cliente?.nome || '',
      cnpj: cliente?.cnpj || '',
      desconto: cliente?.desconto || 0
    }
  });

  const onSubmit = async (data: IRegisterClient) => {
    try {
      startTransition(async () => {
        if (isNew) {
          await registerClient(data).then((res) => {
            if (res?.error) {
              toast.error(res.error);
              return;
            }

            handleSuccess(res.success);
          });
        }

        const uptClient: any = {
          ...data
        };

        await updateClient(uptClient).then((res) => {
          if (res?.error) {
            toast.error(res.error);
            return;
          }

          handleSuccess(res.success);
        });
      });
    } catch (error) {
      toast.error('Ocorreu um erro ao salvar o cliente.');
    }
  };

  const handleSuccess = (message?: string) => {
    toast.success(message);
    router.push('/dashboard/cliente');
    router.refresh();
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
        <Button type='submit' className='ml-auto' disabled={isPending}>
          {isPending && <Loader2 className='animate-spin' />}
          {isNew ? 'Criar' : 'Salvar alterações'}
        </Button>
      </form>
    </Form>
  );
}
