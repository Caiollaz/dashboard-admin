import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import authConfig from '@/lib/auth.config';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Buscar as 5 vendas mais recentes com informações do cliente
    const recentSales = await prisma.cobrancasCliente.findMany({
      where: {
        pago: true
      },
      orderBy: {
        dataHora: 'desc'
      },
      take: 5,
      include: {
        cliente: {
          select: {
            nome: true
          }
        }
      }
    });

    // Formatar os dados para o componente
    const formattedSales = recentSales.map((sale) => ({
      id: sale.id,
      name: sale.cliente.nome,
      amount: sale.pago
    }));

    return NextResponse.json({
      sales: formattedSales
    });
  } catch (error) {
    console.error('Erro ao buscar vendas recentes:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
