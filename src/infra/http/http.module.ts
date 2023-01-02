import { DatabaseModule } from './../database/database.module';
import { PersonagesService } from './../../application/services/personages/personages.service';
import { Module } from '@nestjs/common';
import { PersonagesController } from './controllers/personages/personages.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonagesController],
  providers: [PersonagesService],
})
export class HttpModule {}
