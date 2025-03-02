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
import AcademiaForm from './academia-form';

interface AcademiaViewPageProps {
  academiaId: string;
}

export default async function AcademiaViewPage({
  academiaId
}: AcademiaViewPageProps) {
  const isNew = academiaId === 'new';

  const academia = isNew
    ? null
    : await db.academias.findUnique({
        where: {
          id: academiaId,
          deleted: null
        }
      });

  if (!isNew && !academia) {
    notFound();
  }

  // Buscar todos os clientes para o select
  const clientes = await db.clientes.findMany({
    where: {
      deleted: null
    },
    orderBy: {
      nome: 'asc'
    }
  });

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={isNew ? 'Criar Academia' : 'Editar Academia'}
          description={
            isNew
              ? 'Adicione uma nova academia'
              : 'Edite os detalhes da academia'
          }
        />
        <Link href='/dashboard/academia'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar
          </Button>
        </Link>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Academia</CardTitle>
          <CardDescription>Preencha as informações da academia</CardDescription>
        </CardHeader>
        <CardContent>
          <AcademiaForm academia={academia} clientes={clientes} />
        </CardContent>
      </Card>
    </>
  );
}
