import { IsNotEmpty } from 'class-validator';

export class UpdatePersonageDTO {
  @IsNotEmpty({
    message: 'Location is required',
  })
  location: string;
  @IsNotEmpty({
    message: 'Personage has akuma is required',
  })
  hasAkuma: boolean;
}
