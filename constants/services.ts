import { Service, Barber } from '@/types';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Saç Kesimi',
    price: 150,
    duration: 30,
    description: 'Klasik saç kesimi ve yıkama',
    image: require('../assets/icon.png'),
    isActive: true,
    sortOrder: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Sakal Kesimi',
    price: 80,
    duration: 20,
    description: 'Sakal şekillendirme ve bakım',
    image: require('../assets/icon.png'),
    isActive: true,
    sortOrder: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Saç + Sakal Paket',
    price: 200,
    duration: 45,
    description: 'Saç kesimi ve sakal kesimi bir arada',
    image: require('../assets/icon.png'),
    isActive: true,
    sortOrder: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Cilt Bakımı',
    price: 100,
    duration: 25,
    description: 'Yüz maskesi ve cilt bakımı',
    image: require('../assets/icon.png'),
    isActive: true,
    sortOrder: 4,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Tam Bakım Paket',
    price: 280,
    duration: 60,
    description: 'Saç, sakal ve cilt bakımı komple',
    image: require('../assets/icon.png'),
    isActive: true,
    sortOrder: 5,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'tarik',
    name: 'Tarık Bey',
    isOwner: true,
  },
  {
    id: 'omer',
    name: 'ÖMER JR',
    isOwner: false,
  },
];

export const WHATSAPP_NUMBER = '905335494014';

/**
 * Build a wa.me URL with encoded message text. Expects WHATSAPP_NUMBER in E.164 without leading +
 */
export const getWhatsAppUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const BARBER_NAME = 'Tarık Yalçın';
export const SALON_NAME = 'TY-HAİR DESIGN';
