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

    // Obter informações dos planos e status de pagamento
    const planosClientes = await prisma.cobrancasCliente.findMany({
      where: {
        deleted: null
      },
      include: {
        items: true, // Inclui os itens (módulos) do cliente
        cliente: true // Faz o join com a tabela de Clientes
      }
    });

    const planosComStatus = planosClientes.map((plano) => ({
      id: plano.id,
      dataHora: plano.dataHora,
      pago: plano.pago,
      nome: plano.cliente.nome,
      itens: plano.items.map((item) => ({
        id: item.id,
        tipo: item.tipo,
        valor: item.valor
      }))
    }));

    return NextResponse.json({
      planos: planosComStatus
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
