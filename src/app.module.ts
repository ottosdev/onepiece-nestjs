import { Module } from '@nestjs/common';
import { PersonagesController } from './controllers/personages/personages.controller';
import { PersonagesService } from './services/personages/personages.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonagesController],
  providers: [PersonagesService],
})
export class AppModule {}
