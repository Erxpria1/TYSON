/**
 * Type Definitions for TY-HAIR-DESIGN
 * Firebase Firestore Database Schema
 */

// ===============================
// USER ROLES
// ===============================

export type UserRole = 'customer' | 'barber';

// ===============================
// BARBER COLLECTION
// ===============================

export interface Barber {
  id: string;
  name: string;
  isOwner: boolean;
  whatsappNumber?: string;
}

// ===============================
// USER COLLECTION
// ===============================

export interface User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ===============================
// APPOINTMENT COLLECTION
// ===============================

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerUid?: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ===============================
// SERVICE COLLECTION
// ===============================

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  // `image` can be a remote URL (string) or a local asset (number returned by require())
  image?: string | number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
