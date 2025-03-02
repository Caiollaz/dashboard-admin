'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';
import Link from 'next/link';
import { Academias, Clientes } from '@prisma/client';

type AcademiaWithCliente = Academias & {
  cliente: Clientes;
};

export function useAcademiaTableColumns() {
  const columns: ColumnDef<AcademiaWithCliente>[] = [
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
      accessorKey: 'cliente.nome',
      header: 'Cliente',
      cell: ({ row }) => {
        return <div>{row.original.cliente.nome}</div>;
      }
    },
    {
      accessorKey: 'cidade',
      header: 'Cidade'
    },
    {
      accessorKey: 'estado',
      header: 'Estado'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-end gap-2'>
            <Link href={`/dashboard/academia/${row.original.id}`}>
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
