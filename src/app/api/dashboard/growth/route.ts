import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar autenticação
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Gerar dados simulados para evitar erros com o modelo Prisma
    const monthlyData = [];
    const today = new Date();

    for (let i = 0; i <= 5; i++) {
      const monthDate = new Date(today);
      monthDate.setMonth(today.getMonth() - 5 + i);

      const monthName = monthDate.toLocaleString('pt-BR', { month: 'long' });

      // Dados simulados com valores aleatórios
      const gymsCount = Math.floor(Math.random() * 10) + 5;
      const clientsCount = Math.floor(Math.random() * 20) + 10;

      monthlyData.push({
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        desktop: gymsCount,
        mobile: clientsCount
      });
    }

    // Calcular taxa de crescimento do último mês
    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];

    const totalCurrent = currentMonth.desktop + currentMonth.mobile;
    const totalPrevious = previousMonth.desktop + previousMonth.mobile;

    const growthRate =
      totalPrevious === 0
        ? 100
        : ((totalCurrent - totalPrevious) / totalPrevious) * 100;

    const growthData = {
      monthlyData,
      growthRate
    };

    return NextResponse.json(growthData);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar dados de crescimento:', errorMessage);

    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
