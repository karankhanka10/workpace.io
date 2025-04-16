
# Notion-like Collaborative Editor

A powerful, modern collaborative editor with rich text editing, block reordering, real-time collaboration, and database views inspired by Notion.

![Notion-like Editor](https://imgur.com/a/pzDdnLR)

## Features

### ✍️ Rich Text Editing
- **Block Types**: Paragraphs, headings (H1-H6), bullet lists, numbered lists, checklists, code blocks, quotes
- **Inline Formatting**: Bold, italic, underline, code, links
- **Custom Blocks**: Callouts with different variants (info, warning, error, success)

### 🧱 Block-Level Reordering
- Drag and drop blocks to reorder them
- Visual indicators for drag operations
- Smooth animations during block movement

### 🧑‍🤝‍🧑 Real-Time Collaboration
- Multiple users can edit simultaneously
- User presence indicators show who's currently editing
- Cursor positions and selections are shared in real-time

### 📊 Database Views
- **Table View**: Editable cells with support for text, select, and date fields
- **Kanban Board**: Drag and drop cards between status columns
- Add, edit, and delete rows or cards dynamically

### 💅 Polished UI
- Clean, minimal design inspired by Notion
- Collapsible sidebar for navigation
- Light/dark theme support
- Custom typography and spacing for optimal readability

## Tech Stack

- **React**: UI components and state management
- **TypeScript**: Type-safe code
- **Slate.js**: Extensible rich text editor framework
- **@dnd-kit**: Drag and drop functionality
- **Liveblocks**: Real-time collaboration capabilities
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at `http://localhost:8080`

## Usage

### Editor Basics
- Click on any text to start editing
- Use the toolbar to format text or change block types
- Drag blocks to reorder them

### Switching Views
- Use the view switch buttons to toggle between Document, Table, and Kanban views
- Each view persists its own data model

### Collaboration
- Multiple users can join the same document
- User avatars appear in the top right to show who's currently editing
- Changes are synchronized in real-time

## Project Structure

The application is organized following a component-based architecture:

- `/src/types`: TypeScript interfaces and types
- `/src/components/Editor`: Editor-related components
- `/src/components/Layout`: Application layout components
- `/src/pages`: Main application pages

## Future Enhancements

- Enhanced collaboration features with cursors and selections
- More block types (embeds, databases, dividers)
- Comments and suggestions
- Version history
- Export options (PDF, Markdown, HTML)
- Mobile-responsive design
