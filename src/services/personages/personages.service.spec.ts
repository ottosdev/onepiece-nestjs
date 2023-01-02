import { Personages } from './../../entity/personages/personages';
import { InMemoryPersonagesRepository } from './../../../test/in-memory-personages/in-memory-personages-respository';
import { PersonagesService } from './personages.service';

describe('PersonagesService', () => {
  it('should be able to create a personage', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();

    personage.name = 'Luffy';
    personage.location = 'East blue';
    personage.hasAkuma = true;

    await service.create(personage);

    expect(repo.personages[0]).toEqual(personage);
    expect(repo.personages).toHaveLength(1);
  });

  it('should be able to find a personage by name', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();
    personage.name = 'MARIA';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    const personage1 = new Personages();
    personage1.name = 'JOAO';
    personage1.location = 'East dsad';
    personage1.hasAkuma = true;

    // Created with REPO
    const first = await repo.create(personage);
    await repo.create(personage1);

    // Find with SERVICE
    const findByService = await service.findPersonageByName(first.name);

    expect(repo.personages[0]).toEqual(findByService);
  });

  it('should be able to find all personages', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();
    personage.name = 'MARIA';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    const personage1 = new Personages();
    personage1.name = 'JOAO';
    personage1.location = 'East dsad';
    personage1.hasAkuma = true;

    // Created with REPO
    await repo.create(personage);
    await repo.create(personage1);

    // Find with SERVICE
    const findByService = await service.findAllPersonages();

    expect(repo.personages).toEqual(findByService);
    expect(findByService).toHaveLength(2);
  });

  it('should be able to update a personage', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();
    personage.id = 'teste1';
    personage.name = 'Luffy';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    const personage1 = new Personages();
    personage1.id = 'teste';
    personage1.name = 'Nami';
    personage1.location = 'dasdasdasdas';
    personage1.hasAkuma = false;

    // Created with REPO
    await repo.create(personage);
    await repo.create(personage1);
    // Find with SERVICE
    const newP: Personages = {
      id: 'teste',
      name: 'Nami',
      location: 'joao',
      hasAkuma: false,
    };

    const personageUpdated = await service.updatePersonage('Nami', newP);

    expect(repo.personages[1]).not.toEqual(personageUpdated);
  });

  it('should be able to find a personage by id', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();
    personage.id = 'teste1';
    personage.name = 'Luffy';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    await repo.create(personage);

    const getId = await service.findPersonageById(personage.id);

    expect(repo.personages[0]).toEqual(getId);
  });

  it('should be able to delete a personage', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();
    personage.id = 'teste1';
    personage.name = 'Luffy';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    // create a personage
    await repo.create(personage);

    // delete a personage from array
    await service.delelePersonage(personage.id);

    // I am expect into array to personages a length equals 0;
    expect(repo.personages).toHaveLength(0);
  });

  it('not should be able to find a personage by id', async () => {
    const repo = new InMemoryPersonagesRepository();
    const service = new PersonagesService(repo);

    const personage = new Personages();
    personage.id = 'teste1';
    personage.name = 'Luffy';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    await repo.create(personage);

    expect(() => {
      return service.findPersonageById('dsadsa');
    }).rejects.toThrow('Personage does not exists');
  });
});
