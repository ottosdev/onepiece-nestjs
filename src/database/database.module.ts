import { PrismaPersonagesRepository } from './prisma/repository/personages-prisma-repository';
import { PrismaService } from './prisma/prisma.service';
import { PersonagesRepository } from './../repositories/personages-repository';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    PrismaService,
    {
      provide: PersonagesRepository,
      useClass: PrismaPersonagesRepository,
    },
  ],
  exports: [PersonagesRepository],
})
export class DatabaseModule {}
