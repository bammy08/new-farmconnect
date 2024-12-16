'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react'; // Import ReactNode
import { SessionProvider } from 'next-auth/react';
interface ProviderProps {
  children: ReactNode; // Define the type of children
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
