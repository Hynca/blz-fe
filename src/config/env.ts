/**
 * Environment configuration utility
 * Access environment variables in a centralized way
 */

export const env = {
    apiUrl: import.meta.env.VITE_API_URL as string
};
