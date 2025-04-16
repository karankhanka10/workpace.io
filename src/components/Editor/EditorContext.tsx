import React, { createContext, useContext, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { CustomEditor } from '@/types/editor';
import { toast } from "sonner";

// Default initial value
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Start writing...' }],
  },
];

interface EditorContextType {
  editor: CustomEditor;
  value: Descendant[];
  setValue: React.Dispatch<React.SetStateAction<Descendant[]>>;
  userColor: string;
  username: string;
  activeUsers: { id: string; username: string; color: string; isEditing?: boolean }[];
  viewMode: 'document' | 'table' | 'kanban';
  setViewMode: React.Dispatch<React.SetStateAction<'document' | 'table' | 'kanban'>>;
  currentEditor: string | null;
  setCurrentEditor: React.Dispatch<React.SetStateAction<string | null>>;
}

const EditorContext = createContext<EditorContextType | null>(null);

const generateRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#6B5B95', '#88B04B', '#EFC050', '#7FDBFF', '#2ECC40'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomUsername = () => {
  const adjectives = ['Happy', 'Creative', 'Energetic', 'Thoughtful', 'Brilliant', 'Calm', 'Eager', 'Gentle'];
  const nouns = ['Explorer', 'Dreamer', 'Creator', 'Thinker', 'Artist', 'Writer', 'Designer', 'Innovator'];
  
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withHistory(withReact(createEditor() as CustomEditor)), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [viewMode, setViewMode] = useState<'document' | 'table' | 'kanban'>('document');
  const [currentEditor, setCurrentEditor] = useState<string | null>(null);
  
  // User information for real-time collaboration
  const userColor = useMemo(() => generateRandomColor(), []);
  const username = useMemo(() => generateRandomUsername(), []);
  
  // Mock active users (in a real app, this would come from the Liveblocks presence API)
  const activeUsers = useMemo(() => [
    { id: '1', username: 'Alice Writer', color: '#FF6B6B', isEditing: false },
    { id: '2', username: 'Bob Editor', color: '#4ECDC4', isEditing: false },
    { id: '3', username, color: userColor, isEditing: false },
  ], [username, userColor]);

  // Show toast when someone starts editing
  React.useEffect(() => {
    if (currentEditor && currentEditor !== username) {
      toast.warning(`${currentEditor} is currently editing...`, {
        duration: 3000,
      });
    }
  }, [currentEditor, username]);

  return (
    <EditorContext.Provider 
      value={{ 
        editor, 
        value, 
        setValue, 
        userColor, 
        username, 
        activeUsers, 
        viewMode, 
        setViewMode,
        currentEditor,
        setCurrentEditor
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === null) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
