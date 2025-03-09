'use client';

import { Button } from '@/components/ui/button';
import { Usuarios } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';

export function useUsersTableColumns() {
  const columns: ColumnDef<Usuarios>[] = [
    {
      accessorKey: 'nome',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      }
    },
    {
      accessorKey: 'sobrenome',
      header: 'Sobrenome'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-end gap-2'>
            <Link href={`/dashboard/user/${row.original.id}`}>
              <Button size='icon' variant='ghost'>
                <Eye className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        );
      }
    }
  ];

  return columns;
}
