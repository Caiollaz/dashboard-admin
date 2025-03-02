import { Metadata } from 'next';
import { Suspense } from 'react';
import SignInViewPage from '@/features/auth/components/sigin-view';

export const metadata: Metadata = {
  title: 'Autenticação | Login',
  description: 'Pagina de login para autenticação'
};

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SignInViewPage />
    </Suspense>
  );
}
