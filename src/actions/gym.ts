'use server';

import { getGymById } from '@/data/gym';
import {
  IRegisterGYM,
  RegisterGymSchema
} from '@/features/academias/schema/RegisterGym.schema';
import { db } from '@/lib/db';
import { Academias } from '@prisma/client';

export async function registerGym(data: IRegisterGYM) {
  const validatedFields = RegisterGymSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const { nome, rua, cidade, estado, cep, numero, clienteId } =
    validatedFields.data;

  const newGym = await db.academias.create({
    data: {
      nome,
      rua,
      cidade,
      estado,
      cep,
      numero,
      clienteId
    }
  });

  if (!newGym) {
    return { error: 'Erro ao criar academia' };
  }

  return { success: 'Academia criado com sucesso' };
}

export async function updateGym(data: Academias) {
  const clientExists = await getGymById(data.id);

  if (!clientExists) {
    return { error: 'Academia não encontrada' };
  }

  const updatedGym = await db.academias.update({
    where: { id: data.id },
    data: {
      ...data
    }
  });

  if (!updatedGym) {
    return { error: 'Erro ao atualizar academia' };
  }

  return { success: 'Academia atualizada com sucesso' };
}
