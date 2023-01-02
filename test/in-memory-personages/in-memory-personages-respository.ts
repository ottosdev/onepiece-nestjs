import { Personages } from './../../src/entity/Personages/personages';
import { PersonagesRepository } from './../../src/repositories/personages-repository';

export class InMemoryPersonagesRepository implements PersonagesRepository {
  async findByPersonageId(id: string): Promise<Personages> {
    const personage = this.personages.find((item) => item.id === id);
    return personage;
  }
  public personages: Personages[] = [];

  async findPersonageByName(name: string): Promise<Personages> {
    const personage = this.personages.find((item) => (item.name = name));
    return personage;
  }
  async findAllPersonages(): Promise<Personages[]> {
    return this.personages.map((item) => item);
  }

  async create(personage: Personages): Promise<Personages> {
    this.personages.push(personage);
    return personage;
  }

  async updatePersonage(
    name: string,
    personage: Personages,
  ): Promise<Personages> {
    const findPersonageIndex = this.personages.findIndex(
      (item) => (item.name = name),
    );
    if (findPersonageIndex < 0) {
      throw new Error('Personage does not exist');
    }

    return (this.personages[findPersonageIndex] = personage);
  }
  async deletePersonage(id: string): Promise<void> {
    const findPersonageIndex = this.personages.findIndex(
      (item) => (item.id = id),
    );
    if (findPersonageIndex < 0) {
      throw new Error('Personage does not exist');
    }

    this.personages.splice(findPersonageIndex, 1);
  }
}
