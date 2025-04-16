
import React from 'react';
import { RenderLeafProps } from 'slate-react';

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let formattedChildren = children;

  if (leaf.bold) {
    formattedChildren = <strong>{formattedChildren}</strong>;
  }

  if (leaf.italic) {
    formattedChildren = <em>{formattedChildren}</em>;
  }

  if (leaf.underline) {
    formattedChildren = <u>{formattedChildren}</u>;
  }

  if (leaf.code) {
    formattedChildren = <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">{formattedChildren}</code>;
  }

  const style: React.CSSProperties = {};
  
  if (leaf.color) {
    style.color = leaf.color;
  }
  
  if (leaf.backgroundColor) {
    style.backgroundColor = leaf.backgroundColor;
  }

  return (
    <span {...attributes} style={style}>
      {formattedChildren}
    </span>
  );
};
