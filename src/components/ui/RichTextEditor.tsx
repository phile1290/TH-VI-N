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

  const handlePaste = (e: React.ClipboardEvent) => {
    const html = e.clipboardData.getData('text/html');
    if (html) {
      e.preventDefault();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const images = doc.querySelectorAll('img');
      
      images.forEach(img => {
        // Many CMS/websites use data-src or data-lazy-src for images
        const realSrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('src');
        if (realSrc) {
          img.setAttribute('src', realSrc);
        }
        // Remove srcset and class to avoid responsive loading issues with relative paths or external styles
        img.removeAttribute('srcset');
        img.removeAttribute('class');
        img.removeAttribute('loading');
        img.removeAttribute('style');
        img.removeAttribute('width');
        img.removeAttribute('height');
      });
      
      // We use document.execCommand to insert the processed HTML so it acts like a normal paste (undoable, inserts at cursor)
      document.execCommand('insertHTML', false, doc.body.innerHTML);
      setTimeout(handleInput, 0);
      return;
    }

    // Try handling direct image file paste (Base64)
    const items = e.clipboardData.items;
    let hasImage = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        hasImage = true;
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const imgTag = `<img src="${event.target.result}" alt="Pasted Image" />`;
              document.execCommand('insertHTML', false, imgTag);
              setTimeout(handleInput, 0);
            }
          };
          reader.readAsDataURL(file);
        }
        break;
      }
    }

    if (!hasImage && !html) {
      setTimeout(() => {
        handleInput();
      }, 0);
    }
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
