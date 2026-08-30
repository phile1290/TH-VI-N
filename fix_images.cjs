const fs = require('fs');
let content = fs.readFileSync('src/components/ui/RichTextEditor.tsx', 'utf8');

content = content.replace(
  /img\.removeAttribute\('loading'\);/g,
  `img.removeAttribute('loading');
        img.removeAttribute('style');
        img.removeAttribute('width');
        img.removeAttribute('height');`
);

fs.writeFileSync('src/components/ui/RichTextEditor.tsx', content);

let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent + `\n
/* Force images to display properly */
.editor-content img {
  display: block !important;
  max-width: 100% !important;
  height: auto !important;
  object-fit: contain;
  opacity: 1 !important;
  visibility: visible !important;
  margin: 1.5rem auto !important;
  border-radius: 0.5rem;
}
`;
fs.writeFileSync('src/index.css', cssContent);
