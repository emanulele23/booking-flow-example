export enum Step {
  SERVICE = 0,
  STAFF = 1,
  DATETIME = 2,
  DETAILS = 3,
  CONFIRMATION = 4
}

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  price: number;
  category: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  specialties: string[]; // Service IDs they can perform
}

export interface TimeSlot {
  id: string; // e.g., "10:00"
  label: string;
  available: boolean;
}

export interface BookingState {
  step: Step;
  selectedService: Service | null;
  selectedStaff: Staff | null;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
}
