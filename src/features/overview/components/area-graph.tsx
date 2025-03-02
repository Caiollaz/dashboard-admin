'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  desktop: {
    label: 'Academias',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Clientes',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [growthRate, setGrowthRate] = useState(0);

  useEffect(() => {
    async function fetchGrowthData() {
      try {
        const response = await fetch('/api/dashboard/growth');
        const data = await response.json();
        setChartData(data.monthlyData);
        setGrowthRate(data.growthRate);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados de crescimento:', error);
        setLoading(false);
      }
    }

    fetchGrowthData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crescimento - Empresa</CardTitle>
        <CardDescription>
          Mostrando o total de academias e clientes dos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className='relative aspect-auto h-[310px] w-full'>
            <div className='absolute inset-0 rounded-lg bg-gradient-to-t from-primary/5 to-primary/20' />
            <Skeleton className='absolute bottom-0 left-0 right-0 h-[1px]' />
            <Skeleton className='absolute bottom-0 left-0 top-0 w-[1px]' />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[310px] w-full'
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='dot' />}
              />
              <Area
                dataKey='mobile'
                type='natural'
                fill='var(--color-mobile)'
                fillOpacity={0.4}
                stroke='var(--color-mobile)'
                stackId='a'
              />
              <Area
                dataKey='desktop'
                type='natural'
                fill='var(--color-desktop)'
                fillOpacity={0.4}
                stroke='var(--color-desktop)'
                stackId='a'
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              {loading ? (
                <Skeleton className='h-4 w-40' />
              ) : (
                <>
                  Aumento de {growthRate.toFixed(1)}% este mês{' '}
                  <TrendingUp className='h-4 w-4' />
                </>
              )}
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              {loading ? (
                <Skeleton className='h-4 w-32' />
              ) : (
                `Janeiro - Junho ${new Date().getFullYear()}`
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
