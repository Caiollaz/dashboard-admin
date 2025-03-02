'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClienteForm from './cliente-form';

interface ClienteViewPageProps {
  clienteId: string;
}

export default async function ClienteViewPage({
  clienteId
}: ClienteViewPageProps) {
  const isNew = clienteId === 'new';

  const cliente = isNew
    ? null
    : await db.clientes.findUnique({
        where: {
          id: clienteId,
          deleted: null
        }
      });

  if (!isNew && !cliente) {
    notFound();
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={isNew ? 'Criar Cliente' : 'Editar Cliente'}
          description={
            isNew ? 'Adicione um novo cliente' : 'Edite os detalhes do cliente'
          }
        />
        <Link href='/dashboard/cliente'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar
          </Button>
        </Link>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Cliente</CardTitle>
          <CardDescription>Preencha as informações do cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteForm cliente={cliente} />
        </CardContent>
      </Card>
    </>
  );
}
