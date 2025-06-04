import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../lib/types';
import axios from 'axios';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
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

          console.log('response>>>>>>>>>>>>>>>>>', response)

          if (response) {
            set({ user: response.data, isAuthenticated: true });
            // Optionally, store the token if your app uses it (e.g., in localStorage or an httpOnly cookie handled by the server)
            // For this example, we'll assume the token is handled or not directly needed in the frontend store after login.
            // If you need to store it: localStorage.setItem('authToken', response.data.token);
            console.log('Login successful:', response.data.user);
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
        // If you stored a token, remove it on logout
        // localStorage.removeItem('authToken');
        console.log('User logged out.');
      },
      
      // updateProfile: (updates: Partial<User>) => {
      //   set((state) => ({
      //     user: state.user ? { ...state.user, ...updates } : null,
      //   }));
      // },
       updateProfile: async (updates: Partial<User>) => {
        const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
        if (!baseApiUrl) {
          console.error('VITE_API_BASE_URL is not defined. Cannot make API call.');
          return false;
        }

        try {
          // Assuming your API expects a PUT/PATCH request to update the profile
          // And that it requires authentication (e.g., a token sent in headers, or session cookie)
          // Axios instance might need to be configured with credentials or auth token interceptor
          const response = await axios.put<UpdateProfileResponse>(`${baseApiUrl}/api/auth/profile`, updates);

          console.log('first>>>>>>>>>>>>>>>>>', response);
          if (response) {
            set({ user: response.data, isAuthenticated: true });
            console.log('Profile updated successfully:', response.data);
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