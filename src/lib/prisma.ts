import { PrismaClient } from '@prisma/client';

// Adicione esta linha para forçar o Prisma a reconhecer todos os modelos
declare global {
  var prisma: PrismaClient | undefined;
}

// Evitar múltiplas instâncias do Prisma Client em desenvolvimento
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
