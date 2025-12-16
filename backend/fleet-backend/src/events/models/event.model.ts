export interface DiagnosticEvent {
  id: string;
  timestamp: Date;
  vehicleId: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  code: string;
  message: string;
}
