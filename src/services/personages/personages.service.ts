import { UpdatePersonageDTO } from './../../dtos/personages/updatePersonageDTO';
import { GlobalErros } from './../../errors/GlobalErros';
import { PersonagesRepository } from './../../repositories/personages-repository';

import { PersonagesDTO } from '../../dtos/personages/personagesDTO';
import { Personages } from './../../entity/personages/personages';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonagesService {
  constructor(private repository: PersonagesRepository) {}

  async create(request: PersonagesDTO): Promise<Personages> {
    const { name, hasAkuma, location } = request;

    const personage = new Personages();
    personage.hasAkuma = hasAkuma;
    personage.location = location;
    personage.name = name;

    return this.repository.create(personage);
  }

  async findPersonageByName(name: string): Promise<Personages> {
    const personage = await this.repository.findPersonageByName(name);
    if (!personage) {
      throw new GlobalErros('Personage does not exists');
    }
    return personage;
  }

  async findAllPersonages(): Promise<Personages[]> {
    const personages = await this.repository.findAllPersonages();
    return personages;
  }

  async updatePersonage(
    name: string,
    request: UpdatePersonageDTO,
  ): Promise<Personages> {
    const { hasAkuma, location } = request;

    const personageExists = await this.repository.findPersonageByName(name);

    if (!personageExists) {
      throw new GlobalErros('Personage does not exists');
    }

    personageExists.hasAkuma = hasAkuma;
    personageExists.location = location;

    return this.repository.updatePersonage(name, personageExists);
  }

  async findPersonageById(id: string): Promise<Personages> {
    const personage = await this.repository.findByPersonageId(id);
    if (!personage) {
      throw new GlobalErros('Personage does not exists');
    }
    return personage;
  }

  async delelePersonage(id: string): Promise<void> {
    const personageExists = await this.findPersonageById(id);

    await this.repository.deletePersonage(personageExists.id);
  }
}
