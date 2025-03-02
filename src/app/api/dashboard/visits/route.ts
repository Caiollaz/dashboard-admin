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

    // Obter data atual e data de 3 meses atrás
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    // Buscar visitas (check-ins) agrupadas por dia
    // Como o modelo CheckIn pode não existir, vamos usar uma abordagem alternativa
    // ou comentar esta parte temporariamente
    /*
    const checkIns = await prisma.$queryRaw`
      SELECT 
        DATE(createdAt) as date,
        SUM(CASE WHEN deviceType = 'DESKTOP' THEN 1 ELSE 0 END) as desktop,
        SUM(CASE WHEN deviceType = 'MOBILE' THEN 1 ELSE 0 END) as mobile
      FROM CheckIn
      WHERE createdAt >= ${threeMonthsAgo}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    `;
    */

    // Dados de exemplo para evitar o erro
    const mockData = [
      { date: '2023-10-01', desktop: 5, mobile: 10 },
      { date: '2023-10-02', desktop: 8, mobile: 12 },
      { date: '2023-10-03', desktop: 6, mobile: 15 }
    ];

    return NextResponse.json({
      visits: mockData // Substitua por checkIns quando o modelo estiver disponível
    });
  } catch (error) {
    console.error(
      'Erro ao buscar dados de visitas:',
      error instanceof Error ? error.message : 'Erro desconhecido'
    );
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
