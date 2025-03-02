import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { RecentSales } from './recent-sales';
import { UserGreeting } from '@/app/dashboard/overview/user-greeting';
import { useEffect, useState } from 'react';
import { AreaGraphSkeleton } from './area-graph-skeleton';
import { BarGraphSkeleton } from './bar-graph-skeleton';
import { PieGraphSkeleton } from './pie-graph-skeleton';
import { RecentSalesSkeleton } from './recent-sales-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function OverViewPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    revenue: { total: 0, percentage: 0 },
    subscriptions: { total: 0, percentage: 0 },
    sales: { total: 0, percentage: 0 },
    activeUsers: { total: 0, since: 0 }
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/dashboard/overview');
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <UserGreeting />
          <div className='hidden items-center space-x-2 md:flex'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Visão Geral</TabsTrigger>
            <TabsTrigger value='analytics' disabled>
              Análises
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Receita Total
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {loading ? (
                      <Skeleton className='h-8 w-32' />
                    ) : (
                      `R$ ${dashboardData.revenue.total.toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }
                      )}`
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {loading ? (
                      <Skeleton className='h-4 w-40' />
                    ) : (
                      `${
                        dashboardData.revenue.percentage > 0 ? '+' : ''
                      }${dashboardData.revenue.percentage.toFixed(
                        1
                      )}% em relação ao mês anterior`
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Assinaturas
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {loading ? (
                      <Skeleton className='h-8 w-32' />
                    ) : (
                      `+${dashboardData.subscriptions.total}`
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {loading ? (
                      <Skeleton className='h-4 w-40' />
                    ) : (
                      `${
                        dashboardData.subscriptions.percentage > 0 ? '+' : ''
                      }${dashboardData.subscriptions.percentage.toFixed(
                        1
                      )}% em relação ao mês anterior`
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Vendas</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {loading ? (
                      <Skeleton className='h-8 w-32' />
                    ) : (
                      `+${dashboardData.sales.total}`
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {loading ? (
                      <Skeleton className='h-4 w-40' />
                    ) : (
                      `${
                        dashboardData.sales.percentage > 0 ? '+' : ''
                      }${dashboardData.sales.percentage.toFixed(
                        1
                      )}% em relação ao mês anterior`
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Ativos Agora
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {loading ? (
                      <Skeleton className='h-8 w-32' />
                    ) : (
                      `+${dashboardData.activeUsers.total}`
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {loading ? (
                      <Skeleton className='h-4 w-40' />
                    ) : (
                      `+${dashboardData.activeUsers.since} desde a última hora`
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <div className='col-span-4'>
                {loading ? <BarGraphSkeleton /> : <BarGraph />}
              </div>
              <Card className='col-span-4 md:col-span-3'>
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>
                    {loading ? (
                      <Skeleton className='h-4 w-48' />
                    ) : (
                      `Você fez ${dashboardData.sales.total} vendas este mês.`
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? <RecentSalesSkeleton /> : <RecentSales />}
                </CardContent>
              </Card>
              <div className='col-span-4'>
                {loading ? <AreaGraphSkeleton /> : <AreaGraph />}
              </div>
              <div className='col-span-4 md:col-span-3'>
                {loading ? <PieGraphSkeleton /> : <PieGraph />}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
