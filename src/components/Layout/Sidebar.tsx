
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Table,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const documents = [
    { id: '1', title: 'Project Overview', icon: FileText },
    { id: '2', title: 'Meeting Notes', icon: FileText },
    { id: '3', title: 'Quarterly Goals', icon: FileText },
    { id: '4', title: 'Team Roadmap', icon: Table },
    { id: '5', title: 'Project Kanban', icon: LayoutDashboard },
  ];

  return (
    <div
      className={cn(
        'h-screen flex flex-col bg-muted/40 border-r transition-all duration-300 overflow-hidden',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 h-14">
        {!collapsed && <span className="font-semibold">Notion Clone</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            {!collapsed && <span className="text-sm font-medium">Workspace</span>}
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-7 w-7", collapsed && "mx-auto")}
            >
              <PlusCircle size={16} />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-120px)]" type="hover">
            <div className="space-y-1">
              {documents.map((doc) => (
                <Button
                  key={doc.id}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    collapsed ? 'px-0' : 'px-2'
                  )}
                >
                  <doc.icon size={16} className={cn(collapsed ? 'mx-auto' : 'mr-2')} />
                  {!collapsed && <span className="truncate">{doc.title}</span>}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="border-t p-3">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className={cn('justify-start', collapsed ? 'px-0' : 'px-2')}
          >
            <Users size={16} className={cn(collapsed ? 'mx-auto' : 'mr-2')} />
            {!collapsed && <span>Share</span>}
          </Button>
          <Button
            variant="ghost"
            className={cn('justify-start', collapsed ? 'px-0' : 'px-2')}
            onClick={toggleTheme}
          >
            <Settings size={16} className={cn(collapsed ? 'mx-auto' : 'mr-2')} />
            {!collapsed && <span>Settings</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
