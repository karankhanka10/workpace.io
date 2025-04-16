
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';

interface TableRowData {
  id: string;
  name: string;
  status: string;
  date: string;
}

const initialData: TableRowData[] = [
  { id: '1', name: 'Project Overview', status: 'To Do', date: '2023-04-15' },
  { id: '2', name: 'Research Phase', status: 'In Progress', date: '2023-04-16' },
  { id: '3', name: 'Design Mockups', status: 'In Progress', date: '2023-04-17' },
  { id: '4', name: 'Content Writing', status: 'To Do', date: '2023-04-18' },
  { id: '5', name: 'Initial Testing', status: 'Done', date: '2023-04-19' },
];

export const TableView: React.FC = () => {
  const [data, setData] = useState<TableRowData[]>(initialData);
  const [editingCell, setEditingCell] = useState<{ id: string; field: keyof TableRowData } | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const startEditing = (id: string, field: keyof TableRowData, value: string) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (!editingCell) return;
    
    setData(data.map(row => {
      if (row.id === editingCell.id) {
        return { ...row, [editingCell.field]: editValue };
      }
      return row;
    }));
    
    setEditingCell(null);
  };

  const addRow = () => {
    const newId = String(Math.max(...data.map(row => parseInt(row.id))) + 1);
    setData([...data, { id: newId, name: 'New Item', status: 'To Do', date: new Date().toISOString().split('T')[0] }]);
  };

  const deleteRow = (id: string) => {
    setData(data.filter(row => row.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Table View</h2>
        <Button onClick={addRow} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Row
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell
                  onClick={() => startEditing(row.id, 'name', row.name)}
                  className="cursor-pointer"
                >
                  {editingCell?.id === row.id && editingCell.field === 'name' ? (
                    <Input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell
                  onClick={() => startEditing(row.id, 'status', row.status)}
                  className="cursor-pointer"
                >
                  {editingCell?.id === row.id && editingCell.field === 'status' ? (
                    <Select
                      value={editValue}
                      onValueChange={value => {
                        setEditValue(value);
                        setTimeout(saveEdit, 0);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        row.status === 'Done'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : row.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  )}
                </TableCell>
                <TableCell
                  onClick={() => startEditing(row.id, 'date', row.date)}
                  className="cursor-pointer"
                >
                  {editingCell?.id === row.id && editingCell.field === 'date' ? (
                    <Input
                      type="date"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={saveEdit}
                      autoFocus
                    />
                  ) : (
                    new Date(row.date).toLocaleDateString()
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => deleteRow(row.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
