'use server';

import { getClientByCNPJ, getClientById } from '@/data/client';
import {
  IRegisterClient,
  RegisterClientSchema
} from '@/features/clientes/schema/RegisterCliente.schema';
import { db } from '@/lib/db';
import { Clientes } from '@prisma/client';

export async function registerClient(data: IRegisterClient) {
  const validatedFields = RegisterClientSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const { nome, cnpj, desconto } = validatedFields.data;

  const clientExists = await getClientByCNPJ(cnpj);

  if (clientExists) {
    return { error: 'Cliente já cadastrado' };
  }

  const newClient = await db.clientes.create({
    data: {
      nome,
      desconto,
      cnpj
    }
  });

  if (!newClient) {
    return { error: 'Erro ao criar cliente' };
  }

  return { success: 'Cliente criado com sucesso' };
}

export async function updateClient(data: Clientes) {
  const clientExists = await getClientById(data.id);

  if (!clientExists) {
    return { error: 'Cliente não encontrado' };
  }

  const updatedClient = await db.clientes.update({
    where: { id: data.id },
    data: {
      ...data
    }
  });

  if (!updatedClient) {
    return { error: 'Erro ao atualizar o cliente' };
  }

  return { success: 'Cliente atualizado com sucesso' };
}
