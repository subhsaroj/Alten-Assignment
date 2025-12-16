import { writeFileSync } from 'fs';

const vehicles = ['V001', 'V002', 'V003', 'V004', 'V005', 'V006'];
const levels = ['ERROR', 'WARN', 'INFO'];
const codes = ['U0420', 'P0300', 'U1000', 'P0420', 'B0028', 'C0035', 'U0121'];

function randomDate() {
  const start = new Date(2024, 0, 1).getTime();
  const end = new Date(2024, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start)).toISOString();
}

function randomMessage(code: string) {
  const messages: Record<string, string> = {
    U0420: 'Lost communication with control module.',
    P0300: 'Random misfire detected.',
    U1000: 'CAN communication failure.',
    P0420: 'Catalyst system efficiency below threshold.',
    B0028: 'Airbag sensor malfunction.',
    C0035: 'ABS wheel speed sensor failure.',
    U0121: 'Lost communication with ABS module.'
  };
  return messages[code];
}

let lines = '';

for (let i = 0; i < 1000; i++) {
  const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const code = codes[Math.floor(Math.random() * codes.length)];

  const entry = {
    timestamp: randomDate(),
    vehicleId: vehicle,
    level,
    code,
    message: randomMessage(code)
  };

  lines += JSON.stringify(entry) + '\n';
}

writeFileSync('sample.log', lines);

console.log('sample.log generated with 1000 entries!');
