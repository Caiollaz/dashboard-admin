import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import AcademiaViewPage from '@/features/academias/components/academia-view-page';

export const metadata = {
  title: 'Dashboard : Academia View'
};

type PageProps = { params: Promise<{ academiaId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <AcademiaViewPage academiaId={params.academiaId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
