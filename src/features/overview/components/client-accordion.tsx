import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface Item {
  id: string;
  tipo: string;
  valor: number;
}

interface Plano {
  id: string;
  dataHora: string;
  pago: boolean;
  nome: string;
  itens: Item[];
}

interface ClientAccordionProps {
  infos: Plano[];
}

export function ClientAccordion({ infos }: ClientAccordionProps) {
  // Função para formatar o valor em reais
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Calcular o valor total do plano
  const calcularTotal = (itens: Item[]) => {
    return itens.reduce((total, item) => total + item.valor, 0);
  };

  return (
    <Accordion type='single' collapsible className='w-full'>
      {infos.map((plano) => (
        <AccordionItem
          key={plano.id}
          value={plano.id}
          className='mb-4 overflow-hidden rounded-lg border border-border'
        >
          <AccordionTrigger className='bg-muted/30 px-4 py-3 transition-all hover:bg-muted/50'>
            <div className='flex w-full items-center justify-between'>
              <div className='text-left font-medium text-foreground'>
                {plano.nome}
              </div>
              <div className='flex items-center gap-4'>
                {plano.pago ? (
                  <Badge
                    variant='outline'
                    className='border-green-600/30 text-green-400 dark:text-green-300'
                  >
                    Pago
                  </Badge>
                ) : (
                  <Badge
                    variant='outline'
                    className='border-destructive/30 text-destructive'
                  >
                    Não Pago
                  </Badge>
                )}
                <div className='flex items-center text-sm text-muted-foreground'>
                  <Calendar className='mr-1 h-4 w-4' />
                  {formatDate(plano.dataHora)}
                </div>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className='bg-card p-4 text-card-foreground'>
            <Card className='border border-border p-4'>
              <div className='mb-4'>
                <h3 className='mb-2 text-sm text-muted-foreground'>Módulos</h3>
                <div className='space-y-2'>
                  {plano.itens.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between rounded-md border border-border bg-muted/20 p-2'
                    >
                      <Badge
                        variant='outline'
                        className='text-dark border-primary/20 bg-primary/10'
                      >
                        {item.tipo}
                      </Badge>
                      <span className='font-medium text-foreground'>
                        {formatCurrency(item.valor)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex justify-between border-t border-border pt-4'>
                <span className='font-semibold text-foreground'>Total</span>
                <span className='font-bold text-primary'>
                  {formatCurrency(calcularTotal(plano.itens))}
                </span>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
