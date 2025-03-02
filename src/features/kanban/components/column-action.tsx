'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTaskStore } from '../utils/store';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function ColumnActions({
  title,
  id
}: {
  title: string;
  id: UniqueIdentifier;
}) {
  const [name, setName] = React.useState(title);
  const updateCol = useTaskStore((state) => state.updateCol);
  const removeCol = useTaskStore((state) => state.removeCol);
  const [editDisable, setIsEditDisable] = React.useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsEditDisable(!editDisable);
          updateCol(id, name);
          toast(`${title} updated to ${name}`);
        }}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100'
          disabled={editDisable}
          ref={inputRef}
        />
      </form>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' className='ml-1'>
            <span className='sr-only'>Actions</span>
            <DotsHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onSelect={() => {
              setIsEditDisable(!editDisable);
              setTimeout(() => {
                inputRef.current && inputRef.current?.focus();
              }, 500);
            }}
          >
            Renomear
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className='text-red-600'
          >
            Excluir seção
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir a seção?
            </AlertDialogTitle>
            <AlertDialogDescription>
              NOTE: Todas as tarefas relacionadas a esta categoria também serão
              excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              variant='destructive'
              onClick={() => {
                setTimeout(() => (document.body.style.pointerEvents = ''), 100);

                setShowDeleteDialog(false);
                removeCol(id);
                toast('Esta coluna foi excluída.');
              }}
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
