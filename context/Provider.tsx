'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react'; // Import ReactNode

interface ProviderProps {
  children: ReactNode; // Define the type of children
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default Provider;
