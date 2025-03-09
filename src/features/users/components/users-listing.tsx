import { db } from '@/lib/db';
import UserTable from './users-table';

export default async function UserListingPage() {
  // Buscar usuarios do banco de dados (lado do servidor)
  const usuarios = await db.usuarios.findMany({
    where: {
      deleted: null
    },
    orderBy: {
      nome: 'asc'
    }
  });

  // Passar apenas os dados para o componente cliente
  return <UserTable data={usuarios} />;
}
