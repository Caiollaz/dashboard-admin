import { db } from '@/lib/db';
import AcademiaTable from './academia-table';

export default async function AcademiaListingPage() {
  // Buscar academias do banco de dados (lado do servidor)
  const academias = await db.academias.findMany({
    where: {
      deleted: null
    },
    include: {
      cliente: true
    },
    orderBy: {
      nome: 'asc'
    }
  });

  // Passar apenas os dados para o componente cliente
  return <AcademiaTable data={academias} />;
}
