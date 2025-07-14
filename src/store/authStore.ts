import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../lib/types';
import axios from 'axios';



interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // bearerToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, mobile?: string) => Promise<boolean>;
  logout: () => void;
  // updateProfile: (updates: Partial<User>) => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

// Define a type for the expected API response
interface LoginResponse {
  user: User;
  token: string; // Assuming your API returns a token
}

// Define a type for the expected update profile API response
interface UpdateProfileResponse {
  user: User;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      bearerToken: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseApiUrl) {
          console.error('VITE_API_BASE_URL is not defined. Cannot make API call.');
          return false;
        }

        try {
          const response = await axios.post<LoginResponse>(`${baseApiUrl}/api/auth/login`, {
            email,
            password,
          });

          if (response) {
            set({ user: response.data.user, isAuthenticated: true });
            localStorage.setItem('authToken', response.data.token)
            return true;
          } else {
            console.error('Login failed: Invalid response from server.', response);
            return false;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Login API error:', error.response?.data || error.message);
          } else {
            console.error('Login failed with an unexpected error:', error);
          }
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const baseApiUrl = import.meta.env.VITE_API_BASE_URL;


    
          const response = await axios.post<{ user: User; token: string }>(
            `${baseApiUrl}/api/auth/register`,
            userData
          );

          if (response.data && response.data.user && response.data.token) {
            localStorage.setItem('authToken', response.data.token)
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          }
          set({ isLoading: false, error: 'Registration failed: Invalid response from server.' });
          return false;
        } catch (error) {
          let errorMessage = 'An unknown error occurred during registration.';
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message || 'Registration failed.';
            console.error('Registration error:', error.response?.data || error.message);
          } else {
            console.error('Unexpected registration error:', error);
          }
          set({ isLoading: false, error: errorMessage, isAuthenticated: false, user: null });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        // If you stored a token, remove it on logout
        // localStorage.removeItem('authToken');
        console.log('User logged out.');
      },
      updateProfile: async (updates: Partial<User>) => {
        const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('authToken'); // Or wherever you're storing the token

        if (!baseApiUrl) {
          console.error('VITE_API_BASE_URL is not defined. Cannot make API call.');
          return false;
        }

        if (!token) {
          console.error('No auth token found. Cannot make authorized request.');
          return false;
        }

        try {
          const response = await axios.put<UpdateProfileResponse>(
            `${baseApiUrl}/api/auth/profile`,
            updates,
            {
              headers: {
                Authorization: `Bearer ${token}`, // 👈 Attach the token here
                'Content-Type': 'application/json'
              }
            }
          );

          if (response) {
            set({ user: response.data.user, isAuthenticated: true });
            // console.log('Profile updated successfully:', response.data);
            return true;
          }

          console.error('Profile update failed: Invalid response from server.', response);
          return false;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Profile update API error:', error.response?.data || error.message);
          } else {
            console.error('Profile update failed with an unexpected error:', error);
          }
          return false;
        }
      }

    }),
    {
      name: 'furniture-auth-storage',
    }
  )
);