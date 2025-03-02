'use client';

import { useSession } from 'next-auth/react';

export function UserGreeting() {
  const { data: session } = useSession();

  return (
    <h2 className='text-2xl font-bold tracking-tight'>
      Olá, {session?.user?.name} 👋
    </h2>
  );
}
