
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Code } from 'lucide-react';
import { CustomEditor } from '@/types/editor';

interface SlashCommandsProps {
  editor: ReactEditor & CustomEditor;
  targetRange: Range | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SlashCommands = ({
  editor,
  targetRange,
  isOpen,
  onClose,
}: SlashCommandsProps) => {
  if (!targetRange || !isOpen) return null;

  const insertCodeBlock = () => {
    if (targetRange) {
      Transforms.delete(editor, { at: targetRange });
      Transforms.insertNodes(editor, {
        type: 'code-block',
        children: [{ text: '' }],
      });
      onClose();
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute bottom-0 left-0 translate-y-full z-50 min-w-[200px]">
          <Command className="border shadow-md">
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Blocks">
                <CommandItem onSelect={insertCodeBlock}>
                  <Code className="mr-2 h-4 w-4" />
                  <span>Code Block</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};
