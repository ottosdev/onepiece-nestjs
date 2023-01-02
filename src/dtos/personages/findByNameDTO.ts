import { IsNotEmpty } from 'class-validator';

export class FindByNameDTO {
  @IsNotEmpty({
    message: 'Please put a name. Name is required',
  })
  name: string;
}
