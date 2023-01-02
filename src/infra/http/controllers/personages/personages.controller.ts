import { UpdatePersonageDTO } from '../../../../application/dtos/personages/updatePersonageDTO';
import { PersonagesDTO } from '../../../../application/dtos/personages/personagesDTO';
import { Personages } from '../../../../application/entity/Personages/personages';

import { PersonagesService } from '../../../../application/services/personages/personages.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('personages')
export class PersonagesController {
  constructor(private service: PersonagesService) {}

  @Post()
  async create(@Body() request: PersonagesDTO): Promise<Personages> {
    try {
      const { name, location, hasAkuma } = request;
      const personage = await this.service.create({ name, location, hasAkuma });
      return personage;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getByName(@Query('name') name: string): Promise<Personages> {
    try {
      const personage = await this.service.findPersonageByName(name);
      return personage;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/all')
  async getAllPersonages(): Promise<Personages[]> {
    try {
      const personages = await this.service.findAllPersonages();
      return personages;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put()
  async updatePersonage(
    @Query('name') name: string,
    @Body() request: UpdatePersonageDTO,
  ): Promise<Personages> {
    try {
      const personage = await this.service.updatePersonage(name, request);
      return personage;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getPersonageById(@Param('id') id: string): Promise<Personages> {
    try {
      const personage = await this.service.findPersonageById(id);
      return personage;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deletePersonage(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delelePersonage(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
