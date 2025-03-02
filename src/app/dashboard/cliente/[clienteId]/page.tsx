import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ClienteViewPage from '@/features/clientes/components/cliente-view-page';

export const metadata = {
  title: 'Dashboard : Cliente View'
};

type PageProps = { params: Promise<{ clienteId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ClienteViewPage clienteId={params.clienteId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
