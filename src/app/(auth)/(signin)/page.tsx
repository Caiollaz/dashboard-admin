import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sigin-view';

export const metadata: Metadata = {
  title: 'Autenticação | Login',
  description: 'Pagina de login para autenticação'
};

export default async function Page() {
  return <SignInViewPage />;
}
