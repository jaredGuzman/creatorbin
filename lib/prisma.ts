import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma.$connect();
  }

  prisma = global.prisma;
}


export default prisma;