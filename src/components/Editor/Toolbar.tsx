
import React, { useCallback } from 'react';
import { Editor, Element, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  Quote,
  ListOrdered,
  List,
  CheckSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEditor } from './EditorContext';
import { cn } from '@/lib/utils';
import { CustomEditor, CustomText } from '@/types/editor';

interface FormatButtonProps {
  format: keyof Omit<CustomText, 'text'>;
  icon: React.ReactNode;
  disabled?: boolean;
}

const FormatButton: React.FC<FormatButtonProps> = ({ format, icon, disabled }) => {
  const editor = useSlate();
  const isFormatActive = useCallback(() => {
    try {
      const marks = Editor.marks(editor);
      return marks ? marks[format] === true : false;
    } catch (error) {
      console.error("Error checking format:", error);
      return false;
    }
  }, [editor, format]);

  const isActive = isFormatActive();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        try {
          if (editor) {
            Editor.addMark(editor, format, !isActive);
          }
        } catch (error) {
          console.error("Error adding mark:", error);
        }
      }}
      disabled={disabled}
      className={cn(isActive && 'bg-secondary text-secondary-foreground')}
    >
      {icon}
    </Button>
  );
};

interface BlockButtonProps {
  format: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

const BlockButton: React.FC<BlockButtonProps> = ({ format, icon, disabled }) => {
  const editor = useSlate();
  const isBlockActive = useCallback(() => {
    try {
      const [match] = Editor.nodes(editor, {
        match: n =>
          Element.isElement(n) && n.type === format,
      });
      return !!match;
    } catch (error) {
      console.error("Error checking block type:", error);
      return false;
    }
  }, [editor, format]);

  const isActive = isBlockActive();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        try {
          Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : format },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
          );
        } catch (error) {
          console.error("Error setting block type:", error);
        }
      }}
      disabled={disabled}
      className={cn(isActive && 'bg-secondary text-secondary-foreground')}
    >
      {icon}
    </Button>
  );
};

export const Toolbar = () => {
  const { editor, currentEditor, username } = useEditor();
  const isDisabled = currentEditor && currentEditor !== username;

  // Only render the toolbar if we're inside a Slate context
  try {
    // Check if we're in a Slate context
    useSlate();
    
    return (
      <div className="border bg-background/80 backdrop-blur-md rounded-lg p-2 flex items-center gap-1 overflow-x-auto">
        <FormatButton format="bold" icon={<Bold size={15} />} disabled={isDisabled} />
        <FormatButton format="italic" icon={<Italic size={15} />} disabled={isDisabled} />
        <FormatButton format="underline" icon={<Underline size={15} />} disabled={isDisabled} />
        <FormatButton format="code" icon={<Code size={15} />} disabled={isDisabled} />
        
        <Separator orientation="vertical" className="mx-2 h-6" />
        
        <BlockButton format="heading-one" icon={<Heading1 size={15} />} disabled={isDisabled} />
        <BlockButton format="heading-two" icon={<Heading2 size={15} />} disabled={isDisabled} />
        <BlockButton format="block-quote" icon={<Quote size={15} />} disabled={isDisabled} />
        <BlockButton format="numbered-list" icon={<ListOrdered size={15} />} disabled={isDisabled} />
        <BlockButton format="bulleted-list" icon={<List size={15} />} disabled={isDisabled} />
        <BlockButton format="check-list-item" icon={<CheckSquare size={15} />} disabled={isDisabled} />
        
        {isDisabled && (
          <span className="text-sm text-muted-foreground ml-2">
            {currentEditor} is editing...
          </span>
        )}
      </div>
    );
  } catch (error) {
    // If useSlate throws an error, we're not in a Slate context
    // Return a simpler version or null
    console.warn("Toolbar rendered outside Slate context");
    return null;
  }
};
