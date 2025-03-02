import { db } from '@/lib/db';
import ClienteTable from './cliente-table';

export default async function ClienteListingPage() {
  // Buscar clientes do banco de dados (lado do servidor)
  const clientes = await db.clientes.findMany({
    where: {
      deleted: null
    },
    orderBy: {
      nome: 'asc'
    }
  });

  // Passar apenas os dados para o componente cliente
  return <ClienteTable data={clientes} />;
}
