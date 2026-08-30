import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className = '' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync external value changes (e.g. initial load or reset)
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Prevent default React onPaste from stripping formatting if it was modified previously
  const handlePaste = (e: React.ClipboardEvent) => {
    // We let the native browser paste handle it to keep HTML and images
    // Just ensure we capture the resulting HTML after a short tick
    setTimeout(() => {
      handleInput();
    }, 0);
  };

  return (
    <div className={`relative ${className}`}>
      {/* We use a simple contenteditable div */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        onPaste={handlePaste}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 min-h-[200px] max-h-[500px] overflow-y-auto editor-content"
        style={{ outline: 'none' }}
        data-placeholder={placeholder}
      />
      {(!value || value === '<br>') && placeholder && (
        <div className="absolute top-3 left-4 text-slate-400 pointer-events-none text-sm font-medium">
          {placeholder}
        </div>
      )}
    </div>
  );
}
