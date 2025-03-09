'use server';

import { db } from '@/lib/db';

export async function getGymById(id: string) {
  try {
    return await db.academias.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
}
