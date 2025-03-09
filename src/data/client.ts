'use server';

import { db } from '@/lib/db';

export async function getClientByCNPJ(cnpj: string) {
  try {
    return await db.clientes.findUnique({ where: { cnpj } });
  } catch (error) {
    return null;
  }
}

export async function getClientById(id: string) {
  try {
    return await db.clientes.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
}
