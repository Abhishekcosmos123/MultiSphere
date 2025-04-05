import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export const StorageKeys = {
  TOKEN: 'token',
  USER: 'user',
  SELECTED_MODULE: 'selectedModule',
} as const;

export const storage = {
  get: (key: string) => {
    try {
      return getCookie(key);
    } catch (error) {
      return null;
    }
  },

  set: (key: string, value: string) => {
    try {
      setCookie(key, value, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  },

  remove: (key: string) => {
    try {
      deleteCookie(key);
    } catch (error) {
      console.error('Error removing cookie:', error);
    }
  },

  getJson: (key: string) => {
    try {
      const value = getCookie(key);
      if (value) {
        const stringValue = typeof value === 'string' ? value : String(value);
        return JSON.parse(stringValue);
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  setJson: (key: string, value: any) => {
    try {
      setCookie(key, JSON.stringify(value), { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    } catch (error) {
      console.error('Error setting JSON cookie:', error);
    }
  },
};

// Custom hook for safely accessing cookies in client components
export function useCookie<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const cookieValue = storage.getJson(key);
      return cookieValue !== null ? cookieValue : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      const cookieValue = storage.getJson(key);
      if (cookieValue !== null) {
        setValue(cookieValue);
      }
    } catch (error) {
      console.error('Error reading cookie:', error);
    }
  }, [key]);

  const updateValue = (newValue: T) => {
    try {
      storage.setJson(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error('Error updating cookie:', error);
    }
  };

  return [value, updateValue];
} 