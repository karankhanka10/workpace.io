
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

// Custom element types
export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
  align?: string;
};

export type HeadingElement = {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: Descendant[];
  align?: string;
};

export type BulletedListElement = {
  type: 'bulleted-list';
  children: Descendant[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  children: Descendant[];
};

export type ListItemElement = {
  type: 'list-item';
  children: Descendant[];
};

export type CheckListItemElement = {
  type: 'check-list-item';
  checked: boolean;
  children: Descendant[];
};

export type BlockQuoteElement = {
  type: 'block-quote';
  children: Descendant[];
};

export type CodeBlockElement = {
  type: 'code-block';
  language?: string;
  children: Descendant[];
};

export type CalloutElement = {
  type: 'callout';
  variant: 'info' | 'warning' | 'error' | 'success';
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  children: Descendant[];
};

export type TableElement = {
  type: 'table';
  children: TableRowElement[];
};

export type TableRowElement = {
  type: 'table-row';
  children: TableCellElement[];
};

export type TableCellElement = {
  type: 'table-cell';
  children: Descendant[];
};

export type KanbanElement = {
  type: 'kanban';
  children: KanbanColumnElement[];
};

export type KanbanColumnElement = {
  type: 'kanban-column';
  status: string;
  children: KanbanCardElement[];
};

export type KanbanCardElement = {
  type: 'kanban-card';
  id: string;
  title: string;
  status: string;
  children: Descendant[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | CheckListItemElement
  | BlockQuoteElement
  | CodeBlockElement
  | CalloutElement
  | ImageElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | KanbanElement
  | KanbanColumnElement
  | KanbanCardElement;

// Custom text types with formatting
export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
  backgroundColor?: string;
};

export type CustomText = FormattedText;

// Extend the Slate editor types
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

// Augment the slate types
declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
