import type { DefaultSession } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export async function auth() {
  try {
    return await getServerSession(authConfig);
  } catch (error) {
    return null;
  }
}
