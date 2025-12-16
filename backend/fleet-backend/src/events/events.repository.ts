import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EventsRepository {

  private events: any[] = [];

  constructor() {
    this.loadFile();
  }

  private loadFile() {
    try {
     const filePath = path.join(process.cwd(), 'src', 'sample.log');
 
      console.log("Reading file:", filePath);

      const content = fs.readFileSync(filePath, 'utf-8');

      this.events = content
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => JSON.parse(line));

      console.log(`Loaded ${this.events.length} events`);
    } catch (err) {
      console.error("Error reading sample.log:", err);
      this.events = [];
    }
  }

  findAll() {
    return this.events;
  }
  saveMany(events: any[]) {
  const filePath = path.join(__dirname, '..', '..', 'sample.log');
  const content = events.map(e => JSON.stringify(e)).join('\n');
  fs.writeFileSync(filePath, content, 'utf-8');

  this.events = events; // update in-memory cache
}

}
