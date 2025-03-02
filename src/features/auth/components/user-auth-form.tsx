import LoginForm from '@/components/login-form';
import GithubSignInButton from './github-auth-button';

export default function UserAuthForm() {
  return (
    <>
      <LoginForm />
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Ou continue com
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
