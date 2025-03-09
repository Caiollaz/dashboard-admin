import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import UserViewPage from '@/features/users/components/user-view-page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard : User View'
};

type PageProps = { params: Promise<{ userId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <UserViewPage userId={params.userId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}

export const revalidate = 3600; // Revalidar a cada hora em vez de a cada requisição
