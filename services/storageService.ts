
import { Product, Category } from '../types';

const STORAGE_KEY = 'dessert_room_products';
const PASSCODE_KEY = 'dessert_room_admin_passcode';
const DEFAULT_PASSCODE = '102938765aacc';

const DEFAULT_PRODUCTS: (Product & { sku: string; stock: number })[] = [
  { id: '1', sku: 'CK-EGL-001', name: 'Earl Grey & Lavender', price: 85, category: Category.CAKES, description: 'Light Earl Grey sponge infused with organic lavender buds.', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop', stock: 12, flavors: ['Classic', 'Extra Lavender'], sizes: ['6 inch', '8 inch'] },
  { id: '2', sku: 'CP-RVV-002', name: 'Raspberry Velvet', price: 24, category: Category.CUPCAKES, description: 'Classic red velvet base topped with fresh raspberry coulis.', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop', stock: 48, flavors: ['Raspberry', 'Cream Cheese'], sizes: ['Single', 'Box of 6'] },
  { id: '3', sku: 'MC-RSP-003', name: 'Rose Petal Macarons', price: 32, category: Category.MACARONS, description: 'Box of 12, featuring delicate Bulgarian rose notes.', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800&auto=format&fit=crop', stock: 20, flavors: ['Rose'], sizes: ['Box of 12'] },
];

export const getStoredProducts = (): any[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Fix: Added missing passcode management functions for administrative access
export const getAdminPasscode = (): string => {
  return localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;
};

export const saveAdminPasscode = (passcode: string) => {
  localStorage.setItem(PASSCODE_KEY, passcode);
};
