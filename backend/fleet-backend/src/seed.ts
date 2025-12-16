import * as fs from 'fs';
import { EventParser } from './events/events.parser';
import { EventsRepository } from './events/events.repository';

export function loadSampleEvents(repo: EventsRepository) {
  const parser = new EventParser();

  // Adjust path to root-level file
  const filePath = process.cwd() + '/sample.log';

  if (!fs.existsSync(filePath)) {
    console.warn('⚠ No sample.log found. Skipping seed.');
    return;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  const events = lines
    .map((l) => parser.parseLine(l))
    .filter((e) => e !== null);

  repo.saveMany(events as any);

  console.log(`✔ Loaded ${events.length} events from sample.log`);
}
