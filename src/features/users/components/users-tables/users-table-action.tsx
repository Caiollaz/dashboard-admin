'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function UsersTableAction() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (term: string) => {
    router.push(pathname + '?' + createQueryString('search', term));
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <div className='relative w-full md:w-[300px]'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Buscar usuarios...'
            className='pl-8'
            defaultValue={searchParams.get('search') ?? ''}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
