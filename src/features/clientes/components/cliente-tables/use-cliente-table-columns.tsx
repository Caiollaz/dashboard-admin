'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';
import { Clientes } from '@prisma/client';

export function useClienteTableColumns() {
  const columns: ColumnDef<Clientes>[] = [
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
      accessorKey: 'cnpj',
      header: 'CNPJ'
    },
    {
      accessorKey: 'desconto',
      header: 'Desconto',
      cell: ({ row }) => {
        return <div>{row.original.desconto}%</div>;
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-end gap-2'>
            <Link href={`/dashboard/cliente/${row.original.id}`}>
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
