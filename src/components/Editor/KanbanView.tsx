
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KanbanCard {
  id: string;
  title: string;
  status: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

const initialColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Project Overview', status: 'todo' },
      { id: '2', title: 'Research Phase', status: 'todo' },
      { id: '3', title: 'Content Outline', status: 'todo' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    cards: [
      { id: '4', title: 'Design Mockups', status: 'inprogress' },
      { id: '5', title: 'Frontend Development', status: 'inprogress' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: '6', title: 'Project Planning', status: 'done' },
      { id: '7', title: 'Requirements Gathering', status: 'done' },
    ],
  },
];

export const KanbanView: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [newCardTitle, setNewCardTitle] = useState<string>('');
  const [addingCardToColumn, setAddingCardToColumn] = useState<string | null>(null);
  
  const handleDragStart = (e: React.DragEvent, cardId: string, sourceColumnId: string) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    // Don't do anything if dropping on the same column
    if (sourceColumnId === targetColumnId) return;
    
    // Find the card in the source column
    const sourceColumn = columns.find(col => col.id === sourceColumnId);
    if (!sourceColumn) return;
    
    const card = sourceColumn.cards.find(card => card.id === cardId);
    if (!card) return;
    
    // Create a new array without the dragged card
    const newSourceCards = sourceColumn.cards.filter(card => card.id !== cardId);
    
    // Update the status of the card
    const updatedCard = { ...card, status: targetColumnId };
    
    // Add the card to the target column
    const newColumns = columns.map(col => {
      if (col.id === sourceColumnId) {
        return { ...col, cards: newSourceCards };
      }
      if (col.id === targetColumnId) {
        return { ...col, cards: [...col.cards, updatedCard] };
      }
      return col;
    });
    
    setColumns(newColumns);
  };
  
  const addNewCard = (columnId: string) => {
    if (!newCardTitle.trim()) return;
    
    const newCard: KanbanCard = {
      id: Date.now().toString(),
      title: newCardTitle,
      status: columnId,
    };
    
    const newColumns = columns.map(col => {
      if (col.id === columnId) {
        return { ...col, cards: [...col.cards, newCard] };
      }
      return col;
    });
    
    setColumns(newColumns);
    setNewCardTitle('');
    setAddingCardToColumn(null);
  };
  
  const deleteCard = (cardId: string, columnId: string) => {
    const newColumns = columns.map(col => {
      if (col.id === columnId) {
        return { ...col, cards: col.cards.filter(card => card.id !== cardId) };
      }
      return col;
    });
    
    setColumns(newColumns);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Kanban Board</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div 
            key={column.id}
            className="bg-muted/40 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">{column.title}</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setAddingCardToColumn(column.id)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-3">
                {column.cards.map(card => (
                  <Card 
                    key={card.id}
                    className="cursor-grab"
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                  >
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => deleteCard(card.id, column.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
                
                {addingCardToColumn === column.id && (
                  <Card>
                    <CardContent className="p-3">
                      <Input
                        placeholder="Card title"
                        value={newCardTitle}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                        autoFocus
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between p-3 pt-0">
                      <Button size="sm" variant="ghost" onClick={() => setAddingCardToColumn(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => addNewCard(column.id)}>
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
};
