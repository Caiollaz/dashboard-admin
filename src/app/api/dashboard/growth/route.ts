import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar autenticação
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Obter data atual e data de 6 meses atrás
    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    // Buscar crescimento mensal de academias e clientes
    const monthlyData = [];

    for (let i = 0; i <= 5; i++) {
      const monthDate = new Date(today);
      monthDate.setMonth(today.getMonth() - 5 + i);

      const monthStart = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        1
      );
      const monthEnd = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0
      );

      // Contar academias criadas até o final deste mês
      const gymsCount = await prisma.academias.count({
        where: {
          // @ts-ignore - Ignorar verificação de tipo
          created_at: {
            lte: monthEnd
          }
        }
      });

      // Contar clientes criados até o final deste mês
      const clientsCount = await prisma.clientes.count({
        where: {
          // @ts-ignore - Ignorar verificação de tipo
          created_at: {
            lte: monthEnd
          }
        }
      });

      const monthName = monthDate.toLocaleString('pt-BR', { month: 'long' });

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

    // Aqui você buscaria os dados de crescimento
    // Certifique-se de que o payload nunca seja null
    const growthData = {
      monthlyData,
      growthRate
    };

    // Retorne sempre um objeto, nunca null
    return NextResponse.json(growthData);
  } catch (error) {
    // Melhorar o tratamento de erro para evitar problemas com console.error
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar dados de crescimento:', errorMessage);

    // Retorne um objeto de erro, nunca null
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
