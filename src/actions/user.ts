// src/actions/updateUser.ts
'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import {
  IRegisterUser,
  RegisterUserSchema
} from '@/features/users/schema/RegisterUserSchema';
import { db } from '@/lib/db';
import { Usuarios } from '@prisma/client';
import bcrypt, { compare } from 'bcrypt';

export async function registerUser(data: IRegisterUser) {
  const validatedFields = RegisterUserSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const { email, firstName, lastName, password, clienteId } =
    validatedFields.data;

  const userExists = await getUserByEmail(email);

  if (!userExists) {
    return { error: 'Usuário não encontrado' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await db.usuarios.create({
    data: {
      nome: firstName,
      sobrenome: lastName,
      email,
      password: hashedPassword,
      clienteId: clienteId
    }
  });

  if (!updatedUser) {
    return { error: 'Erro ao criar usuário' };
  }

  return { success: 'Usuário criado com sucesso' };
}

export async function updateUser(data: Usuarios) {
  const userExists = await getUserById(data.id);

  if (!userExists) {
    return { error: 'Usuário não encontrado' };
  }

  const isPasswordValid = await compare(data.password, userExists.password);

  if (!isPasswordValid) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
  }

  const updatedUser = await db.usuarios.update({
    where: { email: data.email },
    data: {
      ...data,
      password: data.password
    }
  });

  if (!updatedUser) {
    return { error: 'Erro ao atualizar usuário' };
  }

  return { success: 'Usuário atualizado com sucesso' };
}
