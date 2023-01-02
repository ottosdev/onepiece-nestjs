import { Personages } from './personages';

describe('Personages', () => {
  it('should be defined', () => {
    const personage = new Personages();
    personage.name = 'MARIA';
    personage.location = 'East dsad';
    personage.hasAkuma = true;

    expect(personage.name).toEqual('MARIA');
  });
});
