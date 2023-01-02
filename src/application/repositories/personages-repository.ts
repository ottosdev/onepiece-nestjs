import { Personages } from '../entity/personages/personages';

export abstract class PersonagesRepository {
  abstract create(personage: Personages): Promise<Personages>;
  abstract findPersonageByName(name: string): Promise<Personages>;
  abstract findAllPersonages(): Promise<Personages[]>;
  abstract updatePersonage(
    name: string,
    personage: Personages,
  ): Promise<Personages>;

  abstract deletePersonage(id: string): Promise<void>;
  abstract findByPersonageId(id: string): Promise<Personages>;
}
