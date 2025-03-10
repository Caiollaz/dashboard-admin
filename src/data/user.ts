'use server';

import { db } from '@/lib/db';

export async function getUserByEmail(email: string) {
  try {
    return await db.usuarios.findUnique({ where: { email } });
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    return await db.usuarios.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
}
