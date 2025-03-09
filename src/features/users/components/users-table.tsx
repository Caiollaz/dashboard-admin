'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { Usuarios } from '@prisma/client';
import { useUsersTableColumns } from './users-tables/use-users-table-columns';

interface UsersTableProps {
  data: Usuarios[];
}

export default function UserTable({ data }: UsersTableProps) {
  const columns = useUsersTableColumns();
  const filters: any = useUsersTableColumns();

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
