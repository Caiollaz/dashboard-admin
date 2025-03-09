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
import UserForm from './user-form';

interface UserViewPageProps {
  userId: string;
}

export default async function UserViewPage({ userId }: UserViewPageProps) {
  const isNew = userId === 'new';

  const user = isNew
    ? null
    : await db.usuarios.findUnique({
        where: {
          id: userId,
          deleted: null
        }
      });

  if (!isNew && !user) {
    notFound();
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={isNew ? 'Criar usuario' : 'Editar usuario'}
          description={
            isNew ? 'Adicione um novo usuario' : 'Edite os detalhes do usuario'
          }
        />
        <Link href='/dashboard/user'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar
          </Button>
        </Link>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do usuario</CardTitle>
          <CardDescription>Preencha as informações do usuario</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm usuario={user} />
        </CardContent>
      </Card>
    </>
  );
}
