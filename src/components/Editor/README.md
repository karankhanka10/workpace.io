
# Notion-like Collaborative Editor

This is a modern, collaborative rich text editor built with React, TypeScript, and Slate.js. It features a clean, minimal UI inspired by Notion with support for real-time collaboration.

## Features

### Rich Text Editing
- Multiple block types: paragraphs, headings, lists, quotes, code blocks
- Inline formatting: bold, italic, underline, code
- Custom blocks: callouts, to-do items

### Block-Level Reordering
- Drag and drop functionality for content blocks
- Visual indicators during dragging operations

### Real-Time Collaboration
- Multiple users can edit simultaneously
- User presence indicators
- Cursor position sharing

### Database Views
- Table view with inline editable cells
- Kanban board with drag-and-drop cards
- Dynamic content creation and editing

### Polished UI
- Clean, minimal layout inspired by Notion
- Collapsible sidebar for navigation
- Light/dark theme support

## Implementation Details

The editor is built with the following technologies:
- **Slate.js**: Core editor framework
- **TypeScript**: Type-safe components and data structures
- **@dnd-kit**: Drag and drop functionality
- **Liveblocks**: Real-time collaboration
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components

## Project Structure

- `types/editor.ts`: TypeScript interfaces for the editor
- `components/Editor/EditorContext.tsx`: Central context for editor state
- `components/Editor/Editor.tsx`: Main editor component
- `components/Editor/Element.tsx`: Renders different block types
- `components/Editor/Leaf.tsx`: Renders inline text with formatting
- `components/Editor/Toolbar.tsx`: Rich text formatting toolbar
- `components/Editor/TableView.tsx`: Database table view
- `components/Editor/KanbanView.tsx`: Kanban board view
- `components/Layout`: Application layout components

## Future Improvements

- Full real-time collaboration implementation with Liveblocks
- More block types: embeds, dividers, databases
- Full drag-and-drop implementation with nested blocks
- Mobile-responsive design
- Export options (PDF, Markdown)
