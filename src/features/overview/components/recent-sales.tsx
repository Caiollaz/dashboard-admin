'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentSales() {
  const [recentSales, setRecentSales] = useState<
    Array<{
      id: string;
      name: string;
      email: string;
      amount: number;
      avatarUrl: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentSales() {
      try {
        const response = await fetch('/api/dashboard/recent-sales');
        const data = await response.json();
        setRecentSales(data.sales);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar vendas recentes:', error);
        setLoading(false);
      }
    }

    fetchRecentSales();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vendas recentes</CardTitle>
          <CardDescription>Você fez 265 vendas este mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-8'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex items-center'>
                <Skeleton className='h-9 w-9 rounded-full' />
                <div className='ml-4 space-y-1'>
                  <Skeleton className='h-4 w-[120px]' />
                  <Skeleton className='h-4 w-[160px]' />
                </div>
                <Skeleton className='ml-auto h-4 w-[80px]' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas recentes</CardTitle>
        <CardDescription>Você fez 265 vendas este mês.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {recentSales.map((sale) => (
            <div key={sale.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatarUrl} alt={sale.name} />
                <AvatarFallback>{getInitials(sale.name)}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>{sale.name}</p>
                <p className='text-sm text-muted-foreground'>{sale.email}</p>
              </div>
              <div className='ml-auto font-medium'>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(sale.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
