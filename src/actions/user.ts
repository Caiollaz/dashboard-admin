'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import {
  IRegisterUser,
  RegisterUserSchema
} from '@/features/users/schema/RegisterUser.schema';
import { db } from '@/lib/db';
import { Usuarios } from '@prisma/client';
import bcrypt, { compare } from 'bcrypt';

export async function registerUser(data: IRegisterUser) {
  const validatedFields = RegisterUserSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const { nome, sobrenome, email, password, clienteId, academiaId } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.usuarios.create({
    data: {
      nome,
      sobrenome,
      email,
      password: hashedPassword,
      clienteId: clienteId,
      academiaId: academiaId
    }
  });

  if (!newUser) {
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
    where: { id: data.id },
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
