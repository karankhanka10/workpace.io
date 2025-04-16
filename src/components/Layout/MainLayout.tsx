
import React from 'react';
import { Sidebar } from './Sidebar';
import { EditorProvider } from '@/components/Editor/EditorContext';
import { ThemeProvider } from '@/components/ThemeProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system">
      <EditorProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </EditorProvider>
    </ThemeProvider>
  );
};
