'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { useClienteTableColumns } from './cliente-tables/use-cliente-table-columns';
import { useClienteTableFilters } from './cliente-tables/use-cliente-table-filters';
import { Clientes } from '@prisma/client';

interface ClienteTableProps {
  data: Clientes[];
}

export default function ClienteTable({ data }: ClienteTableProps) {
  const columns = useClienteTableColumns();
  const filters = useClienteTableFilters();

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
