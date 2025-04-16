
import React from 'react';
import { useEditor } from './EditorContext';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table, Type } from 'lucide-react';

export const ViewModeSwitch: React.FC = () => {
  const { viewMode, setViewMode } = useEditor();

  return (
    <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
      <Button
        variant={viewMode === 'document' ? 'default' : 'ghost'}
        size="sm"
        className="h-8"
        onClick={() => setViewMode('document')}
      >
        <Type className="h-4 w-4 mr-1" />
        Doc
      </Button>
      <Button
        variant={viewMode === 'table' ? 'default' : 'ghost'}
        size="sm"
        className="h-8"
        onClick={() => setViewMode('table')}
      >
        <Table className="h-4 w-4 mr-1" />
        Table
      </Button>
      <Button
        variant={viewMode === 'kanban' ? 'default' : 'ghost'}
        size="sm"
        className="h-8"
        onClick={() => setViewMode('kanban')}
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        Kanban
      </Button>
    </div>
  );
};
