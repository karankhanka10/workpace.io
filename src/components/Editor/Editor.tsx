
import React, { useCallback, useMemo, useState } from 'react';
import { Slate, Editable, RenderElementProps, RenderLeafProps } from 'slate-react';
import { Range } from 'slate';
import { useEditor } from './EditorContext';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './Toolbar';
import { ActiveCollaborators } from './ActiveCollaborators';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import { ViewModeSwitch } from './ViewModeSwitch';
import { TableView } from './TableView';
import { KanbanView } from './KanbanView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2 } from 'lucide-react';
import { SlashCommands } from './SlashCommands';

export const Editor: React.FC = () => {
  const { editor, value, setValue, viewMode, username, activeUsers } = useEditor();
  const { theme } = useTheme();

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const editorClass = useMemo(() => 
    cn(
      'prose max-w-none w-full',
      'min-h-[60vh] p-8',
      'rounded-lg border bg-card shadow-sm',
      'outline-none transition-all duration-200',
      'focus:ring-2 focus:ring-primary/20',
      theme === 'dark' ? 'prose-invert' : 'prose-stone'
    ), 
  [theme]);

  const [documentTitle, setDocumentTitle] = React.useState("Untitled Document");
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [slashTargetRange, setSlashTargetRange] = useState<Range | null>(null);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === '/' && editor.selection) {
      setSlashTargetRange(editor.selection);
      event.preventDefault();
    } else if (event.key === 'Escape' && slashTargetRange) {
      setSlashTargetRange(null);
    }
  }, [editor.selection, slashTargetRange]);

  return (
    <div className="flex flex-col w-full h-full bg-background/40 backdrop-blur-sm">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <Input
                  className="text-xl font-semibold bg-transparent border-none h-9 px-0 focus-visible:ring-1"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  autoFocus
                />
              ) : (
                <Button
                  variant="ghost"
                  className="text-xl font-semibold px-0 hover:bg-transparent hover:text-primary flex items-center gap-2"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {documentTitle}
                  <Edit2 size={16} className="text-muted-foreground" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <ActiveCollaborators />
              <ViewModeSwitch />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Slate 
          editor={editor} 
          initialValue={value} 
          onChange={newValue => setValue(newValue)}
        >
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            {viewMode === 'document' && (
              <div className="space-y-4">
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md rounded-lg">
                  <Toolbar />
                </div>
                <div className="relative transition-all duration-200 ease-in-out">
                  <Editable
                    className={editorClass}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Type / for commands..."
                    spellCheck
                    onKeyDown={onKeyDown}
                  />
                  {slashTargetRange && (
                    <SlashCommands
                      editor={editor}
                      targetRange={slashTargetRange}
                      isOpen={!!slashTargetRange}
                      onClose={() => setSlashTargetRange(null)}
                    />
                  )}
                </div>
              </div>
            )}

            {viewMode === 'table' && <TableView />}
            {viewMode === 'kanban' && <KanbanView />}
          </div>
        </Slate>
      </div>
    </div>
  );
};
