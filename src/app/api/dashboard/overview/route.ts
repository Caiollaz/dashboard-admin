import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authConfig from '@/lib/auth.config';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Obter data atual e data do mês anterior para comparações
    const today = new Date();
    const firstDayCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const firstDayPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );

    // Buscar receita total
    const currentMonthRevenue: any = await prisma.cobrancasCliente.aggregate({
      sum: {
        valor: true
      },
      where: {
        // @ts-ignore - Ignorar verificação de tipo
        created_at: {
          gte: firstDayCurrentMonth
        },
        status: 'PAID'
      }
    });

    const previousMonthRevenue: any = await prisma.cobrancasCliente.aggregate({
      sum: {
        valor: true
      },
      where: {
        // @ts-ignore - Ignorar verificação de tipo
        created_at: {
          gte: firstDayPreviousMonth,
          lt: firstDayCurrentMonth
        },
        status: 'PAID'
      }
    });

    const currentRevenue = currentMonthRevenue._sum.valor || 0;
    const previousRevenue = previousMonthRevenue._sum.valor || 0;
    const revenuePercentage =
      previousRevenue === 0
        ? 100
        : ((currentRevenue - previousRevenue) / previousRevenue) * 100;

    // Buscar assinaturas (novos clientes)
    const currentMonthSubscriptions = await prisma.clientes.count({
      where: {
        // @ts-ignore - Ignorar verificação de tipo
        created_at: {
          gte: firstDayCurrentMonth
        }
      }
    });

    const previousMonthSubscriptions = await prisma.clientes.count({
      where: {
        // @ts-ignore - Ignorar verificação de tipo
        created_at: {
          gte: firstDayPreviousMonth,
          lt: firstDayCurrentMonth
        }
      }
    });

    const subscriptionsPercentage =
      previousMonthSubscriptions === 0
        ? 100
        : ((currentMonthSubscriptions - previousMonthSubscriptions) /
            previousMonthSubscriptions) *
          100;

    // Buscar vendas (pagamentos)
    const currentMonthSales = await prisma.cobrancasCliente.count({
      where: {
        // @ts-ignore - Ignorar verificação de tipo
        created_at: {
          gte: firstDayCurrentMonth
        },
        status: 'PAID'
      }
    });

    const previousMonthSales = await prisma.cobrancasCliente.count({
      where: {
        // @ts-ignore - Ignorar verificação de tipo
        created_at: {
          gte: firstDayPreviousMonth,
          lt: firstDayCurrentMonth
        },
        status: 'PAID'
      }
    });

    const salesPercentage =
      previousMonthSales === 0
        ? 100
        : ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;

    return NextResponse.json({
      revenue: {
        total: currentRevenue,
        percentage: revenuePercentage
      },
      subscriptions: {
        total: currentMonthSubscriptions,
        percentage: subscriptionsPercentage
      },
      sales: {
        total: currentMonthSales,
        percentage: salesPercentage
      },
      activeUsers: {
        total: 0,
        since: 0
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
