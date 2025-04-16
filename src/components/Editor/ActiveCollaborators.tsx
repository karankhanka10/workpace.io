
import React from 'react';
import { useEditor } from './EditorContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const ActiveCollaborators: React.FC = () => {
  const { activeUsers } = useEditor();

  return (
    <div className="flex -space-x-2">
      {activeUsers.map((user, index) => (
        <TooltipProvider key={user.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar 
                className="h-8 w-8 border-2 border-background" 
                style={{ backgroundColor: user.color }}
              >
                <AvatarFallback style={{ color: '#ffffff' }}>
                  {user.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.username}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
