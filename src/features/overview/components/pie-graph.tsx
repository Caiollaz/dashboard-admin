'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { ClientAccordion } from './client-accordion';
import { Skeleton } from '@/components/ui/skeleton';

export function PieGraph() {
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPlansData() {
      try {
        const response = await fetch('/api/dashboard/plans');
        const data = await response.json();

        setChartData(data.planos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchPlansData();
  }, []);

  return (
    <Card className='flex h-[488px] flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Distribuição de Planos</CardTitle>
        <CardDescription>Planos ativos por período</CardDescription>
      </CardHeader>
      <CardContent className='mt-8 flex-1 pb-0'>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className='mt-3 h-4' />
          ))
        ) : (
          <ClientAccordion infos={chartData} />
        )}
      </CardContent>
    </Card>
  );
}
