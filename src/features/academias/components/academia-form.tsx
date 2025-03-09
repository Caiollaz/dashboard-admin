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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Academias, Clientes } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { IRegisterGYM, RegisterGymSchema } from '../schema/RegisterGym.schema';
import { Loader2 } from 'lucide-react';
import { registerGym, updateGym } from '@/actions/gym';

interface AcademiaFormProps {
  academia: Academias | null;
  clientes: Clientes[];
}

export default function AcademiaForm({
  academia,
  clientes
}: AcademiaFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isNew = !academia;

  const form = useForm<IRegisterGYM>({
    resolver: zodResolver(RegisterGymSchema),
    defaultValues: {
      nome: academia?.nome || '',
      rua: academia?.rua || '',
      cidade: academia?.cidade || '',
      estado: academia?.estado || '',
      cep: academia?.cep || '',
      numero: academia?.numero || '',
      clienteId: academia?.clienteId || ''
    }
  });

  const onSubmit = async (data: IRegisterGYM) => {
    try {
      startTransition(async () => {
        if (isNew) {
          await registerGym(data).then((res) => {
            if (res?.error) {
              toast.error(res.error);
              return;
            }

            handleSuccess(res.success);
          });
        }

        const uptGym: any = {
          ...data
        };

        await updateGym(uptGym).then((res) => {
          if (res?.error) {
            toast.error(res.error);
            return;
          }

          handleSuccess(res.success);
        });
      });
    } catch (error) {
      toast.error('Ocorreu um erro ao salvar a academia.');
    }
  };

  const handleSuccess = (message?: string) => {
    toast.success(message);
    router.push('/dashboard/academia');
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
                  <Input placeholder='Nome da academia' {...field} />
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
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione um cliente' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rua'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder='Rua' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='numero'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder='Número' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cidade'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder='Cidade' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='estado'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder='Estado' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cep'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input placeholder='CEP' {...field} />
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
