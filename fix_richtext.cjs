const fs = require('fs');
let content = fs.readFileSync('src/components/ui/RichTextEditor.tsx', 'utf8');

const oldPaste = `  // Prevent default React onPaste from stripping formatting if it was modified previously
  const handlePaste = (e: React.ClipboardEvent) => {
    // We let the native browser paste handle it to keep HTML and images
    // Just ensure we capture the resulting HTML after a short tick
    setTimeout(() => {
      handleInput();
    }, 0);
  };`;

const newPaste = `  const handlePaste = (e: React.ClipboardEvent) => {
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
              const imgTag = \`<img src="\${event.target.result}" alt="Pasted Image" />\`;
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
  };`;

content = content.replace(oldPaste, newPaste);
fs.writeFileSync('src/components/ui/RichTextEditor.tsx', content);
