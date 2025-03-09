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
import { Usuarios } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  IRegisterUser,
  RegisterUserSchema
} from '../schema/RegisterUser.schema';
import { useTransition } from 'react';
import { registerUser, updateUser } from '@/actions/user';
import { Loader2 } from 'lucide-react';

interface UserFormProps {
  usuario: Usuarios | null;
}

export default function UserForm({ usuario }: UserFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isNew = !usuario;

  const form = useForm<IRegisterUser>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nome: usuario?.nome || '',
      sobrenome: usuario?.sobrenome || '',
      email: usuario?.email || '',
      clienteId: usuario?.clienteId || '',
      password: usuario?.password || ''
    }
  });

  const onSubmit = async (data: IRegisterUser) => {
    try {
      startTransition(async () => {
        if (isNew) {
          await registerUser(data).then((res) => {
            if (res?.error) {
              toast.error(res.error);
              return;
            }

            handleSuccess(res.success);
          });
        }

        const uptUser: any = {
          ...data
        };

        await updateUser(uptUser).then((res) => {
          if (res?.error) {
            toast.error(res.error);
            return;
          }

          handleSuccess(res.success);
        });
      });
    } catch (error) {
      toast.error('Ocorreu um erro ao salvar o usuario.');
    }
  };

  const handleSuccess = (message?: string) => {
    toast.success(message);
    router.push('/dashboard/user');
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
                  <Input placeholder='Nome do usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sobrenome'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder='Sobrenome do usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='E-mail do usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder='Senha do usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='clienteId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID do cliente</FormLabel>
                <FormControl>
                  <Input placeholder='ID do cliente' {...field} />
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
