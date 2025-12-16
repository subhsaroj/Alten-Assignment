import { DiagnosticEvent } from './models/event.model';
import { randomUUID } from 'crypto';

export class EventParser {
  private regex =
    /\[(.*?)\]\s+\[VEHICLE_ID:(.*?)\]\s+\[(.*?)\]\s+\[CODE:(.*?)\]\s+\[(.*?)\]/;

  parseLine(line: string): DiagnosticEvent | null {
    const match = this.regex.exec(line);
    if (!match) return null;

    const [_, timestamp, vehicleId, level, code, message] = match;

    return {
      id: randomUUID(),
      timestamp: new Date(timestamp),
      vehicleId,
      level: level as any,
      code,
      message,
    };
  }
}
