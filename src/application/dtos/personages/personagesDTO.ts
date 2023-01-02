import { IsNotEmpty } from 'class-validator';

export class PersonagesDTO {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;
  @IsNotEmpty({
    message: 'Location is required',
  })
  location: string;
  @IsNotEmpty({
    message: 'Personage has akuma is required',
  })
  hasAkuma: boolean;
}
