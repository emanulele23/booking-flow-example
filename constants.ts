import { Service, Staff } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Consultation & Assessment',
    description: 'Initial meeting to discuss your needs and plan a tailored approach.',
    durationMin: 30,
    price: 45,
    category: 'General'
  },
  {
    id: 's2',
    name: 'Deep Tissue Massage',
    description: 'Intense pressure to relieve severe tension in the muscle and connective tissue.',
    durationMin: 60,
    price: 90,
    category: 'Therapy'
  },
  {
    id: 's3',
    name: 'Physiotherapy Session',
    description: 'Rehabilitation treatment for injury recovery and mobility improvement.',
    durationMin: 45,
    price: 75,
    category: 'Medical'
  },
  {
    id: 's4',
    name: 'Osteopathy Adjustment',
    description: 'Holistic manual therapy focusing on the musculoskeletal system.',
    durationMin: 45,
    price: 85,
    category: 'Medical'
  },
  {
    id: 's5',
    name: 'Relaxation Massage',
    description: 'Gentle, flowing strokes to promote relaxation and reduce stress.',
    durationMin: 60,
    price: 80,
    category: 'Therapy'
  },
  {
    id: 's6',
    name: 'Sports Recovery',
    description: 'Specialized session for athletes to speed up recovery after intense activity.',
    durationMin: 50,
    price: 95,
    category: 'Performance'
  }
];

export const STAFF: Staff[] = [
  {
    id: 'st1',
    name: 'Dr. Sarah Lin',
    role: 'Senior Physiotherapist',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
    specialties: ['s1', 's3', 's6']
  },
  {
    id: 'st2',
    name: 'Marcus Thorne',
    role: 'Massage Therapist',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
    specialties: ['s2', 's5', 's6']
  },
  {
    id: 'st3',
    name: 'Elena Rossi',
    role: 'Osteopath',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
    specialties: ['s1', 's4', 's3']
  }
];

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];
