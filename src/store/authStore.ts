import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, mobile?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock authentication - in a real app, this would call an API
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, accept any non-empty email/password
          if (email && password) {
            set({
              user: {
                id: 'user1',
                name: 'John Doe',
                email,
                mobile: '9876543210',
              },
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },
      
      register: async (name: string, email: string, password: string, mobile?: string) => {
        // Mock registration - in a real app, this would call an API
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (name && email && password) {
            set({
              user: {
                id: `user-${Date.now()}`,
                name,
                email,
                mobile,
              },
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Registration failed:', error);
          return false;
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'furniture-auth-storage',
    }
  )
);