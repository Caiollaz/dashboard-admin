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

    // Usando o modelo Planos em vez de subscription
    const monthlyPlans = await prisma.planos.count({
      where: {
        deleted: null,
        // Você pode adicionar condições específicas para planos mensais
        // Por exemplo, se o nome contiver "Mensal"
        nome: {
          contains: 'Mensal'
        }
      }
    });

    const quarterlyPlans = await prisma.planos.count({
      where: {
        deleted: null,
        nome: {
          contains: 'Trimestral'
        }
      }
    });

    const semiannualPlans = await prisma.planos.count({
      where: {
        deleted: null,
        nome: {
          contains: 'Semestral'
        }
      }
    });

    const annualPlans = await prisma.planos.count({
      where: {
        deleted: null,
        nome: {
          contains: 'Anual'
        }
      }
    });

    const otherPlans = await prisma.planos.count({
      where: {
        deleted: null,
        AND: [
          { nome: { not: { contains: 'Mensal' } } },
          { nome: { not: { contains: 'Trimestral' } } },
          { nome: { not: { contains: 'Semestral' } } },
          { nome: { not: { contains: 'Anual' } } }
        ]
      }
    });

    // Calcular crescimento de planos ativos
    const currentMonthPlans =
      monthlyPlans +
      quarterlyPlans +
      semiannualPlans +
      annualPlans +
      otherPlans;

    const previousMonthPlans = await prisma.planos.count({
      where: {
        deleted: null,
        dataHora: {
          lt: firstDayCurrentMonth
        }
      }
    });

    const growthRate =
      previousMonthPlans === 0
        ? 100
        : ((currentMonthPlans - previousMonthPlans) / previousMonthPlans) * 100;

    return NextResponse.json({
      monthly: monthlyPlans,
      quarterly: quarterlyPlans,
      semiannual: semiannualPlans,
      annual: annualPlans,
      other: otherPlans,
      growthRate
    });
  } catch (error) {
    console.error('Erro ao buscar dados de planos:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
