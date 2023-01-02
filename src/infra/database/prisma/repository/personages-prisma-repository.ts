import { PrismaService } from '../prisma.service';
import { Personages } from '../../../../application/entity/personages/personages';
import { PersonagesRepository } from '../../../../application/repositories/personages-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPersonagesRepository implements PersonagesRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPersonages(): Promise<Personages[]> {
    const personages = await this.prisma.personages.findMany();
    return personages;
  }

  async findPersonageByName(name: string): Promise<Personages> {
    const personage = await this.prisma.personages.findUnique({
      where: { name: name },
    });
    return personage;
  }

  async create(personage: Personages): Promise<Personages> {
    const { name, location, hasAkuma } = personage;

    await this.prisma.personages.create({
      data: {
        name,
        location,
        hasAkuma,
      },
    });

    return personage;
  }

  async updatePersonage(
    name: string,
    personage: Personages,
  ): Promise<Personages> {
    return await this.prisma.personages.update({
      where: {
        name,
      },
      data: {
        hasAkuma: personage.hasAkuma,
        location: personage.location,
      },
    });
  }

  async deletePersonage(id: string): Promise<void> {
    await this.prisma.personages.delete({
      where: {
        id,
      },
    });
  }

  async findByPersonageId(id: string): Promise<Personages> {
    const personage = await this.prisma.personages.findUnique({
      where: {
        id,
      },
    });
    return personage;
  }
}
