export interface DiagnosticEvent {
  id: string;
  timestamp: string;
  vehicleId: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  code: string;
  message: string;
}

export interface EventFilters {
  vehicle?: string;
  code?: string;
  level?: string;
  from?: string;
  to?: string;

  // added for pagination
  page?: number;
  limit?: number;
}

