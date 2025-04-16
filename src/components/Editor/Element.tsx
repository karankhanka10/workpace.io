import React from 'react';
import { RenderElementProps } from 'slate-react';

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  
  const style: { [key: string]: string } = {};
  if ('align' in element) {
    const alignment = element.align as string;
    if (['left', 'center', 'right', 'justify'].includes(alignment)) {
      style.textAlign = alignment;
    }
  }

  switch (element.type) {
    case 'paragraph':
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    case 'heading':
      const level = (element as any).level as number;
      switch (level) {
        case 1:
          return <h1 style={style} {...attributes}>{children}</h1>;
        case 2:
          return <h2 style={style} {...attributes}>{children}</h2>;
        case 3:
          return <h3 style={style} {...attributes}>{children}</h3>;
        case 4:
          return <h4 style={style} {...attributes}>{children}</h4>;
        case 5:
          return <h5 style={style} {...attributes}>{children}</h5>;
        case 6:
          return <h6 style={style} {...attributes}>{children}</h6>;
        default:
          return <h3 style={style} {...attributes}>{children}</h3>;
      }
    case 'bulleted-list':
      return (
        <ul {...attributes}>
          {children}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol {...attributes}>
          {children}
        </ol>
      );
    case 'list-item':
      return (
        <li {...attributes}>
          {children}
        </li>
      );
    case 'check-list-item':
      return (
        <div
          className="flex items-start gap-2 my-2"
          {...attributes}
        >
          <span contentEditable={false}>
            <input
              type="checkbox"
              checked={(element as any).checked}
              onChange={() => {
                console.log('Checkbox changed');
              }}
              className="mt-1"
            />
          </span>
          <span>{children}</span>
        </div>
      );
    case 'block-quote':
      return (
        <blockquote {...attributes}>
          {children}
        </blockquote>
      );
    case 'code-block':
      return (
        <pre className="bg-muted/50 p-4 rounded-lg my-2 overflow-x-auto">
          <code {...attributes} className="text-sm font-mono">
            {children}
          </code>
        </pre>
      );
    case 'callout':
      const variant = (element as any).variant || 'info';
      const variantClasses = {
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-900 dark:text-yellow-200',
        error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200',
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-900 dark:text-green-200',
      };
      
      return (
        <div
          className={`p-4 my-4 border-l-4 rounded ${variantClasses[variant]}`}
          {...attributes}
        >
          {children}
        </div>
      );
    case 'image':
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img
              src={(element as any).url}
              alt=""
              className="max-w-full h-auto object-contain my-4"
            />
          </div>
          {children}
        </div>
      );
    default:
      return (
        <p {...attributes}>
          {children}
        </p>
      );
  }
};
