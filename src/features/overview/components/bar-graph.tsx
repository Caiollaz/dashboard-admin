'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
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
  views: {
    label: 'Visualizações'
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('desktop');
  const [chartData, setChartData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState({
    desktop: 0,
    mobile: 0
  });

  React.useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await fetch('/api/dashboard/visits');
        const data = await response.json();
        setChartData(data.visits);

        // Calcular totais
        const desktopTotal = data.visits.reduce(
          (acc: number, curr: any) => acc + curr.desktop,
          0
        );
        const mobileTotal = data.visits.reduce(
          (acc: number, curr: any) => acc + curr.mobile,
          0
        );
        setTotal({ desktop: desktopTotal, mobile: mobileTotal });

        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
        setLoading(false);
      }
    }

    fetchChartData();
  }, []);

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Gráfico de visitas - Interativo</CardTitle>
          <CardDescription>
            Mostrando o total de visitantes dos últimos 3 meses
          </CardDescription>
        </div>
        <div className='flex'>
          {['desktop', 'mobile'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {loading ? (
                    <Skeleton className='h-8 w-20' />
                  ) : (
                    total[key as keyof typeof total]?.toLocaleString()
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        {loading ? (
          <div className='flex aspect-auto h-[280px] w-full items-end justify-around gap-2 pt-8'>
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className='w-full'
                style={{
                  height: `${Math.max(20, Math.random() * 100)}%`
                }}
              />
            ))}
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[280px] w-full'
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('pt-BR', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className='w-[150px]'
                    nameKey='views'
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('pt-BR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
