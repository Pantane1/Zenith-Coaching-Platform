import { User, UserRole, Booking, Coach } from "../types";
import { MOCK_COACHES } from "../constants";

// Simulating a database in localStorage
const STORAGE_KEYS = {
  USERS: 'zenith_users',
  BOOKINGS: 'zenith_bookings',
  CURRENT_USER: 'zenith_current_user'
};

// --- Auth Services ---

export const loginUser = async (email: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Admin backdoor for demo
  if (email.includes('admin')) {
    const admin: User = { id: 'admin1', name: 'Admin User', email, role: UserRole.ADMIN };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(admin));
    return admin;
  }

  const user: User = { id: 'user_' + Date.now(), name: email.split('@')[0], email, role: UserRole.CLIENT };
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return stored ? JSON.parse(stored) : null;
};

// --- Data Services ---

export const getCoaches = async (): Promise<Coach[]> => {
  // Simulate API call
  return Promise.resolve(MOCK_COACHES);
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate payment processing time

  const newBooking: Booking = {
    ...booking,
    id: 'bk_' + Date.now(),
    status: 'confirmed'
  };

  const existingBookings = getBookings();
  const updatedBookings = [...existingBookings, newBooking];
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));

  // In a real app, this is where you'd call EMAIL_CONFIG API to send confirmation
  console.log(`[MOCK EMAIL SERVICE] Sending confirmation to user ${booking.userId} via ${booking.coachName}`);

  return newBooking;
};

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return stored ? JSON.parse(stored) : [];
};

export const getUserBookings = (userId: string): Booking[] => {
  return getBookings().filter(b => b.userId === userId);
};

export const getAllBookings = (): Booking[] => {
  return getBookings(); // Admin access
};