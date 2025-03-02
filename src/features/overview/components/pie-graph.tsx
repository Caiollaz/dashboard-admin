'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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
  visitors: {
    label: 'Planos'
  },
  chrome: {
    label: 'Mensal',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Trimestral',
    color: 'hsl(var(--chart-2))'
  },
  firefox: {
    label: 'Semestral',
    color: 'hsl(var(--chart-3))'
  },
  edge: {
    label: 'Anual',
    color: 'hsl(var(--chart-4))'
  },
  other: {
    label: 'Outros',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const [chartData, setChartData] = React.useState<
    Array<{ browser: string; visitors: number; fill: string }>
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [growthRate, setGrowthRate] = React.useState(0);

  const totalPlans = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  React.useEffect(() => {
    async function fetchPlansData() {
      try {
        const response = await fetch('/api/dashboard/plans');
        const data = await response.json();

        // Transformar dados para o formato esperado pelo gráfico
        const formattedData = [
          {
            browser: 'chrome',
            visitors: data.monthly,
            fill: 'var(--color-chrome)'
          },
          {
            browser: 'safari',
            visitors: data.quarterly,
            fill: 'var(--color-safari)'
          },
          {
            browser: 'firefox',
            visitors: data.semiannual,
            fill: 'var(--color-firefox)'
          },
          { browser: 'edge', visitors: data.annual, fill: 'var(--color-edge)' },
          { browser: 'other', visitors: data.other, fill: 'var(--color-other)' }
        ];

        setChartData(formattedData);
        setGrowthRate(data.growthRate);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados de planos:', error);
        setLoading(false);
      }
    }

    fetchPlansData();
  }, []);

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Distribuição de Planos</CardTitle>
        <CardDescription>Planos ativos por período</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        {loading ? (
          <div className='mx-auto aspect-square max-h-[360px]'>
            <div className='flex h-full items-center justify-center'>
              <Skeleton className='h-[300px] w-[300px] rounded-full' />
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[360px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey='visitors'
                nameKey='browser'
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor='middle'
                          dominantBaseline='middle'
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className='fill-foreground text-3xl font-bold'
                          >
                            {totalPlans.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className='fill-muted-foreground'
                          >
                            Planos
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
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
        <div className='leading-none text-muted-foreground'>
          {loading ? (
            <Skeleton className='h-4 w-48' />
          ) : (
            'Distribuição atual de planos ativos'
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
