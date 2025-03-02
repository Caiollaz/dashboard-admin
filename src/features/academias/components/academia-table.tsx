'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { useAcademiaTableColumns } from './academia-tables/use-academia-table-columns';
import { useAcademiaTableFilters } from './academia-tables/use-academia-table-filters';
import { Academias, Clientes } from '@prisma/client';

type AcademiaWithCliente = Academias & {
  cliente: Clientes;
};

interface AcademiaTableProps {
  data: AcademiaWithCliente[];
}

export default function AcademiaTable({ data }: AcademiaTableProps) {
  const columns = useAcademiaTableColumns();
  const filters = useAcademiaTableFilters();

  return (
    <DataTable
      columns={columns}
      data={data}
      filters={filters}
      searchField='nome'
      totalItems={data.length}
    />
  );
}
