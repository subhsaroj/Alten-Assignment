import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';
import { loadSampleEvents } from '../seed';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: EventsRepository,
      useFactory: () => {
        const repo = new EventsRepository();
        loadSampleEvents(repo);
        return repo;
      },
    },
  ],
  exports: [EventsService],
})
export class EventsModule {}
